"""Beacon of Hope Hospital API server.

Run `pip install -r requirements.txt`, then `python app.py`.
Open http://127.0.0.1:5000/ for the frontend; API routes are under /api.
The initial administrator is Boniface Machogu (boniface@beaconafrica.org);
set BEACON_ADMIN_PASSWORD to change the default password before deployment.
"""
# Cell 2 - imports, config and a small SQLite document store
import os
import sqlite3, json, threading, math, secrets, csv, io, datetime as dt
from pathlib import Path
from functools import wraps
from flask import Flask, request, jsonify, g, Response, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired

DB_FILE = os.environ.get("BEACON_DB_FILE", str(Path(__file__).resolve().with_name("beacon_hospital.db")))
SECRET_KEY = os.environ.get("BEACON_SECRET_KEY") or secrets.token_hex(32)
ADMIN_PASSWORD = os.environ.get("BEACON_ADMIN_PASSWORD", "Admin@1234")
LEGACY_ADMIN_PASSWORD = "Demo@1234"
if len(ADMIN_PASSWORD) < 8:
    raise ValueError("BEACON_ADMIN_PASSWORD must be at least 8 characters")
HOSPITAL = {"name": "Beacon of Hope Hospital", "lat": -1.3998, "lng": 36.7584,
            "phone": "0720876123", "email": "hospital@beaconafrica.org"}

SETTINGS = {
    "consultationFee": 1500, "homeAssessmentFee": 1500,
    "openMinutes": 8 * 60, "closeMinutes": 17 * 60,    # 8:00-17:00, Mon-Sat
    "slotMinutes": 45, "doctorDailyLimit": 10, "perKmAbove30": 20,
}
DELIVERY_BANDS = [(3, 100), (5, 150), (10, 250), (15, 350), (20, 450), (25, 550), (30, 650)]

_lock = threading.RLock()
_conn = sqlite3.connect(DB_FILE, check_same_thread=False)
_conn.execute("CREATE TABLE IF NOT EXISTS docs (col TEXT, id TEXT, data TEXT, PRIMARY KEY (col, id))")

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
    elif admin and check_password_hash(admin["passwordHash"], LEGACY_ADMIN_PASSWORD):
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
                    "homeServices": [{"id": k, "name": v[0], "price": v[1]} for k, v in HOME_SERVICES.items()],
                    "deliveryBands": [{"upToKm": l, "fee": f} for l, f in DELIVERY_BANDS] +
                                     [{"aboveKm": 30, "perKm": SETTINGS["perKmAbove30"], "quotation": True}]})

@app.get("/api/doctors")
def doctors(): return jsonify([public(u) for u in all_("users", role="doctor", enabled=True)])

def doctor_day(doctor_id, date):
    return [a for a in all_("appointments", doctorId=doctor_id, date=date) if a["status"] != "Cancelled"]

def overlaps(start, end, apps):
    return any(start < to_min(a["endTime"]) and to_min(a["time"]) < end for a in apps)

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
    if not doctor or doctor["role"] != "doctor": return err("Choose a valid doctor")
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
    appt = put("appointments", {"id": uid("apt"), "patientId": g.user["id"], "doctorId": doctor["id"],
                                "date": d["date"], "time": to_hhmm(start), "endTime": to_hhmm(end),
                                "reason": d.get("reason", ""), "status": "Pending Payment", "createdAt": now()})
    inv = make_invoice(g.user["id"], "consultation", appt["id"], SETTINGS["consultationFee"],
                       f"Consultation with {doctor['name']}")
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
    if a["status"] != "Confirmed": return err("Appointment must be paid/confirmed first", 409)
    update("appointments", aid, status="In Consultation")
    c = put("consultations", {"id": uid("con"), "appointmentId": aid, "patientId": a["patientId"],
                              "doctorId": g.user["id"], "room": f"beacon-{aid}", "startedAt": now()})
    notify(a["patientId"], "Your doctor has started the consultation - please join")
    return jsonify(c)

@app.post("/api/appointments/<aid>/end")
@auth("doctor")
def end_consultation(aid):
    a, d = get("appointments", aid), body()
    if not a or a["doctorId"] != g.user["id"]: return err("Appointment not found", 404)
    if a["status"] != "In Consultation": return err("Consultation not in progress", 409)
    c = next(c for c in all_("consultations", appointmentId=aid))
    update("consultations", c["id"], notes=d.get("notes", ""), diagnosis=d.get("diagnosis", ""), endedAt=now())
    return jsonify(update("appointments", aid, status="Completed"))

@app.post("/api/prescriptions")
@auth("doctor")
def prescribe():
    d = body(); a = get("appointments", d.get("appointmentId", ""))
    if not a or a["doctorId"] != g.user["id"]: return err("Appointment not found", 404)
    items = []
    for it in d.get("items", []):
        med = get("inventory", it.get("medicineId", ""))
        if not med: return err(f"Unknown medicine {it.get('medicineId')}")
        items.append({"medicineId": med["id"], "name": med["name"], "quantity": int(it.get("quantity", 1)),
                      "dosage": it.get("dosage", "")})
    if not items: return err("Add at least one medicine")
    p = put("prescriptions", {"id": uid("rx"), "appointmentId": a["id"], "patientId": a["patientId"],
                              "doctorId": g.user["id"], "items": items, "createdAt": now()})
    notify(a["patientId"], "A new prescription is available")
    return jsonify(p), 201

@app.get("/api/prescriptions")
@auth("patient", "doctor", "pharmacist", "admin")
def prescriptions():
    r, u = all_("prescriptions"), g.user
    if u["role"] == "patient": r = [p for p in r if p["patientId"] == u["id"]]
    if u["role"] == "doctor": r = [p for p in r if p["doctorId"] == u["id"]]
    return jsonify(r)

@app.post("/api/pharmacy/orders")
@auth("patient")
def order_medicine():
    rx = get("prescriptions", body().get("prescriptionId", ""))
    if not rx or rx["patientId"] != g.user["id"]: return err("Prescription not found", 404)
    total = 0
    for it in rx["items"]:
        med = get("inventory", it["medicineId"])
        if med["quantity"] < it["quantity"]: return err(f"Insufficient stock for {med['name']}", 409)
        total += med["price"] * it["quantity"]
    order = put("pharmacyOrders", {"id": uid("ord"), "patientId": g.user["id"], "prescriptionId": rx["id"],
                                   "items": rx["items"], "medicineTotal": total,
                                   "status": "Awaiting Pharmacy Payment", "createdAt": now()})
    inv = make_invoice(g.user["id"], "medicine", order["id"], total, "Medicine order")
    for ph in all_("users", role="pharmacist"): notify(ph["id"], f"New medicine order {order['id']}")
    return jsonify({"order": order, "invoice": inv}), 201

@app.get("/api/pharmacy/orders")
@auth("patient", "pharmacist", "admin")
def list_orders():
    rows = all_("pharmacyOrders", patientId=g.user["id"]) if g.user["role"] == "patient" else all_("pharmacyOrders")
    return jsonify(rows)

@app.post("/api/pharmacy/orders/<oid>/delivery")
@auth("pharmacist")
def set_delivery(oid):
    o, d = get("pharmacyOrders", oid), body()
    if not o: return err("Order not found", 404)
    if o["status"] != "Awaiting Delivery Details": return err(f"Order is '{o['status']}'", 409)
    try: lat, lng = float(d["lat"]), float(d["lng"])
    except (KeyError, ValueError): return err("lat and lng of the patient are required")
    km = round(haversine_km(HOSPITAL["lat"], HOSPITAL["lng"], lat, lng), 2)
    fee, quotation = delivery_fee(km)
    inv = make_invoice(o["patientId"], "delivery", oid, fee, f"Delivery ({km} km)")
    update("pharmacyOrders", oid, status="Awaiting Delivery Payment", deliveryKm=km, deliveryFee=fee,
           deliveryAddress=d.get("address", ""), deliveryLat=lat, deliveryLng=lng, quotation=quotation)
    notify(o["patientId"], f"Delivery fee quoted: KES {fee} ({km} km)")
    return jsonify({"distanceKm": km, "fee": fee, "quotation": quotation, "invoice": inv})
# Cell 8 - payments (simulated M-Pesa) and the delivery lifecycle
def after_payment(inv):
    """Move the related record to its next status once an invoice is paid."""
    k, ref = inv["kind"], inv["refId"]
    if k == "consultation":
        update("appointments", ref, status="Confirmed")
    elif k == "medicine":
        o = get("pharmacyOrders", ref)
        for it in o["items"]:
            med = get("inventory", it["medicineId"]); update("inventory", med["id"], quantity=med["quantity"] - it["quantity"])
        update("pharmacyOrders", ref, status="Awaiting Delivery Details")
    elif k == "delivery":
        o = update("pharmacyOrders", ref, status="Paid - Awaiting Dispatch")
        put("deliveries", {"id": uid("dlv"), "orderId": ref, "patientId": o["patientId"], "riderId": None,
                           "otp": f"{secrets.randbelow(10000):04d}", "status": "Paid - Awaiting Dispatch",
                           "createdAt": now()})
        for ph in all_("users", role="pharmacist"): notify(ph["id"], f"Order {ref} paid - assign a rider")
    elif k == "lab":
        update("labRequests", ref, status="Paid - Awaiting Sample")
    elif k == "homeAssessment":
        update("homeServices", ref, status="Paid - Awaiting Assignment")

@app.get("/api/invoices")
@auth("patient", "admin")
def invoices():
    return jsonify(all_("invoices", patientId=g.user["id"]) if g.user["role"] == "patient" else all_("invoices"))

@app.post("/api/invoices/<iid>/pay")
@auth("patient")
def pay(iid):
    inv, d = get("invoices", iid), body()
    if not inv or inv["patientId"] != g.user["id"]: return err("Invoice not found", 404)
    if inv["status"] == "Paid": return err("Invoice already paid", 409)
    # DEMO ONLY - replace with a real M-Pesa Daraja STK push + callback here
    pay_rec = put("payments", {"id": uid("pay"), "invoiceId": iid, "amount": inv["amount"],
                               "method": d.get("method", "M-Pesa"), "phone": d.get("phone", g.user["phone"]),
                               "reference": "SIM" + secrets.token_hex(4).upper(), "createdAt": now()})
    inv = update("invoices", iid, status="Paid", paymentId=pay_rec["id"])
    after_payment(inv)
    return jsonify({"invoice": inv, "payment": pay_rec})

def view_delivery(dv):
    d = dict(dv)
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
    update("pharmacyOrders", dv["orderId"], status=status)
    notify(dv["patientId"], f"Your delivery is now: {status}")
    return dv

@app.post("/api/deliveries/<did>/assign")
@auth("pharmacist")
def assign_rider(did):
    dv, rider = get("deliveries", did), get("users", body().get("riderId", ""))
    if not dv: return err("Delivery not found", 404)
    if not rider or rider["role"] != "rider": return err("Choose a valid rider")
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
    d = body(); codes = d.get("tests", [])
    if not codes or any(c not in LAB_TESTS for c in codes): return err("Choose valid tests: " + ", ".join(LAB_TESTS))
    pid = g.user["id"] if g.user["role"] == "patient" else d.get("patientId")
    if not get("users", pid or ""): return err("patientId required")
    total = sum(LAB_TESTS[c][1] for c in codes)
    lr = put("labRequests", {"id": uid("lab"), "patientId": pid, "requestedBy": g.user["id"],
                             "tests": [LAB_TESTS[c][0] for c in codes], "total": total,
                             "status": "Awaiting Payment", "createdAt": now()})
    return jsonify({"labRequest": lr, "invoice": make_invoice(pid, "lab", lr["id"], total, "Laboratory tests")}), 201

@app.get("/api/lab-requests")
@auth("patient", "doctor", "nurse", "admin")
def labs():
    rows = all_("labRequests")
    return jsonify([r for r in rows if r["patientId"] == g.user["id"]] if g.user["role"] == "patient" else rows)

@app.post("/api/lab-requests/<lid>/results")
@auth("nurse", "doctor", "admin")
def lab_results(lid):
    lr = get("labRequests", lid)
    if not lr: return err("Lab request not found", 404)
    if lr["status"] != "Paid - Awaiting Sample": return err(f"Lab request is '{lr['status']}'", 409)
    notify(lr["patientId"], "Your lab results are ready")
    return jsonify(update("labRequests", lid, results=body().get("results", {}), status="Completed"))

@app.post("/api/home-services")
@auth("patient")
def home_service():
    d = body()
    if d.get("serviceId") not in HOME_SERVICES: return err("Invalid serviceId")
    if not d.get("address"): return err("address is required")
    hs = put("homeServices", {"id": uid("home"), "patientId": g.user["id"], "serviceId": d["serviceId"],
                              "serviceName": HOME_SERVICES[d["serviceId"]][0], "servicePrice": HOME_SERVICES[d["serviceId"]][1],
                              "address": d["address"], "preferredDate": d.get("date", ""), "notes": d.get("notes", ""),
                              "nurseId": None, "status": "Awaiting Assessment Payment", "createdAt": now()})
    inv = make_invoice(g.user["id"], "homeAssessment", hs["id"], SETTINGS["homeAssessmentFee"], "Home assessment fee")
    return jsonify({"homeService": hs, "invoice": inv}), 201

@app.get("/api/home-services")
@auth("patient", "nurse", "admin")
def list_home():
    rows, u = all_("homeServices"), g.user
    if u["role"] == "patient": rows = [r for r in rows if r["patientId"] == u["id"]]
    if u["role"] == "nurse": rows = [r for r in rows if r["nurseId"] == u["id"]]
    return jsonify(rows)

@app.post("/api/home-services/<hid>/assign")
@auth("admin")
def assign_nurse(hid):
    hs, nurse = get("homeServices", hid), get("users", body().get("nurseId", ""))
    if not hs: return err("Request not found", 404)
    if not nurse or nurse["role"] != "nurse": return err("Choose a valid nurse")
    if hs["status"] != "Paid - Awaiting Assignment": return err(f"Request is '{hs['status']}'", 409)
    notify(nurse["id"], f"Home visit assigned: {hs['serviceName']}")
    return jsonify(update("homeServices", hid, nurseId=nurse["id"], status="Assigned"))

@app.post("/api/home-services/<hid>/complete")
@auth("nurse")
def finish_home(hid):
    hs = get("homeServices", hid)
    if not hs or hs["nurseId"] != g.user["id"]: return err("Request not found", 404)
    return jsonify(update("homeServices", hid, status="Completed", visitNotes=body().get("notes", "")))

@app.get("/api/inventory")
@auth("pharmacist", "doctor", "admin")
def inventory():
    today = dt.date.today().isoformat()
    return jsonify([{**m, "expired": m["expiry"] < today, "lowStock": m["quantity"] < 20} for m in all_("inventory")])

@app.post("/api/inventory")
@auth("pharmacist", "admin")
def add_medicine():
    d = body()
    if not d.get("name"): return err("name is required")
    return jsonify(put("inventory", {"id": uid("med"), "name": d["name"], "price": float(d.get("price", 0)),
                                     "quantity": int(d.get("quantity", 0)), "expiry": d.get("expiry", "2099-12-31")})), 201

@app.patch("/api/inventory/<mid>")
@auth("pharmacist", "admin")
def edit_medicine(mid):
    if not get("inventory", mid): return err("Item not found", 404)
    return jsonify(update("inventory", mid, **{k: v for k, v in body().items() if k in ("name", "price", "quantity", "expiry")}))

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
    paid = [i for i in all_("invoices") if i["status"] == "Paid"]
    revenue = {}
    for i in paid: revenue[i["kind"]] = revenue.get(i["kind"], 0) + i["amount"]
    by_status = {}
    for a in all_("appointments"): by_status[a["status"]] = by_status.get(a["status"], 0) + 1
    return jsonify({"counts": {c: len(all_(c)) for c in ["users"] + EXPORTABLE},
                    "appointmentsByStatus": by_status, "revenueByKind": revenue,
                    "totalRevenue": sum(revenue.values())})

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
        host=os.environ.get("BEACON_HOST", "127.0.0.1"),
        port=int(os.environ.get("PORT", "5000")),
        threaded=True,
    )