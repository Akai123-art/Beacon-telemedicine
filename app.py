"""Beacon of Hope Hospital API server.

Run `pip install -r requirements.txt`, then `python app.py`.
Open http://127.0.0.1:5000/ for the frontend; API routes are under /api.
The initial administrator is Boniface Machogu (boniface@beaconafrica.org);
set BEACON_ADMIN_PASSWORD to change the initial password before deployment.
For a one-time recovery, set BEACON_RESET_ADMIN_PASSWORD=1 and
BEACON_ADMIN_PASSWORD to the recovery password, then remove the reset flag.
"""
# Cell 2 - imports, config and a small SQLite document store
import os
import sqlite3, json, threading, math, secrets, csv, io, datetime as dt, time
from pathlib import Path
from functools import wraps
from flask import Flask, request, jsonify, g, Response, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired

DB_FILE = os.environ.get("BEACON_DB_FILE", str(Path(__file__).resolve().with_name("beacon_hospital.db")))
SECRET_KEY = os.environ.get("BEACON_SECRET_KEY") or secrets.token_hex(32)
ADMIN_PASSWORD = os.environ.get("BEACON_ADMIN_PASSWORD", "Admin@1234")
RESET_ADMIN_PASSWORD = os.environ.get("BEACON_RESET_ADMIN_PASSWORD", "").lower() in {"1", "true", "yes"}
LEGACY_ADMIN_PASSWORD = ".py" \
""
if len(ADMIN_PASSWORD) < 8:
    raise ValueError("BEACON_ADMIN_PASSWORD must be at least 8 characters")
HOSPITAL = {"name": "Beacon of Hope Hospital", "lat": -1.3998, "lng": 36.7584,
            "phone": "0720876123", "email": "hospital@beaconafrica.org"}

SETTINGS = {
    "consultationFee": 1500, "homeAssessmentFee": 1500,
    "openMinutes": 8 * 60, "closeMinutes": 17 * 60,    # 8:00-17:00, Mon-Sat
    "slotMinutes": 45, "homeVisitMinutes": 90, "doctorDailyLimit": 10, "perKmAbove30": 20,
}
DELIVERY_BANDS = [(3, 100), (5, 150), (10, 250), (15, 350), (20, 450), (25, 550), (30, 650)]

_lock = threading.RLock()
_conn = sqlite3.connect(DB_FILE, check_same_thread=False)
_conn.execute("CREATE TABLE IF NOT EXISTS docs (col TEXT, id TEXT, data TEXT, PRIMARY KEY (col, id))")
_rtc_signals = {}
_rtc_signal_ttl = 60 * 60
_rtc_signal_limit = 256

def uid(prefix): return f"{prefix}_{secrets.token_hex(4)}"
def now(): return dt.datetime.now().isoformat(timespec="seconds")

def put(col, doc):
    with _lock:
        _conn.execute("INSERT OR REPLACE INTO docs VALUES (?,?,?)", (col, doc["id"], json.dumps(doc)))
        _conn.commit()
    return doc

def get(col, id_):
    with _lock:
        row = _conn.execute("SELECT data FROM docs WHERE col=? AND id=?", (col, id_)).fetchone()
    return json.loads(row[0]) if row else None

def all_(col, **filters):
    with _lock:
        rows = _conn.execute("SELECT data FROM docs WHERE col=?", (col,)).fetchall()
    docs = [json.loads(r[0]) for r in rows]
    return [d for d in docs if all(d.get(k) == v for k, v in filters.items())]

def update(col, id_, **changes):
    doc = get(col, id_); doc.update(changes); doc["updatedAt"] = now()
    return put(col, doc)

print("Database ready:", DB_FILE)
# Cell 3 - reference data and seed accounts
LAB_TESTS = {"CBC": ("Complete Blood Count (CBC)", 500), "BS": ("Blood Sugar", 300),
             "MAL": ("Malaria Test", 300), "URI": ("Urinalysis", 300),
             "LFT": ("Liver Function Test", 1200), "KFT": ("Kidney Function Test", 1200),
             "LIP": ("Lipid Profile", 1000), "PRE": ("Pregnancy Test", 300)}
HOME_SERVICES = {"home_ncd_monitoring": ("NCD Home Monitoring & Follow-up", 1500),
                 "home_nursing_chronic": ("Home Nursing & Chronic Care", 2000),
                 "home_mobility_rehab": ("Mobility & Rehabilitation Support", 2000),
                 "home_post_hospital": ("Post-Hospital/Post-Procedure Home Care", 2000),
                 "home_elderly_dependent": ("Elderly & Dependent Patient Care", 2500)}
SERVICE_CATALOG = [
    {"id": "svc_consult_followup", "name": "Virtual consultation / follow-up", "price": "KES 500"},
    {"id": "svc_bp_glucose", "name": "BP & glucose monitoring", "price": "KES 500-750"},
    {"id": "svc_physio_virtual", "name": "Virtual physiotherapy", "price": "KES 750"},
    {"id": "svc_nursing_virtual", "name": "Virtual nursing advice", "price": "KES 500"}]

SEED_INVENTORY = [("med1", "Amoxicillin 500mg", 25, 100), ("med2", "Paracetamol 500mg", 10, 200),
                  ("med3", "Cetirizine 10mg", 20, 80)]

def seed():
    admin = get("users", "admin_boniface")
    if not all_("users", role="admin"):
        put("users", {"id": "admin_boniface", "name": "Boniface Machogu", "role": "admin",
                      "email": "boniface@beaconafrica.org", "phone": "0724741827", "enabled": True,
                      "mustChangePassword": True,
                      "passwordHash": generate_password_hash(ADMIN_PASSWORD), "createdAt": now()})
    elif admin and (
        RESET_ADMIN_PASSWORD
        or check_password_hash(admin["passwordHash"], LEGACY_ADMIN_PASSWORD)
    ):
        admin["passwordHash"] = generate_password_hash(ADMIN_PASSWORD)
        admin["mustChangePassword"] = True
        put("users", admin)
    if not all_("inventory"):
        for id_, name, price, qty in SEED_INVENTORY:
            put("inventory", {"id": id_, "name": name, "price": price, "quantity": qty,
                              "expiry": "2027-12-31"})
seed()
print("Users:", len(all_("users")), "| Inventory items:", len(all_("inventory")))
# Cell 4 - Flask app, helpers, authentication decorator
app = Flask(__name__)
from flask_cors import CORS; CORS(app)  # allow cross-origin requests for testing
serializer = URLSafeTimedSerializer(SECRET_KEY)
FRONTEND_DIR = Path(__file__).resolve().parent

def err(msg, code=400): return jsonify({"error": msg}), code

@app.get("/")
def frontend_home():
    return send_from_directory(FRONTEND_DIR, "index.html")

@app.get("/<path:filename>")
def frontend_assets(filename):
    if filename not in {"script.js", "styles.css"}:
        return err("Not found", 404)
    return send_from_directory(FRONTEND_DIR, filename)

def public(u): return {k: v for k, v in u.items() if k != "passwordHash"}
def body(): return request.get_json(silent=True) or {}

def notify(user_id, message):
    put("notifications", {"id": uid("ntf"), "userId": user_id, "message": message,
                          "read": False, "createdAt": now()})

def auth(*roles):
    """Require a valid Bearer token, optionally restricted to roles."""
    def deco(fn):
        @wraps(fn)
        def wrapper(*a, **kw):
            token = request.headers.get("Authorization", "").replace("Bearer ", "", 1)
            try: data = serializer.loads(token, max_age=12 * 3600)
            except (BadSignature, SignatureExpired): return err("Login required", 401)
            user = get("users", data["id"])
            if not user or not user.get("enabled", True): return err("Account disabled", 403)
            if roles and user["role"] not in roles: return err(f"Not allowed for role '{user['role']}'", 403)
            g.user = user
            return fn(*a, **kw)
        return wrapper
    return deco

def to_min(hhmm): h, m = hhmm.split(":"); return int(h) * 60 + int(m)
def to_hhmm(mins): return f"{mins // 60:02d}:{mins % 60:02d}"

def haversine_km(lat1, lng1, lat2, lng2):
    R = 6371.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    a = math.sin((p2 - p1) / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(math.radians(lng2 - lng1) / 2) ** 2
    return 2 * R * math.asin(math.sqrt(a))

def delivery_fee(km):
    for limit, fee in DELIVERY_BANDS:
        if km <= limit: return fee, False
    return math.ceil(km * SETTINGS["perKmAbove30"]), True     # above 30 km: quotation

def make_invoice(patient_id, kind, ref_id, amount, description):
    return put("invoices", {"id": uid("inv"), "patientId": patient_id, "kind": kind, "refId": ref_id,
                            "amount": amount, "description": description, "status": "Unpaid",
                            "createdAt": now()})

def home_service_catalog():
    defaults = [{"id": key, "name": value[0], "price": value[1], "description": "", "active": True}
                for key, value in HOME_SERVICES.items()]
    saved = {item["id"]: item for item in all_("homeServiceCatalog")}
    return [saved.pop(item["id"], item) for item in defaults] + list(saved.values())

def home_service_view(row):
    patient = get("users", row.get("patientId", ""))
    nurse = get("users", row.get("nurseId", row.get("providerId", "")))
    return {
        **row,
        "requestType": row.get("requestType", "service"),
        "service": row.get("service", row.get("serviceName", "Home Service")),
        "date": row.get("date", row.get("preferredDate", "")),
        "time": row.get("time", row.get("preferredTime", "")),
        "providerId": row.get("providerId", row.get("nurseId")),
        "patientName": patient.get("name", "") if patient else "",
        "patientPhone": patient.get("phone", "") if patient else "",
        "patientAddress": patient.get("address", "") if patient else "",
        "nurseName": nurse.get("name", "") if nurse else "",
    }

def patient_can_book_home_service(patient_id):
    patient = get("users", patient_id)
    if not patient or patient.get("role") != "patient":
        return False
    if patient.get("patientStatusOverride") == "new":
        return False
    if patient.get("patientStatusOverride") == "returning" or patient.get("homeAssessmentStatus") == "approved":
        return True
    return (
        any(a.get("patientId") == patient_id and a.get("status", "").lower() == "completed"
            for a in all_("appointments"))
        or any(c.get("patientId") == patient_id and c.get("status", "").lower() == "completed"
               for c in all_("consultations"))
        or any(h.get("patientId") == patient_id and h.get("requestType") != "assessment"
               and h.get("status", "").lower() == "completed" for h in all_("homeServices"))
    )

@app.get("/api/health")
def health(): return jsonify({"status": "ok", "hospital": HOSPITAL["name"], "time": now()})

@app.get("/api/routes")
def routes():
    return jsonify(sorted(f"{','.join(sorted(r.methods - {'HEAD', 'OPTIONS'}))} {r.rule}"
                          for r in app.url_map.iter_rules() if r.rule.startswith("/api")))
# Cell 5 - authentication and user management
@app.post("/api/auth/register")
def register():
    d = body()
    for f in ("name", "email", "password", "phone"):
        if not d.get(f): return err(f"'{f}' is required")
    if len(d["password"]) < 8: return err("Password must be at least 8 characters")
    if any(u["email"].lower() == d["email"].lower() for u in all_("users")): return err("Email already registered", 409)
    user = put("users", {"id": uid("patient"), "name": d["name"], "role": "patient",
                         "email": d["email"], "phone": d["phone"], "address": d.get("address", ""),
                         "enabled": True,
                         "passwordHash": generate_password_hash(d["password"]), "createdAt": now()})
    return jsonify(public(user)), 201

@app.post("/api/auth/login")
def login():
    d = body()
    user = next((u for u in all_("users") if u["email"].lower() == str(d.get("email", "")).lower()), None)
    if not user or not check_password_hash(user["passwordHash"], d.get("password", "")):
        return err("Invalid email or password", 401)
    if not user.get("enabled", True): return err("Account disabled", 403)
    return jsonify({"token": serializer.dumps({"id": user["id"]}), "user": public(user)})

@app.post("/api/auth/change-password")
@auth()
def change_password():
    password = body().get("password", "")
    if len(password) < 8: return err("Password must be at least 8 characters")
    user = update("users", g.user["id"], passwordHash=generate_password_hash(password),
                  mustChangePassword=False)
    return jsonify(public(user))

@app.get("/api/me")
@auth()
def me(): return jsonify(public(g.user))

@app.get("/api/users")
@auth("admin")
def list_users():
    role = request.args.get("role")
    return jsonify([public(u) for u in all_("users") if not role or u["role"] == role])

@app.get("/api/patients/search")
@auth("doctor")
def search_patients():
    query = request.args.get("q", "").strip().casefold()
    if len(query) < 2:
        return err("Search must contain at least 2 characters")
    matches = [
        {"id": patient["id"], "name": patient["name"], "phone": patient.get("phone", "")}
        for patient in all_("users", role="patient")
        if patient.get("enabled", True)
        if any(query in str(patient.get(field, "")).casefold()
               for field in ("id", "name", "phone", "email"))
    ]
    matches.sort(key=lambda patient: patient["name"].casefold())
    return jsonify(matches[:25])

@app.post("/api/users")
@auth("admin")
def create_user():
    d = body()
    role = d.get("role")
    if role not in ("doctor", "nurse", "pharmacist", "rider", "lab_technician"): return err("Invalid role")
    name = d.get("name")
    email = d.get("email")
    if not isinstance(name, str) or not name.strip() or not isinstance(email, str) or not email.strip():
        return err("name and email are required")
    email = email.strip().lower()
    if any(u["email"].lower() == email for u in all_("users")): return err("Email already registered", 409)
    password = secrets.token_urlsafe(8)
    user = put("users", {"id": uid(role), "name": name.strip(), "role": role, "email": email,
                         "phone": d.get("phone", ""), "address": d.get("address", ""), "enabled": True,
                         "mustChangePassword": True,
                         **({"specialty": d.get("specialty", "Clinical Provider"),
                             "maxBookingsPerDay": 10} if role == "doctor" else {}),
                         **({"homeServiceProvider": True} if role == "nurse" else {}),
                         **({"currentLocation": None} if role == "rider" else {}),
                         "passwordHash": generate_password_hash(password), "createdAt": now()})
    return jsonify({**public(user), "temporaryPassword": password}), 201

@app.post("/api/users/<uid_>/reset-password")
@auth("admin")
def reset_user_password(uid_):
    user = get("users", uid_)
    if not user: return err("User not found", 404)
    password = secrets.token_urlsafe(8)
    user = update("users", uid_, passwordHash=generate_password_hash(password),
                  mustChangePassword=True)
    return jsonify({**public(user), "temporaryPassword": password})

@app.patch("/api/users/<uid_>")
@auth("admin")
def edit_user(uid_):
    if not get("users", uid_): return err("User not found", 404)
    allowed = {k: v for k, v in body().items() if k in ("name", "phone", "enabled")}
    return jsonify(public(update("users", uid_, **allowed)))
# Cell 6 - catalogues and appointment booking (booking-hours rules)
@app.get("/api/catalog")
def catalog():
    return jsonify({"hospital": HOSPITAL, "settings": SETTINGS, "services": SERVICE_CATALOG,
                    "labTests": [{"code": k, "name": v[0], "price": v[1]} for k, v in LAB_TESTS.items()],
                    "homeServices": home_service_catalog(),
                    "deliveryBands": [{"upToKm": l, "fee": f} for l, f in DELIVERY_BANDS] +
                                     [{"aboveKm": 30, "perKm": SETTINGS["perKmAbove30"], "quotation": True}]})

@app.get("/api/doctors")
def doctors(): return jsonify([public(u) for u in all_("users", role="doctor", enabled=True)])

def doctor_day(doctor_id, date):
    return [a for a in all_("appointments", doctorId=doctor_id, date=date) if a["status"] != "Cancelled"]

def overlaps(start, end, apps):
    return any(start < to_min(a["endTime"]) and to_min(a["time"]) < end for a in apps)

def available_doctors(date, start):
    end = start + SETTINGS["slotMinutes"]
    doctors = []
    for doctor in all_("users", role="doctor", enabled=True):
        appointments = doctor_day(doctor["id"], date)
        if len(appointments) < SETTINGS["doctorDailyLimit"] and not overlaps(start, end, appointments):
            doctors.append(doctor)
    return doctors

@app.get("/api/doctors/availability")
def doctor_availability():
    date, time = request.args.get("date", ""), request.args.get("time", "")
    try:
        day = dt.date.fromisoformat(date)
        start = to_min(time)
        if to_hhmm(start) != time: raise ValueError
    except ValueError:
        return err("date (YYYY-MM-DD) and time (HH:MM) are required")
    if day.weekday() == 6 or start < SETTINGS["openMinutes"] or start + SETTINGS["slotMinutes"] > SETTINGS["closeMinutes"]:
        return jsonify({"date": date, "time": time, "doctors": [], "suggestedTimes": []})

    doctors = available_doctors(date, start)
    suggestions = []
    if not doctors:
        for candidate_start in range(SETTINGS["openMinutes"], SETTINGS["closeMinutes"] - SETTINGS["slotMinutes"] + 1, 15):
            candidate_time = to_hhmm(candidate_start)
            if candidate_start == start:
                continue
            if dt.datetime.combine(day, dt.time(candidate_start // 60, candidate_start % 60)) < dt.datetime.now():
                continue
            if available_doctors(date, candidate_start):
                suggestions.append(candidate_time)
        suggestions.sort(key=lambda candidate: abs(to_min(candidate) - start))
        suggestions = sorted(suggestions[:4])
    return jsonify({"date": date, "time": time,
                    "doctors": [{"id": doctor["id"], "name": doctor["name"],
                                 "specialty": doctor.get("specialty", "Clinical Provider")}
                                for doctor in doctors],
                    "suggestedTimes": suggestions})

@app.get("/api/doctors/<doctor_id>/slots")
def slots(doctor_id):
    date = request.args.get("date", "")
    try: day = dt.date.fromisoformat(date)
    except ValueError: return err("date must be YYYY-MM-DD")
    if day.weekday() == 6: return jsonify({"date": date, "slots": [], "note": "Closed on Sundays"})
    apps, free = doctor_day(doctor_id, date), []
    if len(apps) < SETTINGS["doctorDailyLimit"]:
        for s in range(SETTINGS["openMinutes"], SETTINGS["closeMinutes"] - SETTINGS["slotMinutes"] + 1, SETTINGS["slotMinutes"]):
            if dt.datetime.combine(day, dt.time(s // 60, s % 60)) < dt.datetime.now(): continue
            if not overlaps(s, s + SETTINGS["slotMinutes"], apps): free.append(to_hhmm(s))
    return jsonify({"date": date, "slots": free})

@app.post("/api/appointments")
@auth("patient")
def book():
    d = body()
    doctor = get("users", d.get("doctorId", ""))
    if not doctor or doctor["role"] != "doctor" or not doctor.get("enabled", True): return err("Choose a valid doctor")
    try: amount = int(d.get("consultationFee", SETTINGS["consultationFee"]))
    except (TypeError, ValueError): return err("consultationFee must be a valid amount")
    if amount not in {500, 750, SETTINGS["consultationFee"]}: return err("Invalid consultation fee")
    try:
        day = dt.date.fromisoformat(d["date"]); start = to_min(d["time"])
    except (KeyError, ValueError): return err("date (YYYY-MM-DD) and time (HH:MM) are required")
    end = start + SETTINGS["slotMinutes"]
    if day.weekday() == 6: return err("The hospital is closed on Sundays")
    if start < SETTINGS["openMinutes"] or end > SETTINGS["closeMinutes"]:
        return err("Bookings are only accepted between 08:00 and 17:00 (Mon-Sat)")
    if dt.datetime.combine(day, dt.time(start // 60, start % 60)) < dt.datetime.now(): return err("Cannot book a time in the past")
    apps = doctor_day(doctor["id"], d["date"])
    if len(apps) >= SETTINGS["doctorDailyLimit"]: return err("Doctor has reached the daily booking limit", 409)
    if overlaps(start, end, apps): return err("That time overlaps another appointment", 409)
    patient_apps = [a for a in all_("appointments", patientId=g.user["id"], date=d["date"])
                    if a["status"] != "Cancelled"]
    if overlaps(start, end, patient_apps): return err("You already have another appointment during this time", 409)
    appt = put("appointments", {"id": uid("apt"), "patientId": g.user["id"], "doctorId": doctor["id"],
                                "date": d["date"], "time": to_hhmm(start), "endTime": to_hhmm(end),
                                "type": d.get("type", "Video Consultation"),
                                "specialty": doctor.get("specialty", "Clinical Provider"),
                                "consultationService": d.get("consultationService", "Consultation"),
                                "consultationFee": amount, "reason": d.get("reason", ""),
                                "status": "Pending Payment", "createdAt": now()})
    inv = make_invoice(g.user["id"], "consultation", appt["id"], amount,
                       f"{appt['consultationService']} with {doctor['name']}")
    notify(doctor["id"], f"New appointment request on {d['date']} at {to_hhmm(start)}")
    return jsonify({"appointment": appt, "invoice": inv}), 201

@app.get("/api/appointments")
@auth()
def my_appointments():
    u = g.user
    if u["role"] == "patient": rows = all_("appointments", patientId=u["id"])
    elif u["role"] == "doctor": rows = all_("appointments", doctorId=u["id"])
    elif u["role"] == "admin": rows = all_("appointments")
    else: return err("Not allowed", 403)
    return jsonify(sorted(rows, key=lambda a: (a["date"], a["time"])))

@app.post("/api/appointments/<aid>/cancel")
@auth("patient", "doctor", "admin")
def cancel(aid):
    a = get("appointments", aid)
    if not a: return err("Appointment not found", 404)
    if g.user["role"] == "patient" and a["patientId"] != g.user["id"]: return err("Not your appointment", 403)
    if a["status"] in ("Completed", "In Consultation"): return err("Cannot cancel at this stage", 409)
    return jsonify(update("appointments", aid, status="Cancelled"))
# Cell 7 - telemedicine consultation, prescriptions, pharmacy orders
@app.post("/api/appointments/<aid>/start")
@auth("doctor")
def start_consultation(aid):
    a = get("appointments", aid)
    if not a or a["doctorId"] != g.user["id"]: return err("Appointment not found", 404)
    existing = all_("consultations", appointmentId=aid)
    if existing: return jsonify(existing[0])
    if a["status"] != "Confirmed": return err("Appointment must be paid/confirmed first", 409)
    update("appointments", aid, status="In Consultation")
    c = put("consultations", {"id": uid("con"), "appointmentId": aid, "patientId": a["patientId"],
                              "doctorId": g.user["id"], "room": f"beacon-{aid}", "startedAt": now(),
                              "clinicalNotes": "", "diagnosis": ""})
    notify(a["patientId"], "Your doctor has started the consultation - please join")
    return jsonify(c)

def rtc_appointment(aid, user, allow_completed=False):
    appointment = get("appointments", aid)
    if not appointment or user["id"] not in (appointment.get("patientId"), appointment.get("doctorId")):
        return None, err("Consultation not found", 404)
    if appointment.get("type") == "Physical Hospital Visit":
        return None, err("Video is not available for physical appointments", 409)
    available_statuses = ("Confirmed", "In Consultation", "Completed") if allow_completed else ("Confirmed", "In Consultation")
    if appointment.get("status") not in available_statuses:
        return None, err("Consultation is not available", 409)
    return appointment, None

def rtc_messages(aid):
    cutoff = time.time() - _rtc_signal_ttl
    with _lock:
        expired = [room_id for room_id, room in _rtc_signals.items() if room["updated"] < cutoff]
        for room_id in expired:
            del _rtc_signals[room_id]
        room = _rtc_signals.setdefault(aid, {"messages": [], "last_seen": {}, "next_id": 1, "updated": time.time()})
        room["updated"] = time.time()
        return room

@app.get("/api/appointments/<aid>/rtc-config")
@auth()
def rtc_config(aid):
    appointment, error = rtc_appointment(aid, g.user)
    if error: return error
    ice_servers = [{"urls": ["stun:stun.l.google.com:19302"]}]
    turn_urls = [url.strip() for url in os.environ.get("BEACON_TURN_URLS", "").split(",") if url.strip()]
    turn_username = os.environ.get("BEACON_TURN_USERNAME", "")
    turn_credential = os.environ.get("BEACON_TURN_CREDENTIAL", "")
    if turn_urls and not (turn_username and turn_credential):
        return err("TURN is configured without both username and credential", 503)
    if turn_username and turn_credential and not turn_urls:
        return err("TURN credentials are configured without a TURN URL", 503)
    if turn_urls:
        ice_servers.append({"urls": turn_urls, "username": turn_username, "credential": turn_credential})
    response = jsonify({"iceServers": ice_servers})
    response.headers["Cache-Control"] = "no-store"
    return response

@app.get("/api/appointments/<aid>/signals")
@auth()
def get_rtc_signals(aid):
    appointment, error = rtc_appointment(aid, g.user, allow_completed=True)
    if error: return error
    try:
        cursor = max(0, int(request.args.get("after", "0")))
    except (TypeError, ValueError):
        return err("Invalid signaling cursor")
    with _lock:
        room = rtc_messages(aid)
        room["last_seen"][g.user["id"]] = time.time()
        messages = [message for message in room["messages"]
                    if message["id"] > cursor and message["from"] != g.user["id"]]
        latest = room["messages"][-1]["id"] if room["messages"] else cursor
        other_id = appointment["doctorId"] if g.user["id"] == appointment["patientId"] else appointment["patientId"]
        peer_online = time.time() - room["last_seen"].get(other_id, 0) < 10
    response = jsonify({"messages": messages, "cursor": max(cursor, latest),
                        "peerOnline": peer_online, "ended": appointment["status"] == "Completed"})
    response.headers["Cache-Control"] = "no-store"
    return response

@app.post("/api/appointments/<aid>/signals")
@auth()
def post_rtc_signal(aid):
    appointment, error = rtc_appointment(aid, g.user)
    if error: return error
    if appointment.get("status") != "In Consultation":
        return err("The doctor must start the consultation before signaling", 409)
    data = body()
    signal_type = data.get("type")
    payload = data.get("payload")
    if signal_type not in ("offer", "answer", "candidate", "leave", "end") or not isinstance(payload, dict):
        return err("Invalid WebRTC signaling message")
    if signal_type == "offer" and g.user["id"] != appointment["doctorId"]:
        return err("Only the doctor can create the WebRTC offer", 403)
    if signal_type == "answer" and g.user["id"] != appointment["patientId"]:
        return err("Only the patient can answer the WebRTC offer", 403)
    if signal_type == "end" and g.user["id"] != appointment["doctorId"]:
        return err("Only the doctor can end this consultation", 403)
    if signal_type in ("offer", "answer") and (
        payload.get("type") != signal_type or not isinstance(payload.get("sdp"), str) or not payload["sdp"]
    ):
        return err("Invalid WebRTC session description")
    if signal_type == "candidate" and not isinstance(payload.get("candidate"), str):
        return err("Invalid ICE candidate")
    if len(json.dumps(payload)) > 200_000:
        return err("WebRTC signaling message is too large", 413)
    with _lock:
        room = rtc_messages(aid)
        if signal_type == "offer":
            room["messages"].clear()
        if len(room["messages"]) >= _rtc_signal_limit:
            return err("Signaling queue is full; leave and rejoin the consultation", 429)
        message = {"id": room["next_id"],
                   "from": g.user["id"], "type": signal_type, "payload": payload}
        room["next_id"] += 1
        room["messages"].append(message)
        room["updated"] = time.time()
    return jsonify({"id": message["id"]}), 201

@app.post("/api/appointments/<aid>/end")
@auth("doctor")
def end_consultation(aid):
    a, d = get("appointments", aid), body()
    if not a or a["doctorId"] != g.user["id"]: return err("Appointment not found", 404)
    if a["status"] != "In Consultation": return err("Consultation not in progress", 409)
    consultations = all_("consultations", appointmentId=aid)
    if not consultations: return err("Consultation record not found", 404)
    c = consultations[0]
    update("consultations", c["id"], notes=d.get("clinicalNotes", d.get("notes", "")),
           clinicalNotes=d.get("clinicalNotes", d.get("notes", "")),
           diagnosis=d.get("diagnosis", ""), endedAt=now())
    return jsonify(update("appointments", aid, status="Completed"))

@app.get("/api/consultations")
@auth("patient", "doctor", "admin")
def list_consultations():
    user = g.user
    rows = all_("consultations")
    if user["role"] == "patient":
        rows = [c for c in rows if c["patientId"] == user["id"]]
    elif user["role"] == "doctor":
        rows = [c for c in rows if c["doctorId"] == user["id"]]
    return jsonify(sorted(rows, key=lambda c: c.get("startedAt", c.get("createdAt", "")), reverse=True))

@app.put("/api/consultations/<aid>/notes")
@auth("doctor")
def save_consultation_notes(aid):
    appointment = get("appointments", aid)
    if not appointment or appointment["doctorId"] != g.user["id"]:
        return err("Consultation not found", 404)
    consultations = all_("consultations", appointmentId=aid)
    if not consultations: return err("Consultation has not been started", 409)
    d = body()
    return jsonify(update("consultations", consultations[0]["id"],
                         notes=d.get("clinicalNotes", ""), diagnosis=d.get("diagnosis", "")))

@app.post("/api/prescriptions")
@auth("doctor")
def prescribe():
    d = body()
    appointment_id = d.get("appointmentId")
    appointment = get("appointments", appointment_id) if appointment_id else None
    if appointment_id and (not appointment or appointment["doctorId"] != g.user["id"]):
        return err("Appointment not found", 404)
    patient_id = appointment["patientId"] if appointment else d.get("patientId")
    patient = get("users", patient_id or "")
    if not patient or patient.get("role") != "patient": return err("Choose a valid patient")
    items = []
    for it in d.get("items", []):
        med = get("inventory", it.get("medicineId", ""))
        if not med: return err(f"Unknown medicine {it.get('medicineId')}")
        try: quantity = int(it.get("quantity", 1))
        except (TypeError, ValueError): return err("Medicine quantity must be a positive integer")
        if quantity < 1: return err("Medicine quantity must be a positive integer")
        items.append({"medicineId": med["id"], "name": med["name"], "medicineName": med["name"],
                      "quantity": quantity, "dosage": it.get("dosage", ""),
                      "frequency": it.get("frequency", ""), "duration": it.get("duration", "")})
    if not items: return err("Add at least one medicine")
    prescription = put("prescriptions", {"id": uid("rx"), "appointmentId": appointment_id,
                                         "patientId": patient_id, "doctorId": g.user["id"],
                                         "items": items, "createdAt": now()})
    order = put("pharmacyOrders", {"id": uid("ord"), "patientId": patient_id,
                                   "prescriptionId": prescription["id"], "type": "Prescription",
                                   "items": items, "status": "Pending", "createdAt": now()})
    notify(patient_id, "A new prescription has been sent to the pharmacy")
    for pharmacist in all_("users", role="pharmacist", enabled=True):
        notify(pharmacist["id"], f"New pharmacy order {order['id']} is waiting for stock processing")
    return jsonify({"prescription": prescription, "order": order}), 201

@app.get("/api/prescriptions")
@auth("patient", "doctor", "pharmacist", "admin")
def prescriptions():
    r, u = all_("prescriptions"), g.user
    if u["role"] == "patient": r = [p for p in r if p["patientId"] == u["id"]]
    if u["role"] == "doctor": r = [p for p in r if p["doctorId"] == u["id"]]
    if u["role"] == "patient": r = [{k: v for k, v in p.items() if k != "items"} for p in r]
    return jsonify(r)

@app.post("/api/pharmacy/orders")
@auth("patient")
def order_medicine():
    d = body()
    rx = get("prescriptions", d.get("prescriptionId", ""))
    if d.get("prescriptionId") and (not rx or rx["patientId"] != g.user["id"]):
        return err("Prescription not found", 404)

    items = []
    for item in rx["items"] if rx else d.get("items", []):
        med = get("inventory", item.get("medicineId", ""))
        if not med:
            return err(f"Unknown medicine {item.get('medicineId')}")
        try:
            quantity = int(item.get("quantity", 0))
        except (TypeError, ValueError):
            return err("Medicine quantity must be a positive integer")
        if quantity < 1:
            return err("Medicine quantity must be a positive integer")
        if med.get("expiry", "9999-12-31") < dt.date.today().isoformat():
            return err(f"{med['name']} has expired", 409)
        if med["quantity"] < quantity:
            return err(f"Insufficient stock for {med['name']}", 409)
        items.append({**item, "medicineId": med["id"], "name": med["name"],
                      "medicineName": med["name"], "quantity": quantity})
    if not items:
        return err("Add at least one medicine")

    total = sum(get("inventory", item["medicineId"])["price"] * item["quantity"] for item in items)
    order = put("pharmacyOrders", {
        "id": uid("ord"), "patientId": g.user["id"],
        "prescriptionId": rx["id"] if rx else None,
        "type": "Prescription" if rx else d.get("type", "NCD Refill"),
        "items": items, "medicineTotal": total,
        "refillNote": d.get("refillNote", ""),
        "status": "Awaiting Pharmacy Payment" if rx else "Pending",
        "createdAt": now(),
    })
    invoice = make_invoice(g.user["id"], "medicine", order["id"], total, "Medicine order") if rx else None
    for pharmacist in all_("users", role="pharmacist", enabled=True):
        notify(pharmacist["id"], f"New medicine order {order['id']}")
    return jsonify({"order": order, "invoice": invoice}), 201

@app.get("/api/pharmacy/orders")
@auth("patient", "pharmacist", "admin", "doctor")
def list_orders():
    rows = all_("pharmacyOrders", patientId=g.user["id"]) if g.user["role"] == "patient" else all_("pharmacyOrders")
    if g.user["role"] == "patient": rows = [{k: v for k, v in order.items() if k != "items"} for order in rows]
    return jsonify(rows)

@app.post("/api/pharmacy/orders/<oid>/process")
@auth("pharmacist")
def process_pharmacy_order(oid):
    order = get("pharmacyOrders", oid)
    if not order: return err("Order not found", 404)
    if order["status"] != "Pending": return err(f"Order is '{order['status']}'", 409)
    total = 0
    for item in order.get("items", []):
        med = get("inventory", item.get("medicineId", ""))
        if not med or med["quantity"] < int(item.get("quantity", 0)):
            return err(f"Insufficient stock for {item.get('medicineName', item.get('name', 'medicine'))}", 409)
        if med.get("expiry", "9999-12-31") < dt.date.today().isoformat():
            return err(f"{med['name']} has expired", 409)
        if med.get("expiry", "9999-12-31") < dt.date.today().isoformat():
            return err(f"{med['name']} has expired", 409)
        total += float(med["price"]) * int(item["quantity"])
    order = update("pharmacyOrders", oid, medicineTotal=total, status="Awaiting Pharmacy Payment")
    invoice = make_invoice(order["patientId"], "medicine", oid, total, "Medicine order")
    return jsonify({"order": order, "invoice": invoice})

@app.post("/api/pharmacy/orders/<oid>/delivery")
@auth("pharmacist")
def set_delivery(oid):
    o, d = get("pharmacyOrders", oid), body()
    if not o: return err("Order not found", 404)
    if o["status"] != "Awaiting Delivery Details": return err(f"Order is '{o['status']}'", 409)
    if "fee" in d:
        address = str(d.get("address", "")).strip()
        directions = str(d.get("directions", "")).strip()
        receiver_phone = str(d.get("receiverPhone", "")).strip()
        try: fee = float(d["fee"])
        except (TypeError, ValueError): return err("Delivery fee must be numeric")
        if not address or not directions or not receiver_phone or fee < 0:
            return err("Address, directions, receiver phone and a non-negative fee are required")
        km, quotation = None, False
    else:
        try: lat, lng = float(d["lat"]), float(d["lng"])
        except (KeyError, TypeError, ValueError): return err("lat and lng of the patient are required")
        km = round(haversine_km(HOSPITAL["lat"], HOSPITAL["lng"], lat, lng), 2)
        fee, quotation = delivery_fee(km)
        address, directions, receiver_phone = str(d.get("address", "")).strip(), "", ""

    delivery = next((row for row in all_("deliveries") if row.get("orderId", row.get("pharmacyOrderId")) == oid), None)
    delivery_fields = {
        "orderId": oid, "pharmacyOrderId": oid, "patientId": o["patientId"], "riderId": None,
        "status": "Awaiting Delivery Payment", "deliveryLocation": address, "deliveryAddress": address,
        "directions": directions, "receiverPhone": receiver_phone, "deliveryFee": fee,
        "deliveryKm": km, "quotation": quotation, "updatedAt": now(),
    }
    delivery = update("deliveries", delivery["id"], **delivery_fields) if delivery else put(
        "deliveries", {"id": uid("dlv"), **delivery_fields, "otp": f"{secrets.randbelow(10000):04d}",
                       "createdAt": now()})
    pending_invoice = next((invoice for invoice in all_("invoices", refId=oid)
                            if invoice.get("kind") == "delivery" and invoice.get("status") != "Paid"), None)
    inv = update("invoices", pending_invoice["id"], amount=fee, description="Medicine delivery") if pending_invoice else \
        make_invoice(o["patientId"], "delivery", oid, fee, "Medicine delivery")
    update("pharmacyOrders", oid, status="Awaiting Delivery Payment", deliveryId=delivery["id"],
           deliveryFee=fee, deliveryAddress=address)
    notify(o["patientId"], f"Delivery details confirmed. Delivery fee: KES {fee}.")
    return jsonify({"delivery": view_delivery(delivery), "invoice": inv, "distanceKm": km, "fee": fee,
                    "quotation": quotation})
# Cell 8 - payments (simulated M-Pesa) and the delivery lifecycle
def after_payment(inv):
    """Move the related record to its next status once an invoice is paid."""
    k, ref = inv["kind"], inv["refId"]
    if k == "consultation":
        update("appointments", ref, status="Confirmed")
    elif k == "medicine":
        o = get("pharmacyOrders", ref)
        if not o: return
        for it in o["items"]:
            med = get("inventory", it["medicineId"])
            if med: update("inventory", med["id"], quantity=med["quantity"] - it["quantity"])
        update("pharmacyOrders", ref, status="Awaiting Delivery Details")
        if not any(d.get("orderId", d.get("pharmacyOrderId")) == ref for d in all_("deliveries")):
            put("deliveries", {"id": uid("dlv"), "orderId": ref, "pharmacyOrderId": ref,
                               "patientId": o["patientId"], "riderId": None,
                               "otp": f"{secrets.randbelow(10000):04d}",
                               "status": "Awaiting Delivery Details", "createdAt": now()})
    elif k == "delivery":
        o = update("pharmacyOrders", ref, status="Paid - Awaiting Dispatch")
        delivery = next((d for d in all_("deliveries")
                         if d.get("orderId", d.get("pharmacyOrderId")) == ref), None)
        if delivery:
            update("deliveries", delivery["id"], status="Paid - Awaiting Dispatch")
        else:
            put("deliveries", {"id": uid("dlv"), "orderId": ref, "pharmacyOrderId": ref,
                               "patientId": o["patientId"], "riderId": None,
                               "otp": f"{secrets.randbelow(10000):04d}",
                               "status": "Paid - Awaiting Dispatch", "createdAt": now()})
        for ph in all_("users", role="pharmacist"): notify(ph["id"], f"Order {ref} paid - assign a rider")
    elif k == "lab":
        update("labRequests", ref, status="Paid - Awaiting Sample")
    elif k == "homeAssessment":
        service = get("homeServices", ref)
        if service:
            update("homeServices", ref, status="Paid - Awaiting Assignment")
            if service.get("requestType") == "assessment":
                patient = get("users", service["patientId"])
                if patient: update("users", patient["id"], homeAssessmentStatus="paid_pending")
    elif k == "homeService":
        if get("homeServices", ref):
            update("homeServices", ref, status="Paid - Awaiting Assignment")

@app.get("/api/invoices")
@auth("patient", "pharmacist", "admin")
def invoices():
    rows = all_("invoices", patientId=g.user["id"]) if g.user["role"] == "patient" else all_("invoices")
    if g.user["role"] == "pharmacist":
        rows = [row for row in rows if row.get("kind") in ("medicine", "delivery")]
    return jsonify(rows)

@app.post("/api/invoices/<iid>/pay")
@auth("patient")
def pay(iid):
    inv, d = get("invoices", iid), body()
    if not inv or inv["patientId"] != g.user["id"]: return err("Invoice not found", 404)
    if inv["status"] == "Paid": return err("Invoice already paid", 409)
    if inv.get("kind") == "medicine":
        order = get("pharmacyOrders", inv.get("refId", ""))
        if not order: return err("Medicine order not found", 404)
        for item in order.get("items", []):
            med = get("inventory", item.get("medicineId", ""))
            if not med or med["quantity"] < int(item.get("quantity", 0)):
                return err(f"Insufficient stock for {item.get('medicineName', item.get('name', 'medicine'))}", 409)
    # DEMO ONLY - replace with a real M-Pesa Daraja STK push + callback here
    pay_rec = put("payments", {"id": uid("pay"), "invoiceId": iid, "amount": inv["amount"],
                               "method": d.get("method", "M-Pesa"), "phone": d.get("phone", g.user["phone"]),
                               "reference": "SIM" + secrets.token_hex(4).upper(), "createdAt": now()})
    inv = update("invoices", iid, status="Paid", paymentId=pay_rec["id"])
    after_payment(inv)
    return jsonify({"invoice": inv, "payment": pay_rec})

def view_delivery(dv):
    d = dict(dv)
    order_id = d.get("orderId", d.get("pharmacyOrderId", ""))
    d["orderId"] = order_id
    d["pharmacyOrderId"] = order_id
    d.setdefault("deliveryLocation", d.get("deliveryAddress", ""))
    order = get("pharmacyOrders", order_id) if order_id else None
    if order:
        d.setdefault("deliveryLocation", order.get("deliveryAddress", ""))
        d.setdefault("deliveryFee", order.get("deliveryFee"))
    invoice = next((row for row in all_("invoices")
                    if row.get("kind") == "delivery" and row.get("refId") == order_id), None)
    d["deliveryPaymentStatus"] = "Paid" if invoice and invoice.get("status") == "Paid" else \
        "Pending" if invoice else "Not invoiced"
    if d.get("status") == "Picked Up - Call Receiver":
        d["status"] = "Picked Up - Confirm Patient Location"
    if g.user["role"] != "patient": d.pop("otp", None)      # only the patient sees the OTP
    return d

@app.get("/api/deliveries")
@auth("patient", "pharmacist", "rider", "admin")
def deliveries():
    u, rows = g.user, all_("deliveries")
    if u["role"] == "patient": rows = [r for r in rows if r["patientId"] == u["id"]]
    if u["role"] == "rider": rows = [r for r in rows if r["riderId"] == u["id"]]
    return jsonify([view_delivery(r) for r in rows])

def set_delivery_status(did, status, **extra):
    dv = update("deliveries", did, status=status, **extra)
    order_id = dv.get("orderId", dv.get("pharmacyOrderId", ""))
    if order_id and get("pharmacyOrders", order_id):
        update("pharmacyOrders", order_id, status=status)
    notify(dv["patientId"], f"Your delivery is now: {status}")
    return dv

@app.post("/api/deliveries/<did>/assign")
@auth("pharmacist")
def assign_rider(did):
    dv, rider = get("deliveries", did), get("users", body().get("riderId", ""))
    if not dv: return err("Delivery not found", 404)
    if not rider or rider["role"] != "rider" or not rider.get("enabled", True): return err("Choose a valid enabled rider")
    if dv["status"] != "Paid - Awaiting Dispatch": return err(f"Delivery is '{dv['status']}'", 409)
    notify(rider["id"], f"New delivery assigned: {did}")
    return jsonify(view_delivery(set_delivery_status(did, "Assigned", riderId=rider["id"])))

def rider_step(did, expected, new_status):
    dv = get("deliveries", did)
    if not dv or dv["riderId"] != g.user["id"]: return err("Delivery not found", 404)
    if dv["status"] != expected: return err(f"Delivery is '{dv['status']}', expected '{expected}'", 409)
    return jsonify(view_delivery(set_delivery_status(did, new_status)))

@app.post("/api/deliveries/<did>/pickup")
@auth("rider")
def pickup(did): return rider_step(did, "Assigned", "Picked Up - Call Receiver")

@app.post("/api/deliveries/<did>/transit")
@auth("rider")
def transit(did): return rider_step(did, "Picked Up - Call Receiver", "In Transit")

@app.post("/api/deliveries/<did>/complete")
@auth("rider")
def complete(did):
    dv = get("deliveries", did)
    if not dv or dv["riderId"] != g.user["id"]: return err("Delivery not found", 404)
    if dv["status"] != "In Transit": return err("Delivery is not in transit", 409)
    if str(body().get("otp", "")) != dv["otp"]: return err("Incorrect OTP from the patient", 400)
    return jsonify(view_delivery(set_delivery_status(did, "Delivered", deliveredAt=now())))
# Cell 9 - lab, home services, inventory, notifications, admin reports
@app.post("/api/lab-requests")
@auth("patient", "doctor")
def lab_request():
    d = body()
    codes = d.get("tests", [])
    if isinstance(codes, str): codes = [codes]
    if not codes and d.get("testName"):
        requested_names = d["testName"] if isinstance(d["testName"], list) else [d["testName"]]
        codes = [code for code, (name, _) in LAB_TESTS.items() if name in requested_names]
    if not codes or any(c not in LAB_TESTS for c in codes): return err("Choose valid tests: " + ", ".join(LAB_TESTS))
    pid = g.user["id"] if g.user["role"] == "patient" else d.get("patientId")
    patient = get("users", pid or "")
    if not patient or patient["role"] != "patient": return err("Choose a valid patient")
    total = sum(LAB_TESTS[c][1] for c in codes)
    lr = put("labRequests", {"id": uid("lab"), "patientId": pid, "requestedBy": g.user["id"],
                             "tests": [LAB_TESTS[c][0] for c in codes], "testName": ", ".join(LAB_TESTS[c][0] for c in codes),
                             "notes": d.get("notes", ""), "urgency": d.get("urgency", "Routine"), "total": total,
                             "status": "Awaiting Payment", "createdAt": now()})
    for tech in all_("users", role="lab_technician", enabled=True):
        notify(tech["id"], f"New laboratory request {lr['id']} is awaiting payment")
    return jsonify({"labRequest": lr, "invoice": make_invoice(pid, "lab", lr["id"], total, "Laboratory tests")}), 201

@app.get("/api/lab-requests")
@auth("patient", "doctor", "nurse", "lab_technician", "admin")
def labs():
    rows = all_("labRequests")
    user = g.user
    if user["role"] == "patient":
        rows = [r for r in rows if r["patientId"] == user["id"]]
    elif user["role"] == "doctor":
        rows = [r for r in rows if r.get("requestedBy") == user["id"]]
    enriched = []
    for row in rows:
        patient = get("users", row["patientId"])
        requester = get("users", row.get("requestedBy", ""))
        enriched.append({**row, "patientName": patient.get("name", "") if patient else "",
                         "patientPhone": patient.get("phone", "") if patient else "",
                         "requestedByName": requester.get("name", "") if requester else ""})
    return jsonify(sorted(enriched, key=lambda r: r.get("createdAt", ""), reverse=True))

@app.post("/api/lab-requests/<lid>/results")
@auth("lab_technician")
def lab_results(lid):
    lr = get("labRequests", lid)
    if not lr: return err("Lab request not found", 404)
    d = body()
    result = d.get("results", d.get("result", ""))
    status = d.get("status", "Completed")
    if status not in ("Processing", "Completed"):
        return err("Status must be Processing or Completed")
    valid_result = (
        isinstance(result, str) and bool(result.strip())
        or isinstance(result, (dict, list)) and bool(result)
    )
    if status == "Completed" and not valid_result:
        return err("Laboratory results are required")
    if status == "Processing" and lr["status"] not in ("Paid - Awaiting Sample", "Processing"):
        return err(f"Lab request is '{lr['status']}'", 409)
    if status == "Completed" and lr["status"] not in ("Paid - Awaiting Sample", "Processing", "Completed"):
        return err(f"Lab request is '{lr['status']}'", 409)
    updated = update("labRequests", lid, results=result, result=result, status=status,
                     processedBy=g.user["id"], processedByName=g.user["name"],
                     **({"resultDate": now()} if status == "Completed" else {}))
    if status == "Completed":
        notify(lr["patientId"], "Your lab results are ready")
        if lr.get("requestedBy"):
            notify(lr["requestedBy"], "A requested laboratory result is ready")
    return jsonify(updated)

@app.post("/api/home-services")
@auth("patient")
def home_service():
    d = body()
    request_type = d.get("requestType", "service")
    date, time = str(d.get("date", "")).strip(), str(d.get("time", "")).strip()
    address = str(d.get("address", "")).strip()
    nurse_id = str(d.get("providerId", d.get("nurseId", ""))).strip()
    if request_type not in ("assessment", "service"): return err("Invalid home-service request type")
    if not address or not date or not time: return err("address, date and time are required")
    try:
        booking_date = dt.date.fromisoformat(date)
        start = to_min(time)
    except (TypeError, ValueError): return err("A valid date and time are required")
    if booking_date < dt.date.today() or booking_date.weekday() == 6 or start < SETTINGS["openMinutes"] or start > SETTINGS["closeMinutes"]:
        return err("Home visits are available 08:00–17:00, Monday to Saturday")
    if booking_date == dt.date.today() and start <= dt.datetime.now().hour * 60 + dt.datetime.now().minute:
        return err("Choose a future home-visit time")
    nurse = get("users", nurse_id)
    if not nurse or nurse.get("role") != "nurse" or not nurse.get("enabled", True):
        return err("Choose an enabled nursing officer")
    for existing in all_("homeServices"):
        if existing.get("nurseId", existing.get("providerId")) != nurse_id:
            continue
        if existing.get("date", existing.get("preferredDate")) != date or existing.get("status") in ("Cancelled", "Completed", "Not Suitable"):
            continue
        existing_start = to_min(existing.get("time", existing.get("preferredTime", "00:00")))
        visit_minutes = SETTINGS["homeVisitMinutes"]
        if start < existing_start + visit_minutes and existing_start < start + visit_minutes:
            return err("That nursing officer is already booked at this time", 409)

    if request_type == "assessment":
        active_assessment = any(
            row.get("patientId") == g.user["id"] and row.get("requestType") == "assessment"
            and row.get("status") not in ("Cancelled", "Completed", "Not Suitable")
            for row in all_("homeServices")
        )
        if active_assessment: return err("You already have an active home assessment request", 409)
        service_id, service_name = "", "Home Assessment"
        service_price, transport_fee = float(SETTINGS["homeAssessmentFee"]), 0
        total = service_price
    else:
        if not patient_can_book_home_service(g.user["id"]):
            return err("Complete a home assessment or clinical encounter before booking a home service", 403)
        catalog_item = next((item for item in home_service_catalog()
                             if item["id"] == d.get("serviceId") and item.get("active", True)), None)
        if not catalog_item: return err("Choose a valid active home service")
        service_id, service_name = catalog_item["id"], catalog_item["name"]
        service_price = float(catalog_item["price"])
        try: transport_fee = float(d.get("transportFee", 0))
        except (TypeError, ValueError): return err("Transport fee is invalid")
        if transport_fee not in (0, 300, 500): return err("Choose a valid transport fee")
        total = service_price + transport_fee

    status = "Pending Payment"
    hs = put("homeServices", {
        "id": uid("home"), "patientId": g.user["id"], "serviceId": service_id,
        "serviceName": service_name, "service": service_name, "servicePrice": service_price,
        "serviceFee": service_price, "transportFee": transport_fee, "total": total,
        "transportBand": d.get("transportBand", "0"), "transportQuotation": bool(d.get("transportQuotation", False)),
        "address": address, "preferredDate": date, "date": date, "preferredTime": time, "time": time,
        "notes": d.get("notes", ""), "requestType": request_type, "nurseId": nurse_id,
        "providerId": nurse_id, "status": status, "createdAt": now(),
    })
    kind = "homeAssessment" if request_type == "assessment" else "homeService"
    description = "Home assessment fee" if request_type == "assessment" else service_name
    inv = make_invoice(g.user["id"], kind, hs["id"], total, description)
    hs = update("homeServices", hs["id"], invoiceId=inv["id"])
    if request_type == "assessment":
        update("users", g.user["id"], homeAssessmentStatus="paid_pending")
    notify(nurse_id, f"Home visit requested: {service_name} on {date} at {time}")
    return jsonify({"homeService": home_service_view(hs), "invoice": inv}), 201

@app.get("/api/home-services")
@auth("patient", "nurse", "admin")
def list_home():
    rows, u = all_("homeServices"), g.user
    if u["role"] == "patient": rows = [r for r in rows if r["patientId"] == u["id"]]
    if u["role"] == "nurse": rows = [r for r in rows if r.get("nurseId", r.get("providerId")) == u["id"]]
    return jsonify([home_service_view(row) for row in sorted(rows, key=lambda r: r.get("createdAt", ""), reverse=True)])

@app.get("/api/home-services/eligibility")
@auth("patient")
def home_service_eligibility():
    can_book = patient_can_book_home_service(g.user["id"])
    status = g.user.get("homeAssessmentStatus", "")
    if not status:
        status = "Returning Client" if can_book else "New Client"
    return jsonify({"canBookDirectly": can_book, "homeAssessmentStatus": status})

@app.get("/api/home-services/providers")
@auth("patient", "admin", "nurse")
def home_service_providers():
    return jsonify([{"id": nurse["id"], "name": nurse["name"],
                     "role": nurse["role"], "enabled": nurse.get("enabled", True),
                     "homeServiceProvider": nurse.get("homeServiceProvider", True)}
                    for nurse in all_("users", role="nurse")
                    if nurse.get("enabled", True) and nurse.get("homeServiceProvider", True)])

@app.post("/api/home-services/<hid>/assign")
@auth("admin")
def assign_nurse(hid):
    hs, nurse = get("homeServices", hid), get("users", body().get("nurseId", ""))
    if not hs: return err("Request not found", 404)
    if not nurse or nurse["role"] != "nurse" or not nurse.get("enabled", True): return err("Choose a valid enabled nurse")
    if hs["status"] not in ("Paid - Awaiting Assignment", "Assigned"): return err(f"Request is '{hs['status']}'", 409)
    notify(nurse["id"], f"Home visit assigned: {hs['serviceName']}")
    return jsonify(home_service_view(update("homeServices", hid, nurseId=nurse["id"], providerId=nurse["id"], status="Assigned")))

@app.post("/api/home-services/<hid>/complete")
@auth("nurse")
def finish_home(hid):
    hs = get("homeServices", hid)
    if not hs or hs.get("nurseId", hs.get("providerId")) != g.user["id"]: return err("Request not found", 404)
    if hs.get("status") not in ("Paid - Awaiting Assignment", "Assigned"):
        return err(f"Request is '{hs.get('status', 'Unknown')}'", 409)
    d = body()
    if hs.get("requestType") == "assessment":
        outcome = d.get("outcome")
        if outcome not in ("approved", "completed_not_suitable"): return err("Choose an assessment outcome")
        status = "Completed" if outcome == "approved" else "Not Suitable"
        patient = get("users", hs["patientId"])
        if patient: update("users", patient["id"], homeAssessmentStatus=outcome)
        updated = update("homeServices", hs["id"], status=status, outcome=outcome,
                         assessmentNotes=d.get("notes", ""), visitNotes=d.get("notes", ""),
                         assessedBy=g.user["id"], assessedAt=now())
    else:
        updated = update("homeServices", hs["id"], status="Completed", visitNotes=d.get("notes", ""))
    notify(hs["patientId"], "Your home visit has been completed.")
    return jsonify(home_service_view(updated))

@app.post("/api/home-services/catalog")
@auth("admin")
def add_home_service_catalog():
    d = body()
    name, description = d.get("name"), d.get("description")
    try: price = float(d.get("price"))
    except (TypeError, ValueError): return err("A valid service price is required")
    if not isinstance(name, str) or not name.strip() or not isinstance(description, str) or not description.strip() or price < 0:
        return err("Service name, description and a non-negative price are required")
    if any(item["name"].casefold() == name.strip().casefold() for item in home_service_catalog()):
        return err("A service with this name already exists", 409)
    item = {"id": uid("home_catalog"), "name": name.strip(), "description": description.strip(),
            "price": price, "active": True}
    put("homeServiceCatalog", item)
    return jsonify(item), 201

@app.patch("/api/home-services/catalog/<service_id>")
@auth("admin")
def edit_home_service_catalog(service_id):
    item = next((entry for entry in home_service_catalog() if entry["id"] == service_id), None)
    if not item: return err("Home service not found", 404)
    d, changes = body(), {}
    if "name" in d:
        if not isinstance(d["name"], str) or not d["name"].strip(): return err("Service name cannot be empty")
        changes["name"] = d["name"].strip()
    if "description" in d:
        if not isinstance(d["description"], str) or not d["description"].strip(): return err("Description cannot be empty")
        changes["description"] = d["description"].strip()
    if "price" in d:
        try: changes["price"] = float(d["price"])
        except (TypeError, ValueError): return err("Service price must be numeric")
        if changes["price"] < 0: return err("Service price must not be negative")
    if "active" in d: changes["active"] = bool(d["active"])
    if service_id in {key for key in HOME_SERVICES}:
        item = put("homeServiceCatalog", {**item, **changes})
    else:
        item = update("homeServiceCatalog", service_id, **changes)
    return jsonify(item)

@app.get("/api/inventory")
@auth("pharmacist", "doctor", "admin", "patient")
def inventory():
    today = dt.date.today().isoformat()
    return jsonify([{**m, "expired": m["expiry"] < today, "lowStock": m["quantity"] < 20} for m in all_("inventory")])

@app.post("/api/inventory")
@auth("pharmacist")
def add_medicine():
    d = body()
    if not isinstance(d.get("name"), str) or not d["name"].strip(): return err("name is required")
    try:
        price, quantity = float(d.get("price", 0)), int(d.get("quantity", 0))
        expiry = dt.date.fromisoformat(d.get("expiry", "2099-12-31")).isoformat()
    except (TypeError, ValueError): return err("price, quantity, or expiry is invalid")
    if price < 0 or quantity < 0: return err("price and quantity must not be negative")
    return jsonify(put("inventory", {"id": uid("med"), "name": d["name"].strip(), "price": price,
                                     "quantity": quantity, "expiry": expiry})), 201

@app.patch("/api/inventory/<mid>")
@auth("pharmacist")
def edit_medicine(mid):
    if not get("inventory", mid): return err("Item not found", 404)
    d = body()
    changes = {}
    if "name" in d:
        if not isinstance(d["name"], str) or not d["name"].strip(): return err("name cannot be empty")
        changes["name"] = d["name"].strip()
    if "price" in d:
        try: changes["price"] = float(d["price"])
        except (TypeError, ValueError): return err("price must be numeric")
        if changes["price"] < 0: return err("price must not be negative")
    if "quantity" in d:
        try: changes["quantity"] = int(d["quantity"])
        except (TypeError, ValueError): return err("quantity must be an integer")
        if changes["quantity"] < 0: return err("quantity must not be negative")
    if "expiry" in d:
        try: changes["expiry"] = dt.date.fromisoformat(d["expiry"]).isoformat()
        except (TypeError, ValueError): return err("expiry must be YYYY-MM-DD")
    return jsonify(update("inventory", mid, **changes))

@app.get("/api/notifications")
@auth()
def notifications():
    return jsonify(sorted(all_("notifications", userId=g.user["id"]), key=lambda n: n["createdAt"], reverse=True))

@app.post("/api/notifications/<nid>/read")
@auth()
def mark_read(nid):
    n = get("notifications", nid)
    if not n or n["userId"] != g.user["id"]: return err("Not found", 404)
    return jsonify(update("notifications", nid, read=True))

EXPORTABLE = ["appointments", "consultations", "prescriptions", "pharmacyOrders", "invoices", "payments",
              "deliveries", "labRequests", "homeServices", "inventory"]

@app.get("/api/admin/report")
@auth("admin")
def report():
    users = all_("users")
    invoices = all_("invoices")
    paid = [i for i in invoices if i.get("status") == "Paid"]
    revenue = {}
    for invoice in paid:
        kind = invoice.get("kind", "other")
        revenue[kind] = revenue.get(kind, 0) + float(invoice.get("amount", 0) or 0)
    by_status = {}
    for appointment in all_("appointments"):
        status = appointment.get("status", "Unknown")
        by_status[status] = by_status.get(status, 0) + 1
    dashboard = {
        "patients": sum(u.get("role") == "patient" and u.get("enabled", True) for u in users),
        "doctors": sum(u.get("role") == "doctor" and u.get("enabled", True) for u in users),
        "pendingPayments": sum(i.get("status") in ("Unpaid", "Pending") for i in invoices),
        "paidDeliveries": sum(i.get("kind") == "delivery" for i in paid),
        "pharmacyOrders": len(all_("pharmacyOrders")),
        "homeServices": len(all_("homeServices")),
        "labRequests": len(all_("labRequests")),
        "revenue": sum(revenue.values()),
        "financials": {
            "consultation": {"paid": 0, "revenue": 0},
            "medicine": {"paid": 0, "revenue": 0},
            "delivery": {"paid": 0, "revenue": 0},
            "homeAssessment": {"paid": 0, "revenue": 0},
            "lab": {"paid": 0, "revenue": 0},
        },
    }
    for invoice in paid:
        kind = invoice.get("kind", "other")
        if kind in dashboard["financials"]:
            summary = dashboard["financials"][kind]
            summary["paid"] += 1
            summary["revenue"] += float(invoice.get("amount", 0) or 0)
    return jsonify({"counts": {c: len(all_(c)) for c in ["users"] + EXPORTABLE},
                    "appointmentsByStatus": by_status, "revenueByKind": revenue,
                    "totalRevenue": dashboard["revenue"], "dashboard": dashboard})

@app.get("/api/admin/report/data")
@auth("admin")
def report_data():
    report_type = request.args.get("type", "")
    valid_types = {"financial", "appointments", "pharmacy", "deliveries",
                   "home-services", "laboratory", "users"}
    if report_type not in valid_types: return err("Unknown report type")
    date_from, date_to = request.args.get("from", ""), request.args.get("to", "")
    if date_from:
        try: dt.date.fromisoformat(date_from)
        except ValueError: return err("Invalid from date")
    if date_to:
        try: dt.date.fromisoformat(date_to)
        except ValueError: return err("Invalid to date")
    if date_from and date_to and date_from > date_to: return err("From date must be on or before to date")

    def in_range(row, field="createdAt"):
        value = str(row.get(field, row.get("createdAt", "")))[:10]
        return (not date_from or not value or value >= date_from) and (not date_to or not value or value <= date_to)

    if report_type == "financial":
        rows = [{"id": i.get("id", ""), "type": i.get("kind", "other"), "patient": (get("users", i.get("patientId", "")) or {}).get("name", "-"),
                 "total": i.get("amount", 0), "status": i.get("status", ""), "createdAt": i.get("createdAt", "")}
                for i in all_("invoices") if in_range(i)]
    elif report_type == "appointments":
        rows = [{"date": a.get("date", ""), "time": a.get("time", ""),
                 "patient": (get("users", a.get("patientId", "")) or {}).get("name", "-"),
                 "doctor": (get("users", a.get("doctorId", "")) or {}).get("name", "-"),
                 "specialty": a.get("specialty", "-"), "type": a.get("type", "-"), "status": a.get("status", "")}
                for a in all_("appointments") if in_range(a, "date")]
    elif report_type == "pharmacy":
        rows = [{"id": o.get("id", ""), "patient": (get("users", o.get("patientId", "")) or {}).get("name", "-"),
                 "type": o.get("type", "Prescription"),
                 "medicines": "; ".join(f"{item.get('medicineName', item.get('name', 'Medicine'))} x{item.get('quantity', 0)}"
                                        for item in o.get("items", [])),
                 "status": o.get("status", ""), "createdAt": o.get("createdAt", "")}
                for o in all_("pharmacyOrders") if in_range(o)]
    elif report_type == "deliveries":
        rows = [{"id": d.get("id", ""), "order": d.get("orderId", d.get("pharmacyOrderId", "")),
                 "patient": (get("users", d.get("patientId", "")) or {}).get("name", "-"),
                 "rider": (get("users", d.get("riderId", "")) or {}).get("name", "-"),
                 "location": d.get("deliveryLocation", d.get("deliveryAddress", "-")),
                 "receiverPhone": d.get("receiverPhone", ""), "fee": d.get("deliveryFee", 0),
                 "status": d.get("status", ""), "createdAt": d.get("createdAt", "")}
                for d in all_("deliveries") if in_range(d)]
    elif report_type == "home-services":
        rows = [{"id": h.get("id", ""), "patient": (get("users", h.get("patientId", "")) or {}).get("name", "-"),
                 "service": h.get("service", h.get("serviceName", "Home Service")),
                 "date": h.get("date", h.get("preferredDate", "")),
                 "total": h.get("total", h.get("servicePrice", 0)), "status": h.get("status", ""),
                 "createdAt": h.get("createdAt", "")}
                for h in all_("homeServices") if in_range(h)]
    elif report_type == "laboratory":
        rows = [{"id": l.get("id", ""), "patient": (get("users", l.get("patientId", "")) or {}).get("name", "-"),
                 "test": l.get("testName", ", ".join(l.get("tests", []))),
                 "status": l.get("status", ""), "createdAt": l.get("createdAt", "")}
                for l in all_("labRequests") if in_range(l)]
    else:
        rows = [{"name": u.get("name", ""), "email": u.get("email", ""), "role": u.get("role", ""),
                 "specialty": u.get("specialty", "-"), "status": "Enabled" if u.get("enabled", True) else "Disabled"}
                for u in all_("users")]
    return jsonify(rows)

@app.get("/api/admin/export/<col>.csv")
@auth("admin")
def export_csv(col):
    if col not in EXPORTABLE: return err("Unknown collection", 404)
    rows = all_(col)
    keys = sorted({k for r in rows for k in r})
    out = io.StringIO(); w = csv.DictWriter(out, fieldnames=keys); w.writeheader()
    for r in rows: w.writerow({k: json.dumps(v) if isinstance(v, (list, dict)) else v for k, v in r.items()})
    return Response(out.getvalue(), mimetype="text/csv")

print("Routes registered:", len([r for r in app.url_map.iter_rules() if r.rule.startswith("/api")]))
if __name__ == "__main__":
    app.run(
        host=os.environ.get("BEACON_HOST", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        threaded=True,
    )