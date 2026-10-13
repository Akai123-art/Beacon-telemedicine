

/* =========================================================
DATABASE
========================================================= */

const DB_KEY = "beaconHopeDB_refined_v7_clean_users";

const HOSPITAL_LOCATION = {
  lat:-1.3998,
  lng:36.7584,
  name:"Beacon of Hope Hospital"
};

const HOSPITAL_REFERENCE = {
  facilityName: "Beacon of Hope Hospital",
  phone: "0720876123",
  email: "hospital@beaconafrica.org",
  location: "Ongata Rongai, Beacon of Hope Centre, Off Magadi Rd, Along Gataka Rd"
};

const DELIVERY_RATE = 50;

const SPECIALTIES = [
  "Clinical Provider",
  "General Consultation",
  "Telemedicine Follow-up"
];

let HOME_SERVICES = [
  {
    id:"home_ncd_monitoring",
    name:"NCD Home Monitoring & Follow-up",
    description:"Nurse/clinician visit; BP; blood sugar where indicated; medication/adherence review; lifestyle counselling.",
    price:1500,
    icon:"🩺"
  },
  {
    id:"home_nursing_chronic",
    name:"Home Nursing & Chronic Care",
    description:"Nursing assessment; vital signs; medication support; basic nursing care; caregiver education.",
    price:2000,
    icon:"👩‍⚕️"
  },
  {
    id:"home_mobility_rehab",
    name:"Mobility & Rehabilitation Support",
    description:"Physiotherapy/mobility assessment; exercises; falls-risk assessment; caregiver guidance.",
    price:2000,
    icon:"🦽"
  },
  {
    id:"home_post_hospital",
    name:"Post-Hospital/Post-Procedure Home Care",
    description:"Clinical review; wound/recovery assessment; vital signs; medication review; referral where needed.",
    price:2000,
    icon:"🏠"
  },
  {
    id:"home_elderly_dependent",
    name:"Elderly & Dependent Patient Care",
    description:"Nursing assessment; mobility support; vital signs; caregiver education; care-plan follow-up.",
    price:2500,
    icon:"❤️"
  }
];

const LAB_TESTS = [
  {name:"Complete Blood Count (CBC)",price:500},
  {name:"Blood Sugar",price:300},
  {name:"Malaria Test",price:300},
  {name:"Urinalysis",price:300},
  {name:"Liver Function Test",price:1200},
  {name:"Kidney Function Test",price:1200},
  {name:"Lipid Profile",price:1000},
  {name:"Pregnancy Test",price:300}
];

const defaultDB = {

  users:[
    {id:"admin_boniface",name:"Boniface Machogu",email:"boniface@beaconafrica.org",password:"DemoBoniface2026!",role:"admin",phone:"0724741827",enabled:true},
    {id:"doctor_eunice",name:"Eunice Wanjiku Ngugi",email:"eunice.ngugi@beaconhope.demo",password:"DemoEunice2026!",role:"doctor",specialty:"Clinical Provider",phone:"0700000101",enabled:true,maxBookingsPerDay:10},
    {id:"doctor_george",name:"George Keitany",email:"george.keitany@beaconhope.demo",password:"DemoGeorge2026!",role:"doctor",specialty:"Clinical Provider",phone:"0700000102",enabled:true,maxBookingsPerDay:10},
    {id:"doctor_benard",name:"Benard Onyinsi",email:"benard.onyinsi@beaconhope.demo",password:"DemoBenard2026!",role:"doctor",specialty:"Clinical Provider",phone:"0700000103",enabled:true,maxBookingsPerDay:10},
    {id:"doctor_angela",name:"Angela Mwangi",email:"angela.mwangi@beaconhope.demo",password:"DemoAngela2026!",role:"doctor",specialty:"Clinical Provider",phone:"0700000104",enabled:true,maxBookingsPerDay:10},
    {id:"nurse_beatrice",name:"Beatrice Gitamo",email:"beatrice.gitamo@beaconhope.demo",password:"DemoBeatrice2026!",role:"nurse",phone:"0700000201",enabled:true,homeServiceProvider:true},
    {id:"nurse_gerald",name:"Gerald Ragira",email:"gerald.ragira@beaconhope.demo",password:"DemoGerald2026!",role:"nurse",phone:"0700000202",enabled:true,homeServiceProvider:true},
    {id:"nurse_dennis",name:"Dennis Onami",email:"dennis.onami@beaconhope.demo",password:"DemoDennis2026!",role:"nurse",phone:"0700000203",enabled:true,homeServiceProvider:true},
    {id:"nurse_caroline",name:"Caroline Wanjiku",email:"caroline.wanjiku@beaconhope.demo",password:"DemoCaroline2026!",role:"nurse",phone:"0700000204",enabled:true,homeServiceProvider:true},
    {id:"pharmacist_peter",name:"Peter Miano",email:"peter.miano@beaconhope.demo",password:"DemoPeter2026!",role:"pharmacist",phone:"0700000301",enabled:true},
    {id:"pharmacist_rajab",name:"Rajab Ziada",email:"rajab.ziada@beaconhope.demo",password:"DemoRajab2026!",role:"pharmacist",phone:"0700000302",enabled:true},
    {id:"rider_dancan",name:"Dancan Bande",email:"dancan.bande@beaconhope.demo",password:"DemoDancan2026!",role:"rider",phone:"0700000401",enabled:true,vehicle:"Motorbike",currentLocation:null},
    {id:"lab_tech1",name:"Laboratory Technician",email:"lab.technician@beaconhope.demo",password:"DemoLab2026!",role:"lab_technician",phone:"0700000501",enabled:true},
    {id:"patient1",name:"Demo Patient",email:"patient@beaconhope.demo",password:"Demo123!",role:"patient",phone:"0700000005",enabled:true,address:"Rongai, Nairobi"}
  ],

  appointments:[],
  consultations:[],
  prescriptions:[],
  pharmacyOrders:[],
  invoices:[],
  payments:[],
  deliveries:[],
  notifications:[],
  labRequests:[],
  homeServices:[],
  inventory:[
    {
      id:"med1",
      name:"Amoxicillin 500mg",
      price:25,
      quantity:100,
      expiry:"2027-12-31"
    },
    {
      id:"med2",
      name:"Paracetamol 500mg",
      price:10,
      quantity:200,
      expiry:"2027-12-31"
    },
    {
      id:"med3",
      name:"Cetirizine 10mg",
      price:20,
      quantity:80,
      expiry:"2027-12-31"
    }
  ],

  doctorSchedules:[],

  settings:{
    consultationFee:1500,
    deliveryRatePerKm:20,
    defaultDeliveryFee:100,
    deliveryChargeBands:[
      {id:"delivery_0_3",label:"0–3 km",fee:100},
      {id:"delivery_3_1_5",label:"3.1–5 km",fee:150},
      {id:"delivery_5_1_10",label:"5.1–10 km",fee:250},
      {id:"delivery_10_1_15",label:"10.1–15 km",fee:350},
      {id:"delivery_15_1_20",label:"15.1–20 km",fee:450},
      {id:"delivery_20_1_25",label:"20.1–25 km",fee:550},
      {id:"delivery_25_1_30",label:"25.1–30 km",fee:650},
      {id:"delivery_above_30",label:"Above 30 km — KES 20 per km, quoted before dispatch",fee:0,perKm:20,quotation:true}
    ],
    homeAssessmentFee:1500,
    homeServiceCatalog: null,
    serviceCatalog: null
  }
};


let db = loadDB();

/* Keep the home-service catalogue editable by administrators. */
if(!Array.isArray(db.settings.homeServiceCatalog)){
  db.settings.homeServiceCatalog = JSON.parse(JSON.stringify(HOME_SERVICES));
  saveDB();
}
HOME_SERVICES = db.settings.homeServiceCatalog;

/* General hospital service catalogue. Administrators can manage services
   beyond Home Services, including telemedicine/consultation services. */
const DEFAULT_SERVICE_CATALOG = [
  {id:"svc_consult_followup", category:"Telemedicine / Consultation", name:"Consultation fee/follow-up fee (15–30 minutes)", description:"Telemedicine consultation or follow-up with a clinical provider.", price:500, priceLabel:"KES 500", active:true},
  {id:"svc_bp_glucose", category:"Telemedicine / Consultation", name:"Telemedicine + review of home BP/glucose readings", description:"Virtual consultation including review of home blood pressure or glucose readings.", price:500, priceLabel:"KES 500–750", active:true},
  {id:"svc_physio_virtual", category:"Telemedicine / Consultation", name:"Physiotherapy virtual follow-up", description:"Virtual physiotherapy follow-up consultation.", price:750, priceLabel:"KES 750", active:true},
  {id:"svc_nursing_virtual", category:"Telemedicine / Consultation", name:"Nursing/caregiver virtual consultation", description:"Virtual nursing or caregiver consultation.", price:500, priceLabel:"KES 500", active:true}
];
if(!Array.isArray(db.settings.serviceCatalog)){
  db.settings.serviceCatalog = JSON.parse(JSON.stringify(DEFAULT_SERVICE_CATALOG));
  saveDB();
}
let SERVICE_CATALOG = db.settings.serviceCatalog;

function getActiveServices(category){
  return SERVICE_CATALOG.filter(s=>s.active!==false && (!category || s.category===category));
}

/* Medicine-delivery tariff from the current Beacon of Hope proposal.
   Administrators may update these amounts in Administration Settings. */
const DEFAULT_DELIVERY_CHARGE_BANDS = [
  {id:"delivery_0_3",label:"0–3 km",fee:100},
  {id:"delivery_3_1_5",label:"3.1–5 km",fee:150},
  {id:"delivery_5_1_10",label:"5.1–10 km",fee:250},
  {id:"delivery_10_1_15",label:"10.1–15 km",fee:350},
  {id:"delivery_15_1_20",label:"15.1–20 km",fee:450},
  {id:"delivery_20_1_25",label:"20.1–25 km",fee:550},
  {id:"delivery_25_1_30",label:"25.1–30 km",fee:650},
  {id:"delivery_above_30",label:"Above 30 km — KES 20 per km, quoted before dispatch",fee:0,perKm:20,quotation:true}
];

if(!Array.isArray(db.settings.deliveryChargeBands) || db.settings.deliveryChargeBands.length!==DEFAULT_DELIVERY_CHARGE_BANDS.length){
  db.settings.deliveryChargeBands = JSON.parse(JSON.stringify(DEFAULT_DELIVERY_CHARGE_BANDS));
  db.settings.deliveryRatePerKm = 20;
  db.settings.defaultDeliveryFee = 100;
  saveDB();
}

function getDeliveryChargeBands(){
  return Array.isArray(db.settings.deliveryChargeBands) && db.settings.deliveryChargeBands.length
    ? db.settings.deliveryChargeBands
    : DEFAULT_DELIVERY_CHARGE_BANDS;
}

function deliveryBandById(id){
  return getDeliveryChargeBands().find(b=>b.id===id);
}

function updateDeliveryFeeFromBand(){
  const select=document.getElementById("deliveryChargeBand");
  const feeInput=document.getElementById("deliveryFee");
  const note=document.getElementById("deliveryChargeNote");
  if(!select||!feeInput)return;
  const band=deliveryBandById(select.value);
  if(!band)return;
  if(!feeInput.dataset.manual || feeInput.dataset.manual!=="true"){
    feeInput.value=Number(band.fee||0);
  }
  if(note){
    note.innerHTML=band.quotation
      ? "Above 30 km: KES 20 per km, quoted before dispatch. The pharmacist should enter the agreed quoted amount below."
      : "Standard tariff shown above. The pharmacist may still adjust the final fee after confirming the patient's location.";
  }
}

let currentUser = null;

let currentPage = "dashboard";

let consultIntervals = {};

let riderWatchId = null;
const AUTH_TOKEN_KEY = "beaconHopeAuthToken";
const API_BASE_URL = `${window.location.origin}/api`;
localStorage.removeItem("beaconHopeCurrentUser");

async function apiRequest(path, options={}){
  const headers = new Headers(options.headers || {});
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if(token) headers.set("Authorization", `Bearer ${token}`);
  if(options.body && !headers.has("Content-Type")){
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });
  const responseText = await response.text();
  let data = {};
  if(responseText){
    try{
      data = JSON.parse(responseText);
    }catch{
      data = {error: responseText};
    }
  }
  if(!response.ok){
    const error = new Error(data.error || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return data;
}

function cacheBackendUser(apiUser){
  const existingIndex = db.users.findIndex(user =>
    user.id === apiUser.id ||
    user.email?.toLowerCase() === apiUser.email?.toLowerCase()
  );
  const existing = existingIndex >= 0 ? db.users[existingIndex] : {};
  const user = {...existing, ...apiUser};
  delete user.password;
  delete user.passwordHash;
  if(existingIndex >= 0) db.users[existingIndex] = user;
  else db.users.push(user);
  saveDB();
  return user;
}


/* =========================================================
DATABASE HELPERS
========================================================= */

function loadDB(){

  let saved =
    localStorage.getItem(DB_KEY);

  if(!saved){

    localStorage.setItem(
      DB_KEY,
      JSON.stringify(defaultDB)
    );

    return JSON.parse(
      JSON.stringify(defaultDB)
    );
  }

  let data;

  try{
    data=JSON.parse(saved);
  }catch(e){
    data=JSON.parse(
      JSON.stringify(defaultDB)
    );
  }

  Object.keys(defaultDB).forEach(key=>{

    if(data[key]===undefined){
      data[key]=
        JSON.parse(
          JSON.stringify(defaultDB[key])
        );
    }

  });

  /* Remove legacy demo accounts that are no longer in use.
     User-created accounts are preserved. */
  const legacyDemoEmails = new Set([
    "admin@beaconhope.demo",
    "doctor@beaconhope.demo",
    "specialist@beaconhope.demo",
    "pharmacist@beaconhope.demo",
    "rider@beaconhope.demo"
  ]);
  const legacyDemoIds = new Set([
    "admin1","doctor1","doctor2","pharmacist1","rider1"
  ]);
  data.users = data.users.filter(u => !legacyDemoEmails.has(String(u.email||"").toLowerCase()) && !legacyDemoIds.has(u.id));

  /* Remove unwanted user records from older localStorage data. */
  const removedUserNames = new Set(["vivia", "mary"]);
  data.users = data.users.filter(u => {
    const name = String(u.name || "").trim().toLowerCase();
    const email = String(u.email || "").trim().toLowerCase();
    return !removedUserNames.has(name) &&
           !removedUserNames.has(email.split("@")[0]);
  });

  /* Ensure all current demo/staff accounts are present. */
  defaultDB.users.forEach(defaultUser=>{
    const existing = data.users.find(u=>u.email===defaultUser.email);
    if(!existing){
      data.users.push(JSON.parse(JSON.stringify(defaultUser)));
    } else {
      /* Keep the current demo account identity/role/password in sync. */
      Object.assign(existing, JSON.parse(JSON.stringify(defaultUser)));
    }
  });

  /* Persist the cleaned user list so removed legacy records cannot reappear. */
  localStorage.setItem(DB_KEY, JSON.stringify(data));

  return data;
}


function saveDB(){

  localStorage.setItem(
    DB_KEY,
    JSON.stringify(db)
  );
}


function uid(prefix="id"){

  return prefix+"_"+Date.now()+"_"+
    Math.random()
      .toString(36)
      .substring(2,8);
}


function money(value){

  return "KES "+
    Number(value||0)
      .toLocaleString();
}


function today(){

  return new Date()
    .toISOString()
    .split("T")[0];
}


function escapeHTML(value){

  return String(value??"")
    .replaceAll("&","&")
    .replaceAll("<","<")
    .replaceAll(">",">")
    .replaceAll('"','&quot;')
    .replaceAll("'","'");
}


function invoiceNumber(prefix){

  return prefix+"-"+
    Date.now()
      .toString()
      .slice(-8);
}


function notify(userId,message,type="info"){

  db.notifications.push({

    id:uid("notification"),

    userId,

    message,

    type,

    createdAt:
      new Date().toISOString(),

    read:false

  });

  saveDB();
}


function getUser(id){

  return db.users.find(
    u=>u.id===id
  );
}

/* =========================================================
PATIENT STATUS — NEW CLIENT / RETURNING CLIENT
========================================================= */

function getPatientStatus(patientId){
  const patient=getUser(patientId);
  if(!patient || patient.role!=="patient") return "Not a patient";
  if(patient.patientStatusOverride==="returning") return "Returning Client";
  if(patient.patientStatusOverride==="new") return "New Client";

  const completedAppointment=db.appointments.some(a=>a.patientId===patientId && String(a.status||"").toLowerCase()==="completed");
  const completedConsultation=db.consultations.some(c=>c.patientId===patientId && String(c.status||"").toLowerCase()==="completed");
  const completedHomeCare=db.homeServices.some(h=>h.patientId===patientId && String(h.status||"").toLowerCase()==="completed" && h.requestType!=="assessment");

  return (completedAppointment || completedConsultation || completedHomeCare) ? "Returning Client" : "New Client";
}

function patientStatusBadge(patientId){
  const status=getPatientStatus(patientId);
  return `<span class="badge ${status==="Returning Client"?"badge-success":"badge-warning"}">${status}</span>`;
}

function togglePatientStatusOverride(patientId){
  if(currentUser?.role!=="admin") return;
  const patient=getUser(patientId);
  if(!patient || patient.role!=="patient") return;
  if(patient.patientStatusOverride==="returning"){
    patient.patientStatusOverride=null;
    saveDB(); renderUsers(); return;
  }
  if(confirm(`Confirm that ${patient.name} has an existing Beacon of Hope Hospital clinical record?`)){
    patient.patientStatusOverride="returning";
    saveDB(); renderUsers();
  }
}


/* =========================================================
LOGIN
========================================================= */

document
  .getElementById("loginForm")
  .addEventListener(
    "submit",
    event => window.beaconLogin(event)
  );


function login(e){

  e.preventDefault();

  const email =
    document
      .getElementById("loginEmail")
      .value
      .trim()
      .toLowerCase();

  const password =
    document
      .getElementById("loginPassword")
      .value;

  const user =
    db.users.find(
      u=>
        u.email.toLowerCase()===email &&
        u.password===password
    );

  if(!user){

    alert(
      "Invalid email or password."
    );

    return;
  }

  if(!user.enabled){

    alert(
      "This account has been disabled. Please contact the administrator."
    );

    return;
  }

  if(user.mustChangePassword){

    showMandatoryPasswordChange(user);

    return;

  }

  currentUser=user;

  localStorage.setItem(
    "beaconHopeCurrentUser",
    JSON.stringify(user)
  );

  openApp();
}

function showMandatoryPasswordChange(user){

  document.getElementById("modalContent").innerHTML=`

    <h2>Set Your Password</h2>

    <div class="alert alert-info">
      This is your first sign-in with a login code. Please set your
      own password to continue to ${escapeHTML(formatRole(user.role))}
      account for ${escapeHTML(user.name)}.
    </div>

    <form onsubmit="submitMandatoryPasswordChange(event,'${user.id}')">

      <div class="form-group">
        <label>New Password</label>
        <input id="mandatoryNewPassword" type="password" class="form-control" minlength="6" required>
      </div>

      <div class="form-group">
        <label>Confirm New Password</label>
        <input id="mandatoryNewPassword2" type="password" class="form-control" minlength="6" required>
      </div>

      <button class="btn btn-primary btn-block">Set Password & Continue</button>

    </form>

  `;

  openModal();
}

function submitMandatoryPasswordChange(e,userId){

  e.preventDefault();

  const user=getUser(userId);

  if(!user)return;

  const p1=document.getElementById("mandatoryNewPassword").value;
  const p2=document.getElementById("mandatoryNewPassword2").value;

  if(p1!==p2){
    alert("The passwords do not match.");
    return;
  }

  user.password=p1;
  user.mustChangePassword=false;

  saveDB();

  closeModal();

  currentUser=user;

  localStorage.setItem(
    "beaconHopeCurrentUser",
    JSON.stringify(user)
  );

  document.getElementById("loginEmail").value="";
  document.getElementById("loginPassword").value="";

  openApp();
}


function logout(){

  currentUser=null;

  localStorage.removeItem(AUTH_TOKEN_KEY);

  localStorage.removeItem(
    "beaconHopeCurrentUser"
  );

  document
    .getElementById("app")
    .classList.add("hidden");

  document
    .getElementById("loginPage")
    .classList.remove("hidden");

  document
    .getElementById("loginEmail")
    .value="";

  document
    .getElementById("loginPassword")
    .value="";
}


/* =========================================================
PATIENT REGISTRATION
========================================================= */

function showRegistration(){

  document.getElementById(
    "modalContent"
  ).innerHTML=`

    <h2>Create Patient Account</h2>

    <p class="text-muted">
      Create your own patient account.
    </p>

    <form onsubmit="registerPatient(event)">

      <div class="form-group">
        <label>Full Name</label>
        <input
          id="regName"
          class="form-control"
          required
        >
      </div>

      <div class="grid grid-2">

        <div class="form-group">
          <label>Email</label>
          <input
            id="regEmail"
            type="email"
            class="form-control"
            required
          >
        </div>

        <div class="form-group">
          <label>Phone</label>
          <input
            id="regPhone"
            class="form-control"
            required
          >
        </div>

      </div>

      <div class="form-group">
        <label>Address</label>
        <textarea
          id="regAddress"
          class="form-control"
          required
        ></textarea>


  </div>

  <div class="grid grid-2">

    <div class="form-group">
      <label>Password</label>
      <input
        id="regPassword"
        type="password"
        class="form-control"
        minlength="8"
        required
      >
    </div>

    <div class="form-group">
      <label>Confirm Password</label>
      <input
        id="regPassword2"
        type="password"
        class="form-control"
        minlength="8"
        required
      >
    </div>

  </div>

  <div class="flex">

    <button class="btn btn-primary">
      Create Account
    </button>

    <button
      type="button"
      class="btn btn-secondary"
      onclick="closeModal()"
    >
      Cancel
    </button>

  </div>

</form>

`;

openModal();
}

function registerPatient(e){

e.preventDefault();

const name =
document.getElementById(
"regName"
).value.trim();

const email =
document.getElementById(
"regEmail"
).value.trim().toLowerCase();

const phone =
document.getElementById(
"regPhone"
).value.trim();

const address =
document.getElementById(
"regAddress"
).value.trim();

const password =
document.getElementById(
"regPassword"
).value;

const password2 =
document.getElementById(
"regPassword2"
).value;

if(password!==password2){


alert(
  "Passwords do not match."
);

return;

}

if(
db.users.some(
u=>u.email.toLowerCase()===email
)
){


alert(
  "An account with this email already exists."
);

return;

}

const user={


id:uid("patient"),

name,

email,

password,

phone,

role:"patient",

enabled:true,

address,

lat:null,

lng:null,

patientStatusOverride:null

};

db.users.push(user);

saveDB();

closeModal();

alert(
"Patient account created successfully. You can now sign in."
);
}

/* =========================================================
APP
========================================================= */

function openApp(){

document
.getElementById("loginPage")
.classList.add("hidden");

document
.getElementById("app")
.classList.remove("hidden");

document
.getElementById("topUserName")
.textContent=currentUser.name;

document
.getElementById("topUserRole")
.textContent=
formatRole(currentUser.role);

document
.getElementById("userAvatar")
.textContent=
currentUser.name
.charAt(0)
.toUpperCase();

buildSidebar();

navigate("dashboard");
}

function formatRole(role){

const map={
admin:"Administrator",
doctor:"Doctor",
nurse:"Nursing Officer",
pharmacist:"Pharmacist",
rider:"Rider",
patient:"Patient"
};

return map[role]||role;
}

/* =========================================================
SIDEBAR
========================================================= */

function buildSidebar(){
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = "";

  const addSection = (title, items) => {
    const section = document.createElement("div");
    section.className = "sidebar-section";
    section.textContent = title;
    sidebar.appendChild(section);

    items.forEach(({ page, label, action }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.page = page;
      button.textContent = label;
      button.onclick = () => navigate(action || page);
      sidebar.appendChild(button);
    });
  };

  addSection("Main", [
    { page: "dashboard", label: "🏠 Dashboard" }
  ]);

  if (currentUser.role === "patient") {
    addSection("Healthcare", [
      { page: "appointments", label: "📅 Appointments" },
      { page: "consultation", label: "🎥 Consultation" },
      { page: "prescriptions", label: "💊 Prescriptions" },
      { page: "pharmacy", label: "💊 Pharmacy Orders" },
      { page: "laboratory", label: "🧪 Laboratory" },
      { page: "home-services", label: "🏠 Home Services" },
      { page: "deliveries", label: "🚚 Delivery Status" },
      { page: "invoices", label: "💳 Payments" },
      { page: "notifications", label: "🔔 Notifications" }
    ]);
  }

  if (currentUser.role === "doctor") {
    addSection("Doctor", [
      { page: "appointments", label: "📅 Appointments" },
      { page: "consultation", label: "🎥 Consultation" },
      { page: "prescriptions", label: "💊 Prescriptions" },
      { page: "doctor-settings", label: "⚙️ Booking Capacity" },
      { page: "notifications", label: "🔔 Notifications" }
    ]);
  }

  if (currentUser.role === "pharmacist") {
    addSection("Pharmacy", [
      { page: "pharmacy", label: "💊 Pharmacy Orders" },
      { page: "inventory", label: "📦 Inventory" },
      { page: "deliveries", label: "🚚 Paid Deliveries" },
      { page: "notifications", label: "🔔 Notifications" }
    ]);
  }

  if (currentUser.role === "rider") {
    addSection("Delivery", [
      { page: "deliveries", label: "🚚 My Deliveries" },
      { page: "rider-map", label: "🗺️ Navigation" },
      { page: "notifications", label: "🔔 Notifications" }
    ]);
  }

  if (currentUser.role === "admin") {
    addSection("Administration", [
      { page: "users", label: "👥 Users" },
      { page: "appointments", label: "📅 Appointments" },
      { page: "pharmacy", label: "💊 Pharmacy Orders" },
      { page: "inventory", label: "📦 Inventory" },
      { page: "admin-orders", label: "🚚 Dispatch & Rider Assignment" },
      { page: "deliveries", label: "📍 Deliveries" },
      { page: "laboratory", label: "🧪 Laboratory" },
      { page: "home-services", label: "🏠 Home Services" },
      { page: "invoices", label: "💳 Invoices" },
      { page: "notifications", label: "🔔 Notifications" }
    ]);
  }

  addSection("Account", [
    { page: "profile", label: "👤 My Profile" }
  ]);
}

/* =========================================================
NAVIGATION
========================================================= */

function navigate(page){

currentPage=page;

document
.querySelectorAll(
".sidebar button[data-page]"
)
.forEach(button=>{


  button.classList.toggle(
    "active",
    button.dataset.page===page
  );

});

document
.getElementById("sidebar")
.classList.remove("open");

const pages={


dashboard:renderDashboard,

appointments:renderAppointments,

consultation:renderConsultation,

prescriptions:renderPrescriptions,

pharmacy:renderPharmacy,

inventory:renderInventory,

deliveries:renderDeliveries,

invoices:renderInvoices,

laboratory:renderLaboratory,

"home-services":renderHomeServices,

"admin-orders":renderAdminOrders,

users:renderUsers,

"doctor-settings":renderDoctorSettings,

"rider-map":renderRiderMap,

notifications:renderNotifications,

profile:renderProfile

};

if(pages[page]){
pages[page]();
}else{
renderDashboard();
}
}

function toggleSidebar(){

document
.getElementById("sidebar")
.classList.toggle("open");
}

/* =========================================================
DASHBOARD
========================================================= */

function renderDashboard(){

if(currentUser.role==="admin"){
renderAdminDashboard();
return;
}

if(currentUser.role==="patient"){
renderPatientDashboard();
return;
}

if(currentUser.role==="doctor"){
renderDoctorDashboard();
return;
}

if(currentUser.role==="pharmacist"){
renderPharmacistDashboard();
return;
}

if(currentUser.role==="rider"){
renderRiderDashboard();
return;
}

if(currentUser.role==="nurse"){
renderNurseDashboard();
return;
}
}

/* ADMIN DASHBOARD */

function renderNurseDashboard(){
  const mine=db.homeServices.filter(h=>h.providerId===currentUser.id);
  document.getElementById("content").innerHTML=`
    <h1 class="page-title">Home Services — Nursing Officer</h1>
    <p class="text-muted">View assigned home services, patient location and contact details.</p>
    <div class="card"><div class="table-wrap"><table>
      <tr><th>Service</th><th>Patient</th><th>Phone</th><th>Location</th><th>Date</th><th>Time</th><th>Status</th><th>Action</th></tr>
      ${mine.length ? mine.map(h=>{ const p=getUser(h.patientId); return `<tr>
        <td>${escapeHTML(h.service)}</td><td>${escapeHTML(p?.name||"-")}</td><td>${escapeHTML(p?.phone||"-")}</td>
        <td>${escapeHTML(h.address||p?.address||"-")}</td><td>${h.date}</td><td>${h.time}</td>
        <td><span class="badge ${h.status==="Completed"?"badge-success":"badge-info"}">${escapeHTML(h.status)}</span></td>
        <td><button class="btn btn-primary" onclick="assignHomeService('${h.id}')">Manage</button></td></tr>`; }).join("") : `<tr><td colspan="8">No home services assigned.</td></tr>`} 
    </table></div></div>`;
}

function createElement(tag, className, textContent){
 const element = document.createElement(tag);
 if (className) element.className = className;
 if (textContent !== undefined && textContent !== null) element.textContent = textContent;
 return element;
}

function appendChildren(parent, ...children){
 children.forEach(child => {
   if (child) parent.appendChild(child);
 });
 return parent;
}

function makeButton(label, variant = "primary", onClick){
 const button = createElement("button", `btn btn-${variant}`);
 button.type = "button";
 button.textContent = label;
 if (typeof onClick === "function") {
   button.onclick = onClick;
 }
 return button;
}

function makeStatCard(title, value){
 const card = createElement("div", "stat-card");
 appendChildren(card,
   createElement("div", "stat-title", title),
   createElement("div", "stat-number", value)
 );
 return card;
}

function makeAlert(message, tone = "info"){
 const alert = createElement("div", `alert alert-${tone}`);
 alert.innerHTML = message;
 return alert;
}

function createAppointmentTableElement(list){
 const wrapper = createElement("div", "table-wrap");
 const table = document.createElement("table");
 const thead = document.createElement("thead");
 const headRow = document.createElement("tr");
 appendChildren(headRow,
   createElement("th", null, "Date"),
   createElement("th", null, "Start"),
   createElement("th", null, "End"),
   createElement("th", null, "Patient"),
   createElement("th", null, "Doctor"),
   createElement("th", null, "Specialty"),
   createElement("th", null, "Type"),
   createElement("th", null, "Status"),
   createElement("th", null, "Action")
 );
 thead.appendChild(headRow);
 table.appendChild(thead);

 const tbody = document.createElement("tbody");
 list.forEach(a => {
   const patient = getUser(a.patientId);
   const doctor = getUser(a.doctorId);
   const row = document.createElement("tr");
   const status = createElement("td");
   status.innerHTML = `<span class="badge ${a.status === "Confirmed" ? "badge-success" : a.status === "Pending" ? "badge-warning" : a.status === "Cancelled" ? "badge-danger" : "badge-info"}">${escapeHTML(a.status || "-")}</span>`;

   const action = document.createElement("td");
   if (a.status === "Confirmed") {
     const join = makeButton("🎥 Join", "primary", () => joinConsultation(a.id));
     action.appendChild(join);
   }

   appendChildren(row,
     createElement("td", null, a.date || "-"),
     createElement("td", null, a.time || "-"),
     createElement("td", null, a.endTime || "-"),
     createElement("td", null, patient ? patient.name : "-"),
     createElement("td", null, doctor ? doctor.name : "-"),
     createElement("td", null, doctor ? (doctor.specialty || "General Doctor") : "-"),
     createElement("td", null, a.type || "-"),
     status,
     action
   );
   tbody.appendChild(row);
 });

 table.appendChild(tbody);
 wrapper.appendChild(table);
 return wrapper;
}

function makePageContent(){
 const content = document.getElementById("content");
 content.innerHTML = "";
 return content;
}

function renderAdminDashboard(){
 const content = makePageContent();
 const patients = db.users.filter(u => u.role === "patient").length;
 const doctors = db.users.filter(u => u.role === "doctor").length;
 const paidInvoices = db.invoices.filter(i => i.status === "Paid");
 const revenue = paidInvoices.reduce((sum, i) => sum + Number(i.total), 0);
 const paidDeliveries = db.deliveries.filter(d =>
   d.status === "Paid - Awaiting Dispatch" ||
   d.status === "Assigned" ||
   d.status === "Picked Up" ||
   d.status === "In Transit"
 ).length;
 const pendingPayments = db.invoices.filter(i => i.status === "Pending").length;
 const homeRequests = db.homeServices.length;
 const pharmacyOrders = db.pharmacyOrders.length;

 const title = createElement("h1", "page-title", "Administrator Dashboard");
 const subtitle = createElement("p", "text-muted", "Complete operational overview.");

 const stats = createElement("div", "grid grid-4");
 appendChildren(stats,
   makeStatCard("Patients", String(patients)),
   makeStatCard("Doctors", String(doctors)),
   makeStatCard("Pending Payments", String(pendingPayments)),
   makeStatCard("Paid Deliveries", String(paidDeliveries))
 );

 const stats2 = createElement("div", "grid grid-4");
 appendChildren(stats2,
   makeStatCard("Pharmacy Orders", String(pharmacyOrders)),
   makeStatCard("Home Services", String(homeRequests)),
   makeStatCard("Laboratory Requests", String(db.labRequests.length)),
   makeStatCard("Revenue", money(revenue))
 );

 const grid = createElement("div", "grid grid-2");

 const financialCard = createElement("div", "card");
 const financeTitle = createElement("h3", null, "Financial Analysis");
 const table = createElement("table");
 const header = document.createElement("tr");
 appendChildren(header,
   createElement("th", null, "Type"),
   createElement("th", null, "Paid"),
   createElement("th", null, "Revenue")
 );
 table.appendChild(header);

 ["Consultation", "Pharmacy", "Delivery", "Home Service", "Laboratory"].forEach(type => {
   const invoices = db.invoices.filter(i => i.type === type);
   const paid = invoices.filter(i => i.status === "Paid");
   const total = paid.reduce((sum, i) => sum + Number(i.total), 0);
   const row = document.createElement("tr");
   appendChildren(row,
     createElement("td", null, type),
     createElement("td", null, String(paid.length)),
     createElement("td", null, money(total))
   );
   table.appendChild(row);
 });
 financialCard.append(financeTitle, table);

 const workflowCard = createElement("div", "card");
 const workflowTitle = createElement("h3", null, "Important Workflow");
 const successAlert = makeAlert("When a patient pays a delivery invoice, the order appears immediately in the <strong>Pharmacy Dispatch & Rider Assignment</strong> section.", "success");
 const infoAlert = makeAlert("The pharmacist can then mark the paid medicine order as <strong>Ready / Dispatched</strong>.", "info");
 const openQueue = makeButton("Open Dispatch Queue", "primary", () => navigate("admin-orders"));
 appendChildren(workflowCard, workflowTitle, successAlert, infoAlert, openQueue);

 appendChildren(grid, financialCard, workflowCard);

 const adminCard = createElement("div", "card");
 const quickTitle = createElement("h3", null, "Quick Administration");
 const actions = createElement("div", "flex");
 appendChildren(actions,
   makeButton("Manage Users", "primary", () => navigate("users")),
   makeButton("Pharmacy", "secondary", () => navigate("pharmacy")),
   makeButton("Home Services", "secondary", () => navigate("home-services")),
   makeButton("Laboratory", "secondary", () => navigate("laboratory"))
 );
 adminCard.append(quickTitle, actions);

 appendChildren(content, title, subtitle, stats, createElement("br"), stats2, createElement("br"), grid, adminCard);
}

function adminRevenueRows(){
 const types = ["Consultation", "Pharmacy", "Delivery", "Home Service", "Laboratory"];
 return types.map(type => {
   const invoices = db.invoices.filter(i => i.type === type);
   const paid = invoices.filter(i => i.status === "Paid");
   const total = paid.reduce((sum, i) => sum + Number(i.total), 0);
   return `
     <tr>
       <td>${type}</td>
       <td>${paid.length}</td>
       <td>${money(total)}</td>
     </tr>
   `;
 }).join("");
}

function renderPatientDashboard(){
 const content = makePageContent();
 const appointments = db.appointments.filter(a => a.patientId === currentUser.id);
 const invoices = db.invoices.filter(i => i.patientId === currentUser.id && i.status === "Pending");
 const deliveries = db.deliveries.filter(d => d.patientId === currentUser.id && d.status !== "Delivered");
 const homeCount = db.homeServices.filter(s => s.patientId === currentUser.id).length;

 appendChildren(content,
   createElement("h1", "page-title", `Welcome, ${currentUser.name}`),
   makeAlert("Manage appointments, prescriptions, laboratory services, home services, payments and deliveries from one place.", "info"),
   createElement("div", "grid grid-4"),
   createElement("br")
 );

 const stats = content.querySelector(".grid.grid-4");
 appendChildren(stats,
   makeStatCard("Appointments", String(appointments.length)),
   makeStatCard("Unpaid Invoices", String(invoices.length)),
   makeStatCard("Active Deliveries", String(deliveries.length)),
   makeStatCard("Home Services", String(homeCount))
 );

 const quickWrap = createElement("div", "grid grid-2");
 const quickCard = createElement("div", "card");
 quickCard.appendChild(createElement("h3", null, "Quick Actions"));
 const quickButtons = createElement("div", "grid grid-2");
 appendChildren(quickButtons,
   makeButton("📅 Book Doctor", "primary", () => navigate("appointments")),
   makeButton("🏠 Home Service", "primary", () => navigate("home-services")),
   makeButton("🧪 Lab Request", "secondary", () => navigate("laboratory")),
   makeButton("🚚 Delivery Status", "secondary", () => navigate("deliveries")),
   makeButton("💳 Pay Invoice", "secondary", () => navigate("invoices"))
 );
 quickCard.appendChild(quickButtons);
 quickWrap.appendChild(quickCard);
 content.appendChild(quickWrap);
}

function renderDoctorDashboard(){
 const content = makePageContent();
 const appointments = db.appointments.filter(a =>
   a.doctorId === currentUser.id && (a.date === today() || a.status === "Confirmed")
 ).sort((a, b) => `${a.date}T${a.time || "00:00"}`.localeCompare(`${b.date}T${b.time || "00:00"}`));
 const max = Number(currentUser.maxBookingsPerDay || 10);

 appendChildren(content,
   createElement("h1", "page-title", "Doctor Dashboard"),
   makeAlert(`Specialty: <strong>${escapeHTML(currentUser.specialty || "General Doctor")}</strong><br>Consultation duration: <strong>Maximum 45 minutes</strong>.`, "info"),
   createElement("div", "grid grid-4")
 );

 const stats = content.querySelector(".grid.grid-4");
 appendChildren(stats,
   makeStatCard("Appointments", String(appointments.length)),
   makeStatCard("Maximum Per Day", String(max)),
   makeStatCard("Remaining", String(Math.max(0, max - appointments.length))),
   makeStatCard("Prescriptions", String(db.prescriptions.filter(p => p.doctorId === currentUser.id).length))
 );

 const card = createElement("div", "card");
 card.appendChild(createElement("h3", null, "Appointments"));
 if (appointments.length) {
   card.appendChild(createAppointmentTableElement(appointments));
 } else {
   const empty = createElement("div", "empty", "No appointments today.");
   card.appendChild(empty);
 }
 content.appendChild(card);
}

/* PHARMACIST DASHBOARD */

function renderPharmacistDashboard(){

const pending =
db.pharmacyOrders.filter(
o=>
o.status==="Pending" ||
o.status==="Awaiting Pharmacy Payment"
).length;

const paid =
db.pharmacyOrders.filter(
o=>
o.status==="Paid - Awaiting Pharmacist Dispatch" ||
o.status==="Ready for Delivery"
).length;

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">
  Pharmacy Dashboard
</h1>

<div class="grid grid-4">

  <div class="stat-card">
    <div class="stat-title">
      Total Orders
    </div>
    <div class="stat-number">
      ${db.pharmacyOrders.length}
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-title">
      Pending Processing
    </div>
    <div class="stat-number">
      ${pending}
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-title">
      Paid / Ready
    </div>
    <div class="stat-number">
      ${paid}
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-title">
      Inventory Items
    </div>
    <div class="stat-number">
      ${db.inventory.length}
    </div>
  </div>

</div>

<br>

<div class="alert alert-success">

  <strong>New workflow:</strong>

  Patient pays medicine invoice →
  patient pays delivery invoice →
  Admin sees the payment →
  Pharmacist can dispatch/mark ready →
  Pharmacy assigns rider.

</div>

<button
  class="btn btn-primary"
  onclick="navigate('pharmacy')"
>
  Open Pharmacy Orders
</button>

`;
}

/* RIDER DASHBOARD */

function renderRiderDashboard(){

const deliveries =
db.deliveries.filter(
d=>d.riderId===currentUser.id
);

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">
  Rider Dashboard
</h1>

<div class="grid grid-4">

  <div class="stat-card">
    <div class="stat-title">
      Assigned
    </div>
    <div class="stat-number">
      ${
        deliveries.filter(
          d=>d.status==="Assigned"
        ).length
      }
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-title">
      Picked Up
    </div>
    <div class="stat-number">
      ${
        deliveries.filter(
          d=>d.status==="Picked Up"
        ).length
      }
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-title">
      In Transit
    </div>
    <div class="stat-number">
      ${
        deliveries.filter(
          d=>d.status==="In Transit"
        ).length
      }
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-title">
      Delivered
    </div>
    <div class="stat-number">
      ${
        deliveries.filter(
          d=>d.status==="Delivered"
        ).length
      }
    </div>
  </div>

</div>

<br>


`;
}

/* =========================================================
APPOINTMENTS
========================================================= */

function renderAppointments(){

if(currentUser.role==="patient"){
renderPatientAppointments();
}else{
renderDoctorAppointments();
}
}

function renderPatientAppointments(){

const mine =
db.appointments.filter(
a=>a.patientId===currentUser.id
);

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">

  My Appointments

  <button
    class="btn btn-primary"
    onclick="showBookingForm()"
  >
    + Book Appointment
  </button>

</h1>

<div class="alert alert-info">

  Every consultation is a maximum of
  <strong>45 minutes</strong>.

  Example:
  a 10:00 appointment occupies
  <strong>10:00–10:45</strong>.
  The next available start is 10:45.

</div>

<div class="card">

  ${
    mine.length
    ? appointmentTable(mine)
    : `<div class="empty">
         No appointments booked.
       </div>`
  }

</div>

`;
}

function renderDoctorAppointments(){

const mine =
db.appointments.filter(
a=>a.doctorId===currentUser.id
);

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">
  My Appointments
</h1>

<div class="card">

  ${
    mine.length
    ? appointmentTable(mine)
    : `<div class="empty">
         No appointments.
       </div>`
  }

</div>

`;
}

function appointmentTable(list){

return`


<div class="table-wrap">

  <table>

    <thead>

      <tr>
        <th>Date</th>
        <th>Start</th>
        <th>End</th>
        <th>Patient</th>
        <th>Doctor</th>
        <th>Specialty</th>
        <th>Type</th>
        <th>Status</th>
        <th>Action</th>
      </tr>

    </thead>

    <tbody>

      ${list.map(a=>{

        const patient=
          getUser(a.patientId);

        const doctor=
          getUser(a.doctorId);

        return`

          <tr>

            <td>${a.date}</td>

            <td>
              <strong>${a.time}</strong>
            </td>

            <td>
              ${a.endTime||"-"}
            </td>

            <td>
              ${escapeHTML(
                patient?.name||"-"
              )}
            </td>

            <td>
              ${escapeHTML(
                doctor?.name||"-"
              )}
            </td>

            <td>
              ${escapeHTML(
                doctor?.specialty||
                "General Doctor"
              )}
            </td>

            <td>${a.type}</td>

            <td>

              <span class="badge ${
                a.status==="Confirmed"
                ? "badge-success"
                : a.status==="Pending Payment"
                ? "badge-warning"
                : a.status==="Completed"
                ? "badge-dark"
                : "badge-info"
              }">

                ${a.status==="Confirmed" ? "PAID / CONFIRMED" : a.status}

              </span>

            </td>

            <td>

              ${
                a.status==="Confirmed"
                ?
                `<button
                   class="btn btn-primary"
                   onclick="joinConsultation('${a.id}')"
                 >
                   Join
                 </button>`
                :
                ""
              }

            </td>

          </tr>
        `;

      }).join("")}

    </tbody>

  </table>

</div>

`;
}

/* BOOKING FORM */

function showBookingForm(){

const doctors =
db.users.filter(
u=>
u.role==="doctor" &&
u.enabled
);

document.getElementById(
"modalContent"
).innerHTML=`


<h2>Book Telemedicine Consultation</h2>

<div class="alert alert-info">

  <strong>45-minute appointment rule</strong><br>

  If a consultation starts at 10:00,
  it occupies 10:00–10:45.
  Another consultation cannot start at 10:15
  or 10:30.
  The next valid start time is 10:45.

</div>

<form onsubmit="createAppointment(event)">

  <div class="form-group">

    <label>Clinical Provider / Doctor / Clinician</label>

    <select
      id="bookDoctor"
      class="form-control"
      onchange="updateBookingAvailability()"
      required
    >

      <option value="">
        Select doctor
      </option>

      ${doctors.map(d=>`

        <option value="${d.id}">

          ${escapeHTML(d.name)}
          —
          ${escapeHTML(
            d.specialty||
            "General Doctor"
          )}

        </option>

      `).join("")}

    </select>

  </div>

  <div class="form-group">

    <label>Specialty</label>

    <select
      id="bookSpecialty"
      class="form-control"
      onchange="filterDoctorsBySpecialty()"
    >

      <option value="">
        All specialties
      </option>

      ${SPECIALTIES.map(s=>`
        <option>${s}</option>
      `).join("")}

    </select>

  </div>

  <div class="grid grid-2">

    <div class="form-group">

      <label>Date</label>

      <input
        id="bookDate"
        type="date"
        class="form-control"
        min="${today()}"
        onchange="updateBookingAvailability()"
        required
      >

    </div>

    <div class="form-group">

      <label>Start Time</label>

      <input
        id="bookTime"
        type="time"
        class="form-control"
        onchange="updateBookingAvailability()"
        required
      >

    </div>

  </div>

  <div id="slotInformation"></div>

  <div class="form-group">

    <label>Consultation Type</label>

    <select
      id="bookType"
      class="form-control"
    >

      <option>
        Video Consultation
      </option>

      <option>
        Audio Consultation
      </option>

    </select>

  </div>

  <div class="alert alert-warning">

    Consultation fee:
    <strong>
      ${money(db.settings.consultationFee)}
    </strong>

    <br>

    The appointment will remain
    <strong>Pending Payment</strong>
    until the consultation invoice is paid.

  </div>

  <button class="btn btn-primary">
    Book Appointment
  </button>

  <button
    type="button"
    class="btn btn-secondary"
    onclick="closeModal()"
  >
    Cancel
  </button>

</form>

`;

openModal();
}

function filterDoctorsBySpecialty(){

const specialty =
document.getElementById(
"bookSpecialty"
).value;

const select =
document.getElementById(
"bookDoctor"
);

const doctors =
db.users.filter(
u=>
u.role==="doctor" &&
u.enabled &&
(
!specialty ||
u.specialty===specialty
)
);

select.innerHTML=`


<option value="">
  Select doctor
</option>

${doctors.map(d=>`

  <option value="${d.id}">

    ${escapeHTML(d.name)}
    —
    ${escapeHTML(
      d.specialty||
      "General Doctor"
    )}

  </option>

`).join("")}

`;

updateBookingAvailability();
}

function timeToMinutes(time){

const [h,m]=time
.split(":")
.map(Number);

return h*60+m;
}

function minutesToTime(minutes){

const h=
Math.floor(minutes/60)
.toString()
.padStart(2,"0");

const m=
(minutes%60)
.toString()
.padStart(2,"0");

return `${h}:${m}`;
}

function addMinutesToTime(
time,
minutes
){

return minutesToTime(
timeToMinutes(time)+minutes
);
}

function overlap(
start1,
end1,
start2,
end2
){

return (
start1<end2 &&
end1>start2
);
}

function getDoctorMaxBookings(
doctorId,
date
){

const schedule =
db.doctorSchedules.find(
s=>
s.doctorId===doctorId &&
s.date===date
);

if(schedule){
return Number(
schedule.maxBookings
);
}

const doctor=
getUser(doctorId);

return Number(
doctor?.maxBookingsPerDay||10
);
}

function getDoctorAppointments(
doctorId,
date
){

return db.appointments.filter(
a=>
a.doctorId===doctorId &&
a.date===date &&
a.status!=="Cancelled"
);
}

function findNextAvailable(
doctorId,
date,
requestedTime
){

let candidate=
timeToMinutes(requestedTime);

const appointments=
getDoctorAppointments(
doctorId,
date
)
.sort(
(a,b)=>
timeToMinutes(a.time)-
timeToMinutes(b.time)
);

for(const appointment of appointments){


const existingStart=
  timeToMinutes(
    appointment.time
  );

const existingEnd=
  timeToMinutes(
    appointment.endTime ||
    addMinutesToTime(
      appointment.time,
      45
    )
  );

const candidateEnd=
  candidate+45;

if(
  overlap(
    candidate,
    candidateEnd,
    existingStart,
    existingEnd
  )
){

  candidate=
    existingEnd;

}

}

if(candidate+45>22*60){
return null;
}

return minutesToTime(candidate);
}

function updateBookingAvailability(){

const doctorId =
document.getElementById(
"bookDoctor"
)?.value;

const date =
document.getElementById(
"bookDate"
)?.value;

const time =
document.getElementById(
"bookTime"
)?.value;

const box =
document.getElementById(
"slotInformation"
);

if(!box)return;

if(!doctorId||!date||!time){


box.innerHTML=`
  <div class="alert alert-info">
    Select doctor, date and start time
    to check availability.
  </div>
`;

return;

}

const doctor=
getUser(doctorId);

const max=
getDoctorMaxBookings(
doctorId,
date
);

const appointments=
getDoctorAppointments(
doctorId,
date
);

const requestedStart=
timeToMinutes(time);

const requestedEnd=
requestedStart+45;

const conflict=
appointments.find(a=>{


  const start=
    timeToMinutes(a.time);

  const end=
    timeToMinutes(
      a.endTime ||
      addMinutesToTime(
        a.time,
        45
      )
    );

  return overlap(
    requestedStart,
    requestedEnd,
    start,
    end
  );
});

const next=
findNextAvailable(
doctorId,
date,
time
);

if(appointments.length>=max){


box.innerHTML=`

  <div class="alert alert-danger">

    <strong>
      Doctor fully booked.
    </strong>

    ${escapeHTML(
      doctor?.name||""
    )}

    has reached the maximum
    of ${max} bookings for ${date}.

  </div>
`;

return;

}

if(conflict){


box.innerHTML=`

  <div class="alert alert-danger">

    <strong>
      Time slot unavailable.
    </strong>

    This consultation would overlap
    with the existing appointment
    from ${conflict.time}
    to ${conflict.endTime}.

    <br><br>

    ${
      next
      ?
      `<strong>
         Next available start:
         ${next}
       </strong>`
      :
      "No later slot is available today."
    }

  </div>
`;

return;

}

box.innerHTML=`


<div class="alert alert-success">

  <strong>Slot available.</strong>

  <br>

  ${date}

  <strong>
    ${time} – ${addMinutesToTime(time,45)}
  </strong>

  <br>

  Consultation duration:
  <strong>45 minutes maximum</strong>.

  <br>

  Daily bookings:
  ${appointments.length}/${max}

</div>

`;
}

function createAppointment(e){

e.preventDefault();

const doctorId =
document.getElementById(
"bookDoctor"
).value;

const date =
document.getElementById(
"bookDate"
).value;

const time =
document.getElementById(
"bookTime"
).value;

const type =
document.getElementById(
"bookType"
).value;

if(!doctorId||!date||!time){


alert(
  "Complete the appointment form."
);

return;

}

const doctor=
getUser(doctorId);

const max=
getDoctorMaxBookings(
doctorId,
date
);

const appointments=
getDoctorAppointments(
doctorId,
date
);

if(appointments.length>=max){


alert(
  `This doctor has reached the maximum of ${max} bookings for ${date}.`
);

return;

}

const start=
timeToMinutes(time);

const end=
start+45;

const conflict=
appointments.find(a=>{


  const aStart=
    timeToMinutes(a.time);

  const aEnd=
    timeToMinutes(
      a.endTime ||
      addMinutesToTime(
        a.time,
        45
      )
    );

  return overlap(
    start,
    end,
    aStart,
    aEnd
  );
});

if(conflict){


const next=
  findNextAvailable(
    doctorId,
    date,
    time
  );

alert(
  `That time overlaps another 45-minute consultation. `+
  (
    next
    ? `The next available start is ${next}.`
    : "There is no later slot available today."
  )
);

return;

}

/* Prevent the same patient from having overlapping consultations */

const patientConflict=
db.appointments.find(a=>{


  if(
    a.patientId!==currentUser.id ||
    a.date!==date ||
    a.status==="Cancelled"
  ){
    return false;
  }

  const aStart=
    timeToMinutes(a.time);

  const aEnd=
    timeToMinutes(
      a.endTime ||
      addMinutesToTime(
        a.time,
        45
      )
    );

  return overlap(
    start,
    end,
    aStart,
    aEnd
  );
});

if(patientConflict){


alert(
  "You already have another consultation during this time."
);

return;

}

const appointment={


id:uid("appointment"),

patientId:currentUser.id,

doctorId,

specialty:
  doctor?.specialty||
  "General Doctor",

date,

time,

endTime:
  addMinutesToTime(time,45),

durationMinutes:45,

type,

status:"Pending Payment",

createdAt:
  new Date().toISOString()

};

db.appointments.push(
appointment
);

const invoice={


id:uid("invoice"),

invoiceNumber:
  invoiceNumber("CONS"),

type:"Consultation",

appointmentId:
  appointment.id,

patientId:
  currentUser.id,

items:[

  {
    description:
      `Telemedicine Consultation — ${
        doctor?.specialty||
        "General Doctor"
      }`,

    quantity:1,

    unitPrice:
      Number(
        db.settings.consultationFee
      )
  }

],

total:
  Number(
    db.settings.consultationFee
  ),

status:"Pending",

paymentMethod:null,

transactionReference:null,

createdAt:
  new Date().toISOString()

};

db.invoices.push(invoice);

saveDB();

notify(
currentUser.id,
`Consultation booked for ${date} at ${time}. Please pay invoice ${invoice.invoiceNumber}.`
);

notify(
doctorId,
`A new appointment has been requested for ${date} at ${time}.`
);

closeModal();

alert(
`Appointment booked for ${date} at ${time}. `+
`The 45-minute consultation ends at ${appointment.endTime}. `+
`Please pay the consultation invoice.`
);

navigate("invoices");
}

/* =========================================================
CONSULTATION
========================================================= */

function renderConsultation(){

const appointments=
db.appointments.filter(
a=>
(
a.patientId===currentUser.id ||
a.doctorId===currentUser.id
) &&
a.status==="Confirmed"
);

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">
  Telemedicine Consultation
</h1>

<div class="alert alert-info">

  Maximum consultation duration:
  <strong>45 minutes</strong>.

  Patients cannot join unpaid consultations.

</div>

${
  appointments.length
  ?
  appointments.map(a=>{

    const patient=
      getUser(a.patientId);

    const doctor=
      getUser(a.doctorId);

    return`

      <div class="card">

        <div class="flex space-between">

          <div>

            <h3>

              ${
                currentUser.role==="doctor"
                ? escapeHTML(
                    patient?.name||""
                  )
                : escapeHTML(
                    doctor?.name||""
                  )
              }

            </h3>

            <p class="text-muted">

              ${a.date}
              ${a.time} –
              ${a.endTime}

              <br>

              ${escapeHTML(
                a.specialty||
                doctor?.specialty||
                "General Doctor"
              )}

              <br>

              ${a.type}

            </p>

          </div>

          <button
            class="btn btn-primary"
            onclick="joinConsultation('${a.id}')"
          >
            🎥 Join
          </button>

        </div>

      </div>
    `;

  }).join("")
  :
  `<div class="card">
    <div class="empty">
      No confirmed consultations.
    </div>
  </div>`
}

`;
}

function joinConsultation(
appointmentId
){

const appointment=
db.appointments.find(
a=>a.id===appointmentId
);

if(!appointment)return;

if(
appointment.status!=="Confirmed"
){


alert(
  "This consultation has not been confirmed."
);

return;

}

document.getElementById(
"modalContent"
).innerHTML=`


<h2>
  Telemedicine Consultation
</h2>

<div class="alert alert-success">

  ${appointment.date}
  ${appointment.time}
  –
  ${appointment.endTime}

  <br>

  Maximum duration:
  <strong>45 minutes</strong>.

</div>

<div class="grid grid-2">

  <div class="card">

    <h3>Video / Audio</h3>

    <div style="
      height:250px;
      background:#0F172A;
      border-radius:12px;
      display:flex;
      align-items:center;
      justify-content:center;
      color:white;
      font-size:50px;
    ">
      🎥
    </div>

    <br>

    <button
      class="btn btn-primary"
      onclick="startCamera()"
    >
      📹 Camera
    </button>

    <button
      class="btn btn-secondary"
      onclick="startMicrophone()"
    >
      🎤 Microphone
    </button>

  </div>

  <div class="card">

    <h3>Consultation Timer</h3>

    <div
      id="consultTimer"
      style="
        font-size:38px;
        font-weight:bold;
        color:#0A5DB0;
      "
    >
      45:00
    </div>

    <p class="text-muted">
      The timer cannot exceed 45 minutes.
    </p>

    <textarea
      id="consultChat"
      class="form-control"
      rows="6"
      placeholder="Consultation chat..."
    ></textarea>

    <br>

    ${
      currentUser.role==="doctor"
      ?
      `<button
         class="btn btn-success"
         onclick="endConsultation('${appointmentId}')"
       >
         End Consultation & Prescribe
       </button>`
      :
      ""
    }

  </div>

</div>

`;

openModal();

const key=
appointmentId;

if(consultIntervals[key]){
clearInterval(
consultIntervals[key]
);
}

let remaining=45*60;

consultIntervals[key]=
setInterval(()=>{


  remaining--;

  const element=
    document.getElementById(
      "consultTimer"
    );

  if(!element){

    clearInterval(
      consultIntervals[key]
    );

    return;
  }

  const minutes=
    Math.floor(
      remaining/60
    )
    .toString()
    .padStart(2,"0");

  const seconds=
    (remaining%60)
    .toString()
    .padStart(2,"0");

  element.textContent=
    `${minutes}:${seconds}`;

  if(remaining<=0){

    clearInterval(
      consultIntervals[key]
    );

    alert(
      "The maximum 45-minute consultation period has ended."
    );

    if(currentUser.role==="doctor"){
      endConsultation(
        appointmentId,
        true
      );
    }

  }

},1000);

}

function startCamera(){

if(
navigator.mediaDevices &&
navigator.mediaDevices.getUserMedia
){


navigator.mediaDevices
  .getUserMedia({
    video:true,
    audio:false
  })
  .then(stream=>{

    alert(
      "Camera permission granted. Production WebRTC video should be connected through a backend signalling service."
    );

    stream
      .getTracks()
      .forEach(
        track=>track.stop()
      );

  })
  .catch(()=>{
    alert(
      "Camera permission was not granted."
    );
  });

}else{
alert(
"Camera is not available in this browser."
);
}
}

function startMicrophone(){

if(
navigator.mediaDevices &&
navigator.mediaDevices.getUserMedia
){


navigator.mediaDevices
  .getUserMedia({
    audio:true
  })
  .then(stream=>{

    alert(
      "Microphone permission granted."
    );

    stream
      .getTracks()
      .forEach(
        track=>track.stop()
      );

  })
  .catch(()=>{
    alert(
      "Microphone permission was not granted."
    );
  });

}
}

function endConsultation(
appointmentId,
autoEnd=false
){

if(
consultIntervals[appointmentId]
){


clearInterval(
  consultIntervals[appointmentId]
);

delete consultIntervals[
  appointmentId
];

}

const appointment=
db.appointments.find(
a=>a.id===appointmentId
);

if(!appointment)return;

appointment.status="Completed";

db.consultations.push({


id:uid("consultation"),

appointmentId,

patientId:
  appointment.patientId,

doctorId:
  appointment.doctorId,

endedAt:
  new Date().toISOString(),

durationMinutes:45

});

saveDB();

closeModal();

notify(
appointment.patientId,
"Your consultation has ended."
);

if(!autoEnd){


alert(
  "Consultation completed."
);

}

if(currentUser.role==="doctor"){


showPrescriptionForm(
  appointment.patientId,
  appointment.id
);

}
}

/* =========================================================
PRESCRIPTIONS
========================================================= */

function renderPrescriptions(){

const list=
currentUser.role==="doctor"
?
db.prescriptions.filter(
p=>p.doctorId===currentUser.id
)
:
db.prescriptions.filter(
p=>p.patientId===currentUser.id
);

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">

  Prescriptions

  ${
    currentUser.role==="doctor"
    ?
    `<button
       class="btn btn-primary"
       onclick="showPrescriptionForm()"
     >
       + New Prescription
     </button>`
    :
    ""
  }

</h1>

<div class="card">

  ${
    list.length
    ?
    `
    <div class="table-wrap">

      <table>

        <tr>
          <th>Patient</th>
          <th>Doctor</th>
          <th>Date</th>
          <th>Medicine</th>
          <th>Pharmacy Status</th>
        </tr>

        ${list.map(p=>{

          const patient=
            getUser(p.patientId);

          const doctor=
            getUser(p.doctorId);

          const order=
            db.pharmacyOrders.find(
              o=>o.prescriptionId===p.id
            );

          return`

            <tr>

              <td>
                ${escapeHTML(
                  patient?.name||"-"
                )}
              </td>

              <td>
                ${escapeHTML(
                  doctor?.name||"-"
                )}
              </td>

              <td>
                ${new Date(
                  p.createdAt
                ).toLocaleString()}
              </td>

              <td>
                ${p.items.map(
                  i=>
                    `${escapeHTML(
                      i.medicineName
                    )}
                    × ${i.quantity}
                    <br>
                    <span class="small">
                      ${escapeHTML(i.dosage)}
                      —
                      ${escapeHTML(i.frequency)}
                      —
                      ${escapeHTML(i.duration)}
                    </span>`
                ).join("<hr>")}
              </td>

              <td>
                ${
                  order
                  ?
                  `<span class="badge badge-info">
                     ${order.status}
                   </span>`
                  :
                  "-"
                }
              </td>

            </tr>
          `;

        }).join("")}

      </table>

    </div>
    `
    :
    `<div class="empty">
      No prescriptions found.
    </div>`
  }

</div>

`;
}

function showPrescriptionForm(
patientId=null,
appointmentId=null
){

if(currentUser.role!=="doctor"){
return;
}

const patients=
db.users.filter(
u=>u.role==="patient"
);

document.getElementById(
"modalContent"
).innerHTML=`


<h2>Create E-Prescription</h2>

<form
  onsubmit="createPrescription(event)"
>

  <input
    type="hidden"
    id="prescriptionAppointment"
    value="${appointmentId||""}"
  >

  <div class="form-group">

    <label>Patient</label>

    <select
      id="prescriptionPatient"
      class="form-control"
      required
    >

      <option value="">
        Select patient
      </option>

      ${patients.map(p=>`

        <option
          value="${p.id}"
          ${
            p.id===patientId
            ? "selected"
            : ""
          }
        >
          ${escapeHTML(p.name)}
        </option>

      `).join("")}

    </select>

  </div>

  <div id="prescriptionItems">

    ${prescriptionItemHTML()}

  </div>

  <button
    type="button"
    class="btn btn-secondary"
    onclick="addPrescriptionItem()"
  >
    + Add Medicine
  </button>

  <br><br>

  <button class="btn btn-primary">
    Submit Prescription
  </button>

</form>

`;

openModal();
}

function prescriptionItemHTML(){

return`


<div class="card prescription-item">

  <div class="grid grid-2">

    <div class="form-group">

      <label>Medicine</label>

      <select
        class="form-control med-name"
        required
      >

        <option value="">
          Select medicine
        </option>

        ${db.inventory.map(m=>`

          <option value="${escapeHTML(m.name)}">
            ${escapeHTML(m.name)}
          </option>

        `).join("")}

      </select>

    </div>

    <div class="form-group">

      <label>Quantity</label>

      <input
        class="form-control med-quantity"
        type="number"
        min="1"
        required
      >

    </div>

  </div>

  <div class="grid grid-3">

    <div class="form-group">

      <label>Dosage</label>

      <input
        class="form-control med-dosage"
        placeholder="1 tablet"
        required
      >

    </div>

    <div class="form-group">

      <label>Frequency</label>

      <input
        class="form-control med-frequency"
        placeholder="3 times daily"
        required
      >

    </div>

    <div class="form-group">

      <label>Duration</label>

      <input
        class="form-control med-duration"
        placeholder="5 days"
        required
      >

    </div>

  </div>

</div>

`;
}

function addPrescriptionItem(){

document
.getElementById(
"prescriptionItems"
)
.insertAdjacentHTML(
"beforeend",
prescriptionItemHTML()
);
}

function createPrescription(e){

e.preventDefault();

const patientId=
document.getElementById(
"prescriptionPatient"
).value;

const appointmentId=
document.getElementById(
"prescriptionAppointment"
).value||null;

const items=
[...document.querySelectorAll(
".prescription-item"
)].map(item=>({


  medicineName:
    item.querySelector(
      ".med-name"
    ).value,

  quantity:
    Number(
      item.querySelector(
        ".med-quantity"
      ).value
    ),

  dosage:
    item.querySelector(
      ".med-dosage"
    ).value,

  frequency:
    item.querySelector(
      ".med-frequency"
    ).value,

  duration:
    item.querySelector(
      ".med-duration"
    ).value

}));

if(!items.length){


alert(
  "Add at least one medicine."
);

return;

}

const prescription={


id:uid("prescription"),

patientId,

doctorId:
  currentUser.id,

appointmentId,

items,

createdAt:
  new Date().toISOString()

};

db.prescriptions.push(
prescription
);

const order={


id:uid("pharmacy"),

prescriptionId:
  prescription.id,

patientId,

items,

status:"Pending",


createdAt:
  new Date().toISOString()

};

db.pharmacyOrders.push(order);

saveDB();

notify(
patientId,
"Your prescription has been sent to the pharmacy."
);

const pharmacists=
db.users.filter(
u=>
u.role==="pharmacist" &&
u.enabled
);

pharmacists.forEach(
pharmacist=>
notify(
pharmacist.id,
`New pharmacy order ${order.id} is waiting for stock processing.`
)
);

closeModal();

alert(
"Prescription submitted. Pharmacy order created automatically."
);

navigate("prescriptions");
}

/* =========================================================
PHARMACY
========================================================= */

function renderPharmacy(){

let orders;

if(currentUser.role==="patient"){


orders=
  db.pharmacyOrders.filter(
    o=>o.patientId===currentUser.id
  );

}else{


orders=db.pharmacyOrders;

}

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">
  Pharmacy Orders
</h1>

${
  currentUser.role==="pharmacist"
  ?
  `<div class="alert alert-info">

    <strong>Pharmacy workflow:</strong>

    New prescription →
    check stock →
    patient pays medicine →
    patient pays delivery →
    pharmacist marks order Ready/Dispatched →
    pharmacy assigns rider.

  </div>`
  :
  ""
}

<div class="card">

  <div class="table-wrap">

    <table>

      <tr>
        <th>Order</th>
        <th>Patient</th>
        <th>Medicines</th>
        <th>Status</th>
        <th>Action</th>
      </tr>

      ${
        orders.length
        ?
        orders.map(order=>{

          const patient=
            getUser(order.patientId);

          return`

            <tr>

              <td>
                ${order.id}
              </td>

              <td>
                ${escapeHTML(
                  patient?.name||"-"
                )}
              </td>

              <td>
                ${order.items.map(
                  i=>
                    `${escapeHTML(
                      i.medicineName
                    )}
                    × ${i.quantity}`
                ).join("<br>")}
              </td>

              <td>

                <span class="badge ${
                  order.status.includes("Paid")
                  ||
                  order.status==="Ready for Delivery"
                  ||
                  order.status==="Dispatched"
                  ?
                  "badge-success"
                  :
                  order.status==="Unavailable"
                  ?
                  "badge-danger"
                  :
                  "badge-info"
                }">

                  ${order.status}

                </span>

              </td>

              <td>

                ${
                  currentUser.role==="pharmacist" &&
                  order.status==="Pending"
                  ?
                  `<button
                     class="btn btn-primary"
                     onclick="processPharmacyOrder('${order.id}')"
                   >
                     Check Stock
                   </button>`
                  :
                  ""
                }

                ${
                  currentUser.role==="pharmacist" &&
                  order.status==="Paid - Awaiting Pharmacist Dispatch"
                  ?
                  `<button
                     class="btn btn-success"
                     onclick="pharmacistDispatch('${order.id}')"
                   >
                     Dispatch / Ready
                   </button>`
                  :
                  ""
                }

                ${
                  currentUser.role==="patient" &&
                  order.status==="Awaiting Pharmacy Payment"
                  ?
                  `<button
                     class="btn btn-success"
                     onclick="payRelatedInvoice('${getPharmacyInvoiceId(order.id)}')"
                   >
                     Pay Medicine
                   </button>`
                  :
                  ""
                }

              </td>

            </tr>
          `;

        }).join("")
        :
        `<tr>
          <td colspan="5">
            <div class="empty">
              No pharmacy orders.
            </div>
          </td>
        </tr>`
      }

    </table>

  </div>

</div>

`;
}

function getPharmacyInvoiceId(
orderId
){

return db.invoices.find(
i=>
i.type==="Pharmacy" &&
i.pharmacyOrderId===orderId &&
i.status==="Pending"
)?.id||"";
}

function processPharmacyOrder(
orderId
){

const order=
db.pharmacyOrders.find(
o=>o.id===orderId
);

if(!order)return;

let available=true;

for(const item of order.items){


const medicine=
  db.inventory.find(
    m=>m.name===item.medicineName
  );

if(
  !medicine ||
  medicine.quantity<item.quantity ||
  new Date(medicine.expiry)<new Date()
){

  available=false;
}

}

if(!available){


order.status="Unavailable";

saveDB();

notify(
  order.patientId,
  "One or more medicines in your prescription are currently unavailable."
);

alert(
  "One or more medicines are unavailable."
);

renderPharmacy();

return;

}

/* Reserve stock */

order.items.forEach(item=>{


const medicine=
  db.inventory.find(
    m=>m.name===item.medicineName
  );

medicine.quantity -=
  Number(item.quantity);

});

let total=0;

const invoiceItems=
order.items.map(item=>{


  const medicine=
    db.inventory.find(
      m=>m.name===item.medicineName
    );

  const price=
    Number(
      medicine?.price||0
    );

  total+=
    price*
    Number(item.quantity);

  return{

    description:
      item.medicineName,

    quantity:
      Number(item.quantity),

    unitPrice:
      price
  };

});

order.status=
"Awaiting Pharmacy Payment";

const invoice={


id:uid("invoice"),

invoiceNumber:
  invoiceNumber("PHARM"),

type:"Pharmacy",

pharmacyOrderId:
  order.id,

patientId:
  order.patientId,

items:invoiceItems,

total,

status:"Pending",

paymentMethod:null,

transactionReference:null,

createdAt:
  new Date().toISOString()

};

db.invoices.push(invoice);

saveDB();

notify(
order.patientId,
`Pharmacy invoice ${invoice.invoiceNumber} is ready for payment.`
);

alert(
"Stock confirmed. The patient can now pay the medicine invoice."
);

renderPharmacy();
}

/* =========================================================
PAYMENT
========================================================= */

function payRelatedInvoice(
invoiceId
){

if(!invoiceId){


alert(
  "Invoice not found."
);

return;

}

processDemoPayment(
invoiceId
);
}

function processDemoPayment(
invoiceId
){

const invoice=
db.invoices.find(
i=>i.id===invoiceId
);

if(!invoice){

alert("Invoice not found.");
return;

}

if(invoice.status==="Paid"){

alert("This invoice is already paid.");
return;

}

if(!currentUser){

alert("Please log in before making a payment.");
return;

}

if(
currentUser.role!=="patient" &&
currentUser.role!=="admin"
){

alert("You are not authorised to pay this invoice.");
return;

}

/*
  Use the application's modal instead of browser prompt().
  This is more reliable in Chrome/Edge and clearly shows
  the M-Pesa phone-number field.
*/

const title =
invoice.type==="Delivery"
? "Pay Delivery Fee"
: invoice.type==="Pharmacy"
? "Pay Medicine"
: invoice.type==="Consultation"
? "Pay Consultation"
: "Make Payment";

document.getElementById("modalContent").innerHTML=`

  <h2>${title}</h2>

  <div class="alert alert-info">

    <strong>Amount to pay:</strong>
    ${money(invoice.total)}

    <br><br>

    <strong>Payment Method:</strong>
    M-Pesa Paybill

    <br>

    <strong>Business Number:</strong>
    979250

    <br>

    <strong>Account Name of the Client:</strong>
    ${escapeHTML(getUser(invoice.patientId)?.name || currentUser?.name || "Client")}

  </div>

  <div class="card" style="margin-bottom:16px;">
    <strong>How to pay:</strong>
    <ol style="margin:10px 0 0 20px;">
      <li>Open M-Pesa on your phone.</li>
      <li>Select <strong>Lipa na M-Pesa</strong>.</li>
      <li>Select <strong>Pay Bill</strong>.</li>
      <li>Enter Business Number <strong>979250</strong>.</li>
      <li>Enter your name as the <strong>Account Name of the Client</strong>.</li>
      <li>Enter the amount shown above and complete the payment.</li>
    </ol>
  </div>

  <form onsubmit="submitDemoPayment(event,'${invoice.id}')">

    <div class="form-group">

      <label for="mpesaPhone">
        Payer M-Pesa Phone Number
      </label>

      <input
        id="mpesaPhone"
        class="form-control"
        type="tel"
        inputmode="numeric"
        autocomplete="tel"
        placeholder="e.g. 0712345678"
        maxlength="13"
        required
      >

      <div class="small text-muted mt">
        Enter the phone number used to make the Paybill payment.
        This is recorded for the current demo payment confirmation.
      </div>

    </div>

    <div class="flex">

      <button
        type="submit"
        class="btn btn-success"
      >
        📱 Confirm Paybill Payment
      </button>

      <button
        type="button"
        class="btn btn-secondary"
        onclick="closeModal()"
      >
        Cancel
      </button>

    </div>

  </form>
`;

openModal();

setTimeout(()=>{
  const input=document.getElementById("mpesaPhone");
  if(input) input.focus();
},100);

}

function submitDemoPayment(
event,
invoiceId
){

event.preventDefault();

const invoice=
db.invoices.find(
i=>i.id===invoiceId
);

if(!invoice){

alert("Invoice not found.");
return;

}

if(invoice.status==="Paid"){

alert("This invoice is already paid.");
closeModal();
return;

}

const phone=
(document.getElementById("mpesaPhone")?.value||"").trim();

const cleanPhone=
phone.replace(/[\s-]/g,"");

if(!/^(?:\+254|254|0)7\d{8}$/.test(cleanPhone)){

alert(
"Please enter a valid Kenyan M-Pesa number, for example 0712345678."
);

return;

}

invoice.status="Paid";

invoice.paymentMethod="M-Pesa Paybill";

invoice.transactionReference=
"MPESA-"+Date.now();

invoice.paidAt=
new Date().toISOString();

/* Immediately mark the linked consultation appointment as paid/confirmed. */
if(invoice.type==="Consultation" && invoice.appointmentId){
  const paidAppointment=db.appointments.find(a=>a.id===invoice.appointmentId);
  if(paidAppointment){
    paidAppointment.status="Confirmed";
    paidAppointment.paymentStatus="Paid";
    paidAppointment.paidAt=invoice.paidAt;
    paidAppointment.paymentReference=invoice.transactionReference;
  }
}

db.payments.push({

id:uid("payment"),

invoiceId,

patientId:
invoice.patientId,

method:"M-Pesa Paybill",

phone:cleanPhone,

transactionReference:
invoice.transactionReference,

amount:
invoice.total,

status:"Completed",

createdAt:
new Date().toISOString()

});

handlePaidInvoice(invoice);

saveDB();

closeModal();

alert(
`Payment successful.\nReference: ${invoice.transactionReference}`
);

navigate(
currentUser.role==="patient"
? "invoices"
: currentPage
);

}

function __baseHandlePaidInvoice(
invoice
){

if(invoice.type==="Consultation"){


const appointment=
  db.appointments.find(
    a=>a.id===invoice.appointmentId
  );

if(appointment){

  appointment.status=
    "Confirmed";
  appointment.paymentStatus="Paid";
  appointment.paidAt=invoice.paidAt || new Date().toISOString();
  appointment.paymentReference=invoice.transactionReference || null;

  notify(
    appointment.patientId,
    "Consultation payment received. Your appointment is confirmed."
  );

  notify(
    appointment.doctorId,
    `Consultation confirmed for ${appointment.date} at ${appointment.time}.`
  );
}

return;

}

if(invoice.type==="Pharmacy"){


const order=
  db.pharmacyOrders.find(
    o=>
      o.id===invoice.pharmacyOrderId
  );

if(order){

  order.status=
    "Paid - Awaiting Delivery Payment";

  // Persist the paid medicine order before creating the delivery record.
  saveDB();

  /*
    The medicine is paid.
    Create delivery invoice immediately.
    The delivery itself is NOT dispatched until
    delivery fee is also paid.
  */

  createDeliveryForOrder(
    order
  );

  notify(
    order.patientId,
    "Medicine payment received. The pharmacist will call you to confirm your delivery location, directions and delivery fee."
  );

  db.users
    .filter(
      u=>
        u.role==="pharmacist" &&
        u.enabled
    )
    .forEach(
      pharmacist=>
        notify(
          pharmacist.id,
          `Pharmacy order ${order.id} has been paid. Delivery fee is now awaiting patient payment.`
        )
    );

}

return;

}

if(invoice.type==="Delivery"){
  let delivery=db.deliveries.find(d=>d.id===invoice.deliveryId);
  if(!delivery && invoice.pharmacyOrderId) delivery=db.deliveries.find(d=>d.pharmacyOrderId===invoice.pharmacyOrderId);
  if(!delivery && invoice.id) delivery=db.deliveries.find(d=>d.deliveryInvoiceId===invoice.id);

  if(delivery){
    delivery.deliveryInvoiceId=delivery.deliveryInvoiceId||invoice.id;
    delivery.status="Paid - Awaiting Dispatch";
    delivery.deliveryPaidAt=new Date().toISOString();
    delivery.deliveryPaymentStatus="Paid";

    const order=db.pharmacyOrders.find(o=>o.id===delivery.pharmacyOrderId);
    if(order){
      order.deliveryId=delivery.id;
      order.deliveryPaymentStatus="Paid";
      order.status="Paid - Awaiting Pharmacist Dispatch";
      order.deliveryPaidAt=delivery.deliveryPaidAt;
    }

    db.invoices.filter(i=>i.type==="Delivery" && i.deliveryId===delivery.id && i.id!==invoice.id && i.status==="Pending")
      .forEach(i=>{i.status="Cancelled";i.cancelledAt=new Date().toISOString();});

    db.users.filter(u=>u.role==="admin"&&u.enabled).forEach(admin=>notify(admin.id,`DELIVERY PAID: ${invoice.invoiceNumber||invoice.id}. Pharmacy order ${delivery.pharmacyOrderId} is ready for dispatch/rider assignment.`));
    db.users.filter(u=>u.role==="pharmacist"&&u.enabled).forEach(pharmacist=>notify(pharmacist.id,`Delivery payment received for order ${delivery.pharmacyOrderId}. The delivery is PAID and ready for dispatch.`));
    saveDB();
  }
  return;
}

if(invoice.type==="Home Service"){


const service=
  db.homeServices.find(
    s=>s.invoiceId===invoice.id
  );

if(service){

  service.status=
    "Paid - Awaiting Assignment";

  service.paidAt=
    new Date().toISOString();

  db.users
    .filter(
      u=>
        u.role==="admin" &&
        u.enabled
    )
    .forEach(
      admin=>
        notify(
          admin.id,
          `Home service ${service.id} has been paid and is ready for assignment.`
        )
    );
}

return;

}

if(invoice.type==="Laboratory"){


const request=
  db.labRequests.find(
    l=>l.invoiceId===invoice.id
  );

if(request){

  request.status=
    "Paid - Processing";

  db.users
    .filter(
      u=>
        u.role==="admin" &&
        u.enabled
    )
    .forEach(
      admin=>
        notify(
          admin.id,
          `Laboratory request ${request.id} has been paid.`
        )
    );
}

}
}

/* =========================================================
CREATE DELIVERY AFTER MEDICINE PAYMENT
========================================================= */

function createDeliveryForOrder(order){
  if(db.deliveries.some(d=>d.pharmacyOrderId===order.id)) return;

  const defaultBand=getDeliveryChargeBands()[0] || DEFAULT_DELIVERY_CHARGE_BANDS[0];
  const delivery={
    id:uid("delivery"),
    pharmacyOrderId:order.id,
    patientId:order.patientId,
    riderId:null,
    status:"Awaiting Delivery Details",
    deliveryLocation:"",
    directions:"",
    receiverPhone:getUser(order.patientId)?.phone||"",
    deliveryFee:Number(defaultBand.fee||0),
    deliveryChargeBand:defaultBand.id,
    deliveryChargeQuotation:false,
    otp:null,
    createdAt:new Date().toISOString()
  };

  db.deliveries.push(delivery);
  order.deliveryId=delivery.id;
  order.status="Awaiting Delivery Details";

  saveDB();

  notify(
    order.patientId,
    "Your medicine payment has been received. The pharmacist will call you to confirm your delivery location and delivery charge."
  );

  db.users.filter(u=>u.role==="pharmacist"&&u.enabled).forEach(pharmacist=>
    notify(
      pharmacist.id,
      `Medicine order ${order.id} has been paid. Call the patient to confirm delivery location, directions and receiver phone number, then select the applicable delivery tariff and confirm the fee.`
    )
  );
}

function showDeliveryDetailsForm(deliveryId){
  if(currentUser.role!=="pharmacist"){
    alert("Only the pharmacist can enter delivery details.");
    return;
  }

  const delivery=db.deliveries.find(d=>d.id===deliveryId);
  if(!delivery)return;
  const patient=getUser(delivery.patientId);
  const bands=getDeliveryChargeBands();
  const selectedBand=deliveryBandById(delivery.deliveryChargeBand) || bands[0];
  const currentFee=Number(delivery.deliveryFee||selectedBand?.fee||0);

  document.getElementById("modalContent").innerHTML=`
    <h2>Confirm Delivery Details</h2>
    <div class="alert alert-info">
      <strong>Call the patient first.</strong><br>
      Confirm the exact delivery location, directions/landmark and receiver phone number. Then select the applicable Beacon of Hope medicine-delivery tariff.
      <br><br><strong>Patient:</strong> ${escapeHTML(patient?.name||"-")}
      <br><strong>Patient phone:</strong> ${escapeHTML(patient?.phone||"-")}
    </div>
    <div class="card" style="background:#F8FAFC">
      <h3>Proposed Medicine Delivery Tariff</h3>
      <div class="table-wrap"><table><thead><tr><th>Distance</th><th>Patient delivery charge</th></tr></thead><tbody>
        ${bands.map(b=>`<tr><td>${escapeHTML(b.label)}</td><td><strong>${b.quotation ? "KES 20 per km, quoted before dispatch" : money(b.fee)}</strong></td></tr>`).join("")}
      </tbody></table></div>
    </div>
    <form onsubmit="saveDeliveryDetails(event,'${deliveryId}')">
      <div class="form-group">
        <label>Delivery Location / Address</label>
        <textarea id="deliveryLocation" class="form-control" rows="3" required placeholder="Example: Ongata Rongai, Gataka Road, near ...">${escapeHTML(delivery.deliveryLocation||patient?.address||"")}</textarea>
      </div>
      <div class="form-group">
        <label>Directions / Landmark</label>
        <textarea id="deliveryDirections" class="form-control" rows="3" required placeholder="Example: Turn at ..., second gate, house ...">${escapeHTML(delivery.directions||"")}</textarea>
      </div>
      <div class="grid grid-2">
        <div class="form-group">
          <label>Receiver Phone Number</label>
          <input id="receiverPhone" class="form-control" type="tel" inputmode="tel" required value="${escapeHTML(delivery.receiverPhone||patient?.phone||"")}" placeholder="0712345678">
        </div>
        <div class="form-group">
          <label>Delivery Distance / Tariff Band</label>
          <select id="deliveryChargeBand" class="form-control" onchange="document.getElementById('deliveryFee').dataset.manual='false'; updateDeliveryFeeFromBand()" required>
            ${bands.map(b=>`<option value="${b.id}" ${selectedBand?.id===b.id?'selected':''}>${escapeHTML(b.label)} — ${b.quotation?'KES 20/km, quote before dispatch':money(b.fee)}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Patient Delivery Charge (KES)</label>
        <input id="deliveryFee" class="form-control" type="number" min="0" step="1" required value="${currentFee}" oninput="this.dataset.manual='true'">
        <div id="deliveryChargeNote" class="small text-muted mt"></div>
      </div>
      <div class="alert alert-warning small">The tariff is editable by the administrator, and the pharmacist can adjust the individual delivery charge when necessary after confirming the patient's location.</div>
      <div class="flex">
        <button type="submit" class="btn btn-primary">Save & Create Delivery Invoice</button>
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
      </div>
    </form>`;
  openModal();
  setTimeout(()=>{
    const fee=document.getElementById("deliveryFee");
    if(fee) fee.dataset.manual="false";
    updateDeliveryFeeFromBand();
  },50);
}

function saveDeliveryDetails(event,deliveryId){
  event.preventDefault();
  const delivery=db.deliveries.find(d=>d.id===deliveryId);
  if(!delivery||currentUser.role!=="pharmacist")return;

  const location=(document.getElementById("deliveryLocation")?.value||"").trim();
  const directions=(document.getElementById("deliveryDirections")?.value||"").trim();
  const receiverPhone=(document.getElementById("receiverPhone")?.value||"").trim();
  const fee=Number(document.getElementById("deliveryFee")?.value);

  if(!location||!directions||!receiverPhone||!Number.isFinite(fee)||fee<0){
    alert("Please enter the delivery location, directions, receiver phone number and a valid delivery fee.");
    return;
  }

  const chargeBandId=document.getElementById("deliveryChargeBand")?.value || getDeliveryChargeBands()[0]?.id;
  const chargeBand=deliveryBandById(chargeBandId);

  delivery.deliveryLocation=location;
  delivery.directions=directions;
  delivery.receiverPhone=receiverPhone;
  delivery.deliveryFee=fee;
  delivery.deliveryChargeBand=chargeBandId;
  delivery.deliveryChargeQuotation=Boolean(chargeBand?.quotation);
  delivery.status="Awaiting Delivery Payment";
  delivery.detailsConfirmedAt=new Date().toISOString();
  delivery.detailsConfirmedBy=currentUser.id;

  const order=db.pharmacyOrders.find(o=>o.id===delivery.pharmacyOrderId);
  if(order)order.status="Awaiting Delivery Payment";

  // Prevent duplicate delivery invoices when details are edited.
  let invoice=db.invoices.find(i=>i.type==="Delivery"&&i.deliveryId===delivery.id);
  if(!invoice){
    invoice={
      id:uid("invoice"),
      invoiceNumber:invoiceNumber("DEL"),
      type:"Delivery",
      deliveryId:delivery.id,
      pharmacyOrderId:delivery.pharmacyOrderId,
      patientId:delivery.patientId,
      items:[{description:"Medicine delivery",quantity:1,unitPrice:fee}],
      total:fee,
      status:"Pending",
      paymentMethod:null,
      transactionReference:null,
      createdAt:new Date().toISOString()
    };
    db.invoices.push(invoice);
  }else{
    invoice.items=[{description:"Medicine delivery",quantity:1,unitPrice:fee}];
    invoice.total=fee;
    invoice.status="Pending";
    invoice.paymentMethod=null;
    invoice.transactionReference=null;
  }

  delivery.deliveryInvoiceId=invoice.id;
  saveDB();

  notify(delivery.patientId,`Delivery details have been confirmed. Your delivery fee is ${money(fee)} and is now on your invoice.`);
  closeModal();
  alert("Delivery details saved. The delivery fee is now on the patient's invoice.");
  renderPharmacy();
}

/* =========================================================
ADMIN / PHARMACIST DISPATCH
========================================================= */

function pharmacistDispatch(
orderId
){

if(
currentUser.role!=="pharmacist"
){


alert(
  "Only the pharmacist can dispatch this order."
);

return;

}

const order=
db.pharmacyOrders.find(
o=>o.id===orderId
);

if(!order)return;

const delivery=
db.deliveries.find(
d=>d.pharmacyOrderId===orderId
);

if(!delivery){


alert(
  "Delivery record has not been created."
);

return;

}

if(
delivery.status!=="Paid - Awaiting Dispatch"
){


alert(
  "The delivery fee must be paid before dispatch."
);

return;

}

order.status=
"Ready for Admin Dispatch";

delivery.status=
"Ready for Admin Dispatch";

notify(providerId,`You have been assigned a home service: ${serviceName} on ${date} at ${time}.`);

db.users
.filter(
u=>
u.role==="admin" &&
u.enabled
)
.forEach(
admin=>
notify(
admin.id,
`Pharmacist has dispatched paid order ${order.id}. It is ready for rider assignment.`
)
);

saveDB();

alert(
"Order is ready for pharmacy rider assignment."
);

navigate("pharmacy");
}

function renderAdminOrders(){

if(currentUser.role!=="admin"){
return;
}

const deliveries=
db.deliveries.filter(
d=>
d.status==="Paid - Awaiting Dispatch" ||
d.status==="Ready for Admin Dispatch"
);

const riders=
db.users.filter(
u=>
u.role==="rider" &&
u.enabled
);

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">
  Dispatch & Rider Assignment
</h1>

<div class="alert alert-success">

  <strong>Paid delivery queue</strong>

  <br>

  Once a patient pays the delivery fee,
  it appears here automatically.

  <br>

  The pharmacist can dispatch the paid medicine,
  then the pharmacy assigns the rider.

  <br>

  Delivery fees are entered manually by the pharmacist after confirming the delivery location with the patient.

</div>

<div class="card">

  <div class="table-wrap">

    <table>

      <tr>
        <th>Order</th>
        <th>Patient</th>
        <th>Address</th>
        <th>Distance</th>
        <th>Fee Paid</th>
        <th>Status</th>
        <th>Rider</th>
        <th>Action</th>
      </tr>

      ${
        deliveries.length
        ?
        deliveries.map(d=>{

          const patient=
            getUser(d.patientId);

          return`

            <tr>

              <td>
                ${d.pharmacyOrderId}
              </td>

              <td>
                ${escapeHTML(
                  patient?.name||"-"
                )}
              </td>

              <td>
                ${escapeHTML(
                  patient?.address||"-"
                )}
              </td>

              <td>
                ${Number(
                  d.distanceKm
                ).toFixed(2)} km
              </td>

              <td>
                <span class="badge badge-success">
                  PAID
                </span>
                <br>
                ${money(d.deliveryFee)}
              </td>

              <td>
                <span class="badge badge-info">
                  ${d.status}
                </span>
              </td>

              <td>

                <select
                  class="form-control"
                  id="rider_${d.id}"
                >

                  <option value="">
                    Select rider
                  </option>

                  ${riders.map(r=>`

                    <option value="${r.id}">
                      ${escapeHTML(r.name)}
                    </option>

                  `).join("")}

                </select>

              </td>

              <td>

                <button
                  class="btn btn-primary"
                  onclick="assignRider('${d.id}')"
                >
                  Assign Rider
                </button>

              </td>

            </tr>
          `;

        }).join("")
        :
        `<tr>

          <td colspan="8">

            <div class="empty">

              No paid deliveries are waiting
              for rider assignment.

            </div>

          </td>

        </tr>`
      }

    </table>

  </div>

</div>

`;
}

function assignRider(
deliveryId
){

const delivery=
db.deliveries.find(
d=>d.id===deliveryId
);

if(!delivery)return;

const riderId=
document.getElementById(
"rider_"+deliveryId
).value;

if(!riderId){


alert(
  "Select a rider."
);

return;

}

if(
delivery.status!=="Paid - Awaiting Dispatch" &&
delivery.status!=="Ready for Admin Dispatch"
){


alert(
  "This delivery is not ready for rider assignment."
);

return;

}

delivery.riderId=
riderId;

delivery.status=
"Assigned";

delivery.assignedAt=
new Date().toISOString();

delivery.otp=
Math.floor(
100000+
Math.random()*900000
).toString();

const order=
db.pharmacyOrders.find(
o=>o.id===delivery.pharmacyOrderId
);

if(order){


order.status=
  "Assigned to Rider";

}

notify(
riderId,
`You have been assigned delivery ${delivery.id}.`
);

notify(
delivery.patientId,
"Your paid medicine delivery has been assigned to a rider."
);

saveDB();

alert(
"Rider assigned successfully."
);

renderAdminOrders();
}

/* =========================================================
DELIVERIES
========================================================= */

function renderDeliveries(){
  let deliveries;
  if(currentUser.role==="patient") deliveries=db.deliveries.filter(d=>d.patientId===currentUser.id);
  else if(currentUser.role==="rider") deliveries=db.deliveries.filter(d=>d.riderId===currentUser.id);
  else deliveries=db.deliveries;

  document.getElementById("content").innerHTML=`
    <h1 class="page-title">Medicine Deliveries</h1>
    ${currentUser.role==="patient"?`<div class="alert alert-info">There is no live GPS tracking. The pharmacist confirms your delivery location and fee by phone, and the rider calls the receiver to confirm directions before delivery.</div>`:''}
    <div class="card"><div class="table-wrap"><table><thead><tr><th>Patient / Receiver</th><th>Phone</th><th>Location & Directions</th><th>Delivery Fee</th><th>Status</th><th>Action</th></tr></thead><tbody>
      ${deliveries.length?deliveries.map(d=>{
        const patient=getUser(d.patientId);
        const phone=d.receiverPhone||patient?.phone||'';
        return `<tr>
          <td>${escapeHTML(patient?.name||'-')}</td>
          <td>${phone?`<a href="tel:${escapeHTML(phone)}" class="btn btn-secondary">📞 ${escapeHTML(phone)}</a>`:'-'}</td>
          <td><strong>${escapeHTML(d.deliveryLocation||'Not yet confirmed')}</strong><br><span class="small">${escapeHTML(d.directions||'')}</span></td>
          <td>${money(d.deliveryFee||0)}</td>
          <td><span class="badge ${d.status==="Delivered"?'badge-success':d.status.includes('Paid')?'badge-success':'badge-info'}">${escapeHTML(d.status||'-')}</span></td>
          <td>
            ${currentUser.role==="patient"&&d.status==="Awaiting Delivery Payment"?`<button class="btn btn-success" onclick="payDelivery('${d.id}'); return false;">Pay Delivery Fee</button>`:''}
            ${currentUser.role==="rider"&&d.status==="Assigned"?`<button class="btn btn-primary" onclick="updateDeliveryStatus('${d.id}','Picked Up')">Pick Up</button>`:''}
            ${currentUser.role==="rider"&&d.status==="Picked Up"?`<button class="btn btn-primary" onclick="updateDeliveryStatus('${d.id}','In Transit')">Start Delivery</button>`:''}
            ${currentUser.role==="rider"&&d.status==="In Transit"?`<button class="btn btn-success" onclick="verifyDeliveryOTP('${d.id}')">Verify Delivery</button>`:''}
            ${currentUser.role==="pharmacist"&&(!d.detailsConfirmedAt||d.status==="Awaiting Delivery Details"||!d.deliveryLocation||!d.directions||d.deliveryFee===null||d.deliveryFee===undefined)?`<button class="btn btn-primary" onclick="showDeliveryDetailsForm('${d.id}')">📍 Confirm Delivery Details</button>`:''}
            ${currentUser.role==="rider"&&phone?`<a class="btn btn-secondary" href="tel:${escapeHTML(phone)}">📞 Call Receiver</a>`:''}
          </td>
        </tr>`;
      }).join(''):`<tr><td colspan="6"><div class="empty">No deliveries found.</div></td></tr>`}
    </tbody></table></div></div>`;
}

function payDelivery(
deliveryId
){

const delivery=
db.deliveries.find(
d=>d.id===deliveryId
);

if(!delivery)return;

const invoice=
db.invoices.find(
i=>
i.type==="Delivery" &&
i.deliveryId===deliveryId &&
i.status==="Pending"
);

if(!invoice){


alert(
  "Delivery invoice not found."
);

return;

}

processDemoPayment(
invoice.id
);
}

function updateDeliveryStatus(
deliveryId,
status
){

const delivery=
db.deliveries.find(
d=>d.id===deliveryId
);

if(!delivery)return;

if(
currentUser.role!=="rider" ||
delivery.riderId!==currentUser.id
){


alert(
  "You are not authorised to update this delivery."
);

return;

}

delivery.status=status;

saveDB();

notify(
delivery.patientId,
`Your delivery status is now: ${status}.`
);

renderDeliveries();
}

function verifyDeliveryOTP(
deliveryId
){

const delivery=
db.deliveries.find(
d=>d.id===deliveryId
);

if(!delivery)return;

const code=
prompt(
"Enter the patient's delivery OTP:"
);

if(code!==delivery.otp){


alert(
  "Incorrect OTP."
);

return;

}

delivery.status=
"Delivered";

delivery.deliveredAt=
new Date().toISOString();

const order=
db.pharmacyOrders.find(
o=>o.id===delivery.pharmacyOrderId
);

if(order){
order.status=
"Completed";
}

saveDB();

notify(
delivery.patientId,
"Your medicine has been delivered successfully."
);

alert(
"Delivery completed successfully."
);

renderDeliveries();
}

/* =========================================================
TRACKING MAP
========================================================= */

function trackDelivery(
deliveryId
){

const delivery=
db.deliveries.find(
d=>d.id===deliveryId
);

if(!delivery)return;

const patient=
getUser(
delivery.patientId
);

document.getElementById(
"modalContent"
).innerHTML=`


<h2>Delivery Tracking</h2>

<div class="alert alert-info">

  Status:
  <strong>
    ${delivery.status}
  </strong>

  <br>

  Distance:
  ${Number(
    delivery.distanceKm
  ).toFixed(2)}
  km

  <br>

  Delivery fee:
  ${money(
    delivery.deliveryFee
  )}

</div>

<div
  id="trackingMap"
  class="map"
></div>

<br>

<button
  class="btn btn-secondary"
  onclick="closeModal()"
>
  Close
</button>

`;

openModal();

setTimeout(()=>{


if(
  typeof L==="undefined"
){

  document.getElementById(
    "trackingMap"
  ).innerHTML=
    `<div class="empty">
      Map library could not be loaded.
    </div>`;

  return;
}

const patientLat=
  patient?.lat||
  HOSPITAL_LOCATION.lat;

const patientLng=
  patient?.lng||
  HOSPITAL_LOCATION.lng;

const map=
  L.map(
    "trackingMap"
  ).setView(
    [
      patientLat,
      patientLng
    ],
    13
  );

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      "© OpenStreetMap contributors"
  }
).addTo(map);

L.marker([
  patientLat,
  patientLng
])
.addTo(map)
.bindPopup(
  "Patient delivery location"
);

if(
  delivery.riderLat &&
  delivery.riderLng
){

  L.marker([
    delivery.riderLat,
    delivery.riderLng
  ])
  .addTo(map)
  .bindPopup(
    "Rider's latest GPS location"
  );

  map.fitBounds([

    [
      patientLat,
      patientLng
    ],

    [
      delivery.riderLat,
      delivery.riderLng
    ]

  ]);

}

},200);
}

/* =========================================================
RIDER GPS
========================================================= */

function startRiderGPS(){

if(
!navigator.geolocation
){


alert(
  "GPS is not supported."
);

return;

}

riderWatchId=
navigator.geolocation.watchPosition(


  position=>{

    const rider=
      getUser(
        currentUser.id
      );

    if(!rider)return;

    rider.currentLocation={

      lat:
        position.coords.latitude,

      lng:
        position.coords.longitude,

      updatedAt:
        new Date().toISOString()

    };

    db.deliveries
      .filter(
        d=>
          d.riderId===
          currentUser.id
      )
      .forEach(d=>{

        d.riderLat=
          position.coords.latitude;

        d.riderLng=
          position.coords.longitude;

        d.riderLocationUpdatedAt=
          new Date().toISOString();

      });

    saveDB();

  },

  ()=>{
    alert(
      "GPS permission was denied."
    );
  },

  {
    enableHighAccuracy:true,
    maximumAge:5000,
    timeout:10000
  }
);

alert(
"Rider GPS sharing started."
);
}

function stopRiderGPS(){

if(
riderWatchId!==null
){


navigator.geolocation.clearWatch(
  riderWatchId
);

riderWatchId=null;

alert(
  "GPS sharing stopped."
);

}
}

function renderRiderMap(){

const deliveries=
db.deliveries.filter(
d=>
d.riderId===currentUser.id &&
d.status!=="Delivered"
);

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">
  Rider Navigation
</h1>

<div class="card">

  <div
    id="riderMap"
    class="map"
  ></div>

</div>

<div class="card">

  <h3>Delivery Routes</h3>

  ${
    deliveries.length
    ?
    deliveries.map(d=>{

      const patient=
        getUser(d.patientId);

      return`

        <div class="card">

          <strong>
            ${escapeHTML(
              patient?.name||""
            )}
          </strong>

          <p>
            ${escapeHTML(
              patient?.address||""
            )}
          </p>

          ${
            patient?.lat &&
            patient?.lng
            ?
            `<button
               class="btn btn-primary"
               onclick="openDirections(
                 ${patient.lat},
                 ${patient.lng}
               )"
             >
               🗺️ Directions
             </button>`
            :
            ""
          }

        </div>
      `;

    }).join("")
    :
    `<div class="empty">
      No active deliveries.
    </div>`
  }

</div>

`;

setTimeout(()=>{


if(
  typeof L==="undefined"
){
  return;
}

const lat=
  currentUser.currentLocation?.lat||
  HOSPITAL_LOCATION.lat;

const lng=
  currentUser.currentLocation?.lng||
  HOSPITAL_LOCATION.lng;

const map=
  L.map(
    "riderMap"
  ).setView(
    [lat,lng],
    13
  );

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      "© OpenStreetMap contributors"
  }
).addTo(map);

L.marker([
  HOSPITAL_LOCATION.lat,
  HOSPITAL_LOCATION.lng
])
.addTo(map)
.bindPopup(
  HOSPITAL_LOCATION.name
);

deliveries.forEach(d=>{

  const patient=
    getUser(d.patientId);

  if(
    patient?.lat &&
    patient?.lng
  ){

    L.marker([
      patient.lat,
      patient.lng
    ])
    .addTo(map)
    .bindPopup(
      "Delivery: "+
      escapeHTML(
        patient.name
      )
    );

  }

});

},200);
}

function openDirections(
lat,
lng
){

window.open(
"https://www.google.com/maps/dir/?api=1&destination="+
lat+","+lng,
"_blank"
);
}

/* =========================================================
DISTANCE / GPS PATIENT
========================================================= */

function getPatientGPS(){

if(
!navigator.geolocation
){


alert(
  "GPS is not supported."
);

return;

}

navigator.geolocation.getCurrentPosition(


position=>{

  const user=
    getUser(
      currentUser.id
    );

  if(!user)return;

  user.lat=
    position.coords.latitude;

  user.lng=
    position.coords.longitude;

  currentUser=user;

  saveDB();

  alert(
    "Your GPS location has been updated."
  );

  navigate(currentPage);

},

()=>{
  alert(
    "GPS permission was denied."
  );
},

{
  enableHighAccuracy:true,
  timeout:10000
}

);
}

function calculatePatientDistance(
patient
){

if(
patient?.lat &&
patient?.lng
){


return haversine(
  HOSPITAL_LOCATION.lat,
  HOSPITAL_LOCATION.lng,
  patient.lat,
  patient.lng
);

}

/* Demo fallback */

return 5;
}

function haversine(
lat1,
lon1,
lat2,
lon2
){

const R=6371;

const dLat=
(lat2-lat1)*
Math.PI/180;

const dLon=
(lon2-lon1)*
Math.PI/180;

const a=
Math.sin(dLat/2)**2+
Math.cos(
lat1*Math.PI/180
)*
Math.cos(
lat2*Math.PI/180
)*
Math.sin(dLon/2)**2;

const c=
2*
Math.atan2(
Math.sqrt(a),
Math.sqrt(1-a)
);

return R*c;
}

/* =========================================================
INVOICES
========================================================= */

function renderInvoices(){

const invoices=
currentUser.role==="admin"
?
db.invoices
:
db.invoices.filter(
i=>
i.patientId===
currentUser.id
);

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">
  Invoices & Payments
</h1>

<div class="alert alert-info">

  Demo payments use M-Pesa Paybill.
  Business Number: <strong>979250</strong>.
  The client uses their name as the account name.
  Production deployment should connect this to
  M-Pesa Daraja/payment confirmation and webhook verification.

</div>

<div class="card">

  <div class="table-wrap">

    <table>

      <tr>

        <th>Invoice</th>
        <th>Type</th>
        <th>Description</th>
        <th>Total</th>
        <th>Status</th>
        <th>Action</th>

      </tr>

      ${
        invoices.length
        ?
        invoices.map(i=>`

          <tr>

            <td>
              ${i.invoiceNumber}
            </td>

            <td>
              ${i.type}
            </td>

            <td>
              ${
                i.items?.map(
                  x=>
                    `${escapeHTML(
                      x.description
                    )}`
                ).join("<br>")||
                "-"
              }
            </td>

            <td>
              ${money(i.total)}
            </td>

            <td>

              <span class="badge ${
                i.status==="Paid"
                ? "badge-success"
                : "badge-warning"
              }">

                ${i.status}

              </span>

            </td>

            <td>

              ${
                i.status==="Pending" &&
                currentUser.role==="patient"
                ?
                `<button
                   class="btn btn-success"
                   onclick="processDemoPayment('${i.id}'); return false;"
                 >
                   Pay M-Pesa Paybill
                 </button>`
                :
                ""
              }

            </td>

          </tr>

        `).join("")
        :
        `<tr>

          <td colspan="6">

            <div class="empty">
              No invoices.
            </div>

          </td>

        </tr>`
      }

    </table>

  </div>

</div>

`;
}

/* =========================================================
LABORATORY
========================================================= */

function renderLaboratory(){

const requests=
currentUser.role==="patient"
?
db.labRequests.filter(
l=>l.patientId===currentUser.id
)
:
db.labRequests;

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">

  Laboratory

  ${
    currentUser.role==="patient"
    ?
    `<button
       class="btn btn-primary"
       onclick="showLabForm()"
     >
       + Request Test
     </button>`
    :
    ""
  }

</h1>

<div class="card">

  <div class="table-wrap">

    <table>

      <tr>
        <th>Request</th>
        <th>Patient</th>
        <th>Test</th>
        <th>Status</th>
        <th>Result</th>
        <th>Action</th>
      </tr>

      ${
        requests.length
        ?
        requests.map(r=>{

          const patient=
            getUser(r.patientId);

          return`

            <tr>

              <td>
                ${r.id}
              </td>

              <td>
                ${escapeHTML(
                  patient?.name||"-"
                )}
              </td>

              <td>
                ${escapeHTML(
                  r.testName
                )}
              </td>

              <td>
                <span class="badge badge-info">
                  ${r.status}
                </span>
              </td>

              <td>
                ${
                  r.result
                  ?
                  "Result Available"
                  :
                  "Pending"
                }
              </td>

              <td>

                ${
                  (currentUser.role==="admin" || currentUser.role==="nurse")
                  ?
                  `<button
                     class="btn btn-primary"
                     onclick="processLab('${r.id}')"
                   >
                     Process
                   </button>`
                  :
                  ""
                }

                ${
                  currentUser.role==="patient" &&
                  r.result
                  ?
                  `<button
                     class="btn btn-success"
                     onclick="viewLabResult('${r.id}')"
                   >
                     View Result
                   </button>`
                  :
                  ""
                }

              </td>

            </tr>
          `;

        }).join("")
        :
        `<tr>
          <td colspan="6">
            <div class="empty">
              No laboratory requests.
            </div>
          </td>
        </tr>`
      }

    </table>

  </div>

</div>

`;
}

function originalShowLabForm(){

document.getElementById(
"modalContent"
).innerHTML=`


<h2>Request Laboratory Test</h2>

<form onsubmit="createLabRequest(event)">

  <div class="form-group">

    <label>Laboratory Test</label>

    <select
      id="labTest"
      class="form-control"
      required
    >

      <option value="">
        Select test
      </option>

      ${LAB_TESTS.map(t=>`

        <option
          value="${escapeHTML(t.name)}"
        >
          ${escapeHTML(t.name)}
          — ${money(t.price)}
        </option>

      `).join("")}

    </select>

  </div>

  <div class="form-group">

    <label>Notes</label>

    <textarea
      id="labNotes"
      class="form-control"
      rows="4"
    ></textarea>

  </div>

  <div class="alert alert-info">

    After submission, a laboratory invoice
    will be created for payment.

  </div>

  <button class="btn btn-primary">
    Submit Request
  </button>

</form>

`;

openModal();
}

function createLabRequest(e){

e.preventDefault();

const testName=
document.getElementById(
"labTest"
).value;

const test=
LAB_TESTS.find(
t=>t.name===testName
);

const request={


id:uid("lab"),

patientId:
  currentUser.id,

testName,

notes:
  document.getElementById(
    "labNotes"
  ).value,

status:"Requested",

result:null,

createdAt:
  new Date().toISOString()

};

db.labRequests.push(
request
);

const invoice={


id:uid("invoice"),

invoiceNumber:
  invoiceNumber("LAB"),

type:"Laboratory",

patientId:
  currentUser.id,

labRequestId:
  request.id,

items:[

  {
    description:testName,
    quantity:1,
    unitPrice:test?.price||0
  }

],

total:
  test?.price||0,

status:"Pending",

createdAt:
  new Date().toISOString()

};

db.invoices.push(
invoice
);

request.invoiceId=
invoice.id;

db.users
.filter(
u=>
u.role==="admin" &&
u.enabled
)
.forEach(
admin=>
notify(
admin.id,
`New laboratory request ${request.id}.`
)
);

saveDB();

closeModal();

alert(
"Laboratory request created. Please pay the laboratory invoice."
);

navigate("invoices");
}

function processLab(
requestId
){

const request=
db.labRequests.find(
r=>r.id===requestId
);

if(!request)return;

document.getElementById(
"modalContent"
).innerHTML=`


<h2>Process Laboratory Request</h2>

<p>
  <strong>
    ${escapeHTML(
      request.testName
    )}
  </strong>
</p>

<div class="form-group">

  <label>Status</label>

  <select
    id="labStatus"
    class="form-control"
  >

    <option>
      Processing
    </option>

    <option>
      Completed
    </option>

  </select>

</div>

<div class="form-group">

  <label>Result</label>

  <textarea
    id="labResult"
    class="form-control"
    rows="7"
  ></textarea>

</div>

<button
  class="btn btn-primary"
  onclick="saveLab('${requestId}')"
>
  Save Result
</button>

`;

openModal();
}

function saveLab(
requestId
){

const request=
db.labRequests.find(
r=>r.id===requestId
);

request.status=
document.getElementById(
"labStatus"
).value;

request.result=
document.getElementById(
"labResult"
).value;

request.resultDate=
new Date().toISOString();

saveDB();

notify(
request.patientId,
`Your laboratory request ${request.id} has been updated.`
);

closeModal();

renderLaboratory();
}

function viewLabResult(
requestId
){

const request=
db.labRequests.find(
r=>r.id===requestId
);

if(!request)return;

document.getElementById(
"modalContent"
).innerHTML=`


<h2>Laboratory Result</h2>

<p>
  <strong>
    ${escapeHTML(
      request.testName
    )}
  </strong>
</p>

<div class="card">

  ${escapeHTML(
    request.result||
    "No result available."
  )}

</div>

<button
  class="btn btn-secondary"
  onclick="closeModal()"
>
  Close
</button>

`;

openModal();
}

/* =========================================================
HOME SERVICES
========================================================= */

function renderHomeServices(){

const patientStatus=currentUser.role==="patient" ? getPatientStatus(currentUser.id) : null;

const services=
currentUser.role==="patient"
? db.homeServices.filter(s=>s.patientId===currentUser.id)
: currentUser.role==="nurse"
? db.homeServices.filter(s=>s.providerId===currentUser.id)
: db.homeServices;

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">

  Home Healthcare Services

  ${
    currentUser.role==="patient"
    ? patientStatus==="Returning Client"
      ? `<button class="btn btn-primary" onclick="showHomeServiceForm()">+ Request Home Service</button>`
      : `<span class="badge badge-warning">New Client — Home Assessment Required</span>`
    :
    ""
  }

</h1>

<div class="alert alert-info">

  Request professional healthcare services at home.
  Select the service you need, choose your preferred date and time,
  and provide the service address and any relevant notes.

  <br><br>

  <strong>Home service fees are displayed for each service.</strong>

  ${currentUser.role==="patient" && patientStatus==="New Client" ? `<br><br><strong>New clients:</strong> You must complete and pay for a Home Assessment before a home-care service can be booked. A Nursing Officer will assess whether home care is appropriate.` : ""}

</div>

${
  currentUser.role==="patient" && patientStatus==="Returning Client"
  ?
  `<div class="grid grid-3">

    ${HOME_SERVICES.filter(s=>s.active!==false).map(s=>`

      <div class="service-card">

        <div class="service-icon">
          ${s.icon}
        </div>

        <h3>
          ${escapeHTML(s.name)}
        </h3>

        <p class="small text-muted">
          ${escapeHTML(s.description)}
        </p>

        <p>
          Service fee:
          <strong>
            ${money(s.price)}
          </strong>
        </p>

        <button
          class="btn btn-primary"
          onclick="showHomeServiceForm('${escapeHTML(s.name)}')"
        >
          Request
        </button>

      </div>

    `).join("")}

  </div>`
  :
  ""
}

${
  currentUser.role==="admin"
  ? `
  <div class="card">
    <div class="flex" style="justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
      <div>
        <h3>Manage Home Services</h3>
        <p class="small text-muted">Add services, update descriptions or charges, and remove services from the client request list.</p>
      </div>
      <button class="btn btn-primary" onclick="showHomeServiceCatalogForm()">+ Add Service</button>
    </div>

    <div class="table-wrap">
      <table>
        <tr><th>Service</th><th>Description</th><th>Charge</th><th>Status</th><th>Actions</th></tr>
        ${HOME_SERVICES.filter(s=>s.active!==false).map(s=>`
          <tr>
            <td><strong>${escapeHTML(s.name)}</strong></td>
            <td>${escapeHTML(s.description)}</td>
            <td>${money(s.price)}</td>
            <td><span class="badge ${s.active===false ? 'badge-danger':'badge-success'}">${s.active===false?'Removed':'Active'}</span></td>
            <td>
              <button class="btn btn-secondary" onclick="showHomeServiceCatalogForm('${s.id||''}')">Edit</button>
              <button class="btn ${s.active===false?'btn-primary':'btn-danger'}" onclick="toggleHomeServiceCatalog('${s.id||''}')">${s.active===false?'Restore':'Remove'}</button>
            </td>
          </tr>
        `).join("")}
      </table>
    </div>
  </div>
  `
  : ""
}

<br>

<div class="card">

  <h3>
    ${
      currentUser.role==="patient"
      ? "My Home Service Requests"
      : "Home Service Requests"
    }
  </h3>

  ${
    services.length
    ?
    `
    <div class="table-wrap">

      <table>

        <tr>
          <th>Request</th>
          <th>Patient</th>
          <th>Service</th>
          <th>Date</th>
          <th>Total</th>
          ${currentUser.role!=="patient" ? "<th>Phone</th><th>Location</th>" : ""}
          <th>Status</th>
          <th>Action</th>
        </tr>

        ${services.map(s=>{

          const patient=
            getUser(s.patientId);

          return`

            <tr>

              <td>${s.id}</td>

              <td>
                ${escapeHTML(
                  patient?.name||"-"
                )}
              </td>

              <td>
                ${escapeHTML(
                  s.service
                )}
              </td>

              <td>
                ${s.date}
                ${s.time}
              </td>

              <td>
                ${money(s.total)}
              </td>

              ${currentUser.role!=="patient" ? `<td>${escapeHTML(patient?.phone||"-")}</td><td>${escapeHTML(s.address||patient?.address||"-")}</td>` : ""}

              <td>
                <span class="badge badge-info">
                  ${s.status}
                </span>
              </td>

              <td>

                ${
                  (currentUser.role==="admin" || currentUser.role==="nurse")
                  ?
                  `<button
                     class="btn btn-primary"
                     onclick="assignHomeService('${s.id}')"
                   >
                     Manage
                   </button>`
                  :
                  ""
                }

              </td>

            </tr>
          `;

        }).join("")}

      </table>

    </div>
    `
    :
    `<div class="empty">
      No home service requests.
    </div>`
  }

</div>

`;
}

function showHomeServiceForm(
selectedService=""
){

document.getElementById(
"modalContent"
).innerHTML=`


<h2>Request Home Healthcare Service</h2>

<form
  onsubmit="createHomeService(event)"
>

  <div class="form-group">

    <label>Service</label>

    <select
      id="homeService"
      class="form-control"
      onchange="updateHomeServiceTotal()"
      required
    >

      <option value="">
        Select service
      </option>

      ${HOME_SERVICES.filter(s=>s.active!==false).map(s=>`

        <option
          value="${escapeHTML(s.name)}"
          ${
            selectedService===s.name
            ? "selected"
            : ""
          }
        >
          ${escapeHTML(s.name)}
          — ${money(s.price)}
        </option>

      `).join("")}

    </select>

  </div>

  <div class="grid grid-2">

    <div class="form-group">

      <label>Preferred Date</label>

      <input
        id="homeDate"
        type="date"
        onchange="updateHomeProviderAvailability()"
        min="${today()}"
        class="form-control"
        required
      >

    </div>

    <div class="form-group">

      <label>Preferred Time</label>

      <input
        id="homeTime"
        type="time"
        min="08:00"
        max="17:00"
        onchange="updateHomeProviderAvailability()"
        class="form-control"
        required
      >

    </div>

  </div>

  <div class="form-group">
    <label>Preferred Nursing Officer</label>
    <select id="homeProvider" class="form-control" required onchange="updateHomeProviderAvailability()">
      <option value="">Select nursing officer</option>
      ${db.users.filter(u=>u.role==="nurse" && u.enabled && u.homeServiceProvider).map(n=>`<option value="${n.id}">${escapeHTML(n.name)} — Available</option>`).join("")}
    </select>
    <div class="small text-muted" style="margin-top:6px">Each nursing officer can have only one home-service booking at the same date and time.</div>
  </div>

  <div class="form-group">

    <label>Service Address</label>

    <textarea
      id="homeAddress"
      class="form-control"
      required
    >${escapeHTML(
      currentUser.address||""
    )}</textarea>

  </div>

  <div class="form-group">

    <label>Transport Fee</label>

    <select id="homeTransport" class="form-control" onchange="updateHomeServiceTotal()" required>
      <option value="0">0–5 km — Included</option>
      <option value="300">6–10 km — + KES 300</option>
      <option value="500">11–15 km — + KES 500</option>
      <option value="quotation">Beyond 15 km — Quotation based on distance</option>
    </select>
    <div class="small text-muted" style="margin-top:6px">Home visit from KES 1,500 – transport included within the BOH service area.</div>

  </div>

  <div class="form-group">

    <label>Notes</label>

    <textarea
      id="homeNotes"
      class="form-control"
      rows="4"
    ></textarea>

  </div>

  <div id="homeTotal"></div>

  <button class="btn btn-primary">
    Submit Request
  </button>

</form>

`;

openModal();
applyHospitalBookingWindow("homeDate","homeTime");

updateHomeServiceTotal();
}

function updateHomeServiceTotal(){
  const service=document.getElementById("homeService")?.value;
  const item=HOME_SERVICES.find(s=>s.name===service);
  const serviceFee=Number(item?.price||0);
  const transport=document.getElementById("homeTransport")?.value || "0";
  const transportFee=transport==="quotation" ? 0 : Number(transport);
  const quotation=transport==="quotation";
  const total=serviceFee+transportFee;
  const box=document.getElementById("homeTotal");
  if(box){
    box.innerHTML=`<div class="alert alert-success">Service fee: <strong>${money(serviceFee)}</strong><br><br>Transport fee: <strong>${quotation ? "Quotation based on distance" : money(transportFee)}</strong><br><br>${quotation ? "Transport quotation will be confirmed by the hospital." : `<strong>Total:</strong> ${money(total)}`}<br><br><span class="small">Home visit from KES 1,500 – transport included within the BOH service area.</span></div>`;
  }
}



function showHomeServiceCatalogForm(serviceId=""){
  if(currentUser?.role!=="admin") return;
  const service=HOME_SERVICES.find(s=>s.id===serviceId);
  document.getElementById("modalContent").innerHTML=`
    <h2>${service?"Update Home Service":"Add Home Service"}</h2>
    <form onsubmit="saveHomeServiceCatalog(event,'${serviceId||""}')">
      <div class="form-group"><label>Service Name</label><input id="catalogName" class="form-control" required value="${service?escapeHTML(service.name):""}"></div>
      <div class="form-group"><label>Service Description</label><textarea id="catalogDescription" class="form-control" rows="4" required>${service?escapeHTML(service.description):""}</textarea></div>
      <div class="form-group"><label>Charge (KES)</label><input id="catalogPrice" class="form-control" type="number" min="0" step="1" required value="${service?Number(service.price):""}"></div>
      <div class="flex" style="gap:8px"><button class="btn btn-primary" type="submit">Save Service</button><button class="btn btn-secondary" type="button" onclick="closeModal()">Cancel</button></div>
    </form>`;
  openModal();
}

function saveHomeServiceCatalog(e,serviceId=""){
  e.preventDefault();
  if(currentUser?.role!=="admin") return;
  const name=document.getElementById("catalogName").value.trim();
  const description=document.getElementById("catalogDescription").value.trim();
  const price=Number(document.getElementById("catalogPrice").value);
  if(!name || !description || !Number.isFinite(price) || price<0){ alert("Please enter a valid service name, description and charge."); return; }
  if(!serviceId){
    if(HOME_SERVICES.some(s=>s.name.toLowerCase()===name.toLowerCase() && s.active!==false)){ alert("A service with this name already exists."); return; }
    HOME_SERVICES.push({id:uid("home_catalog"),name,description,price,icon:"🏠",active:true});
  }else{
    const service=HOME_SERVICES.find(s=>s.id===serviceId);
    if(!service) return;
    service.name=name; service.description=description; service.price=price; service.active=true;
  }
  db.settings.homeServiceCatalog=HOME_SERVICES;
  saveDB(); closeModal(); renderHomeServices();
  alert(serviceId?"Home service updated successfully.":"Home service added successfully.");
}

function toggleHomeServiceCatalog(serviceId){
  if(currentUser?.role!=="admin") return;
  const service=HOME_SERVICES.find(s=>s.id===serviceId);
  if(!service) return;
  const removing=service.active!==false;
  if(removing && !confirm(`Remove "${service.name}" from the client service list? Existing requests will remain unchanged.`)) return;
  service.active=removing?false:true;
  db.settings.homeServiceCatalog=HOME_SERVICES;
  saveDB(); renderHomeServices();
}

function isHomeProviderBusy(providerId,date,time,excludeId="") {
  if(!providerId || !date || !time) return false;
  return db.homeServices.some(h => h.providerId===providerId && h.date===date && h.time===time && h.id!==excludeId && h.status!=="Cancelled" && h.status!=="Completed");
}

function updateHomeProviderAvailability(){
  const select=document.getElementById("homeProvider");
  const date=document.getElementById("homeDate")?.value;
  const time=document.getElementById("homeTime")?.value;
  if(!select) return;
  const current=select.value;
  select.innerHTML=`<option value="">Select nursing officer</option>` + db.users.filter(u=>u.role==="nurse" && u.enabled && u.homeServiceProvider).map(n=>{
    const busy=isHomeProviderBusy(n.id,date,time);
    return `<option value="${n.id}" ${current===n.id && !busy ? "selected" : ""} ${busy ? "disabled" : ""}>${escapeHTML(n.name)} — ${busy ? "Busy" : "Available"}</option>`;
  }).join("");
  if(current && isHomeProviderBusy(current,date,time)) select.value="";
}

function createHomeService(e){

e.preventDefault();

const serviceName=
document.getElementById(
"homeService"
).value;

const service=
HOME_SERVICES.find(
s=>s.active!==false && s.name===serviceName
);

const serviceFee=
Number(
service?.price||0
);

const transportSelection=document.getElementById("homeTransport")?.value || "0";
const transportFee=transportSelection==="quotation" ? 0 : Number(transportSelection);
const transportQuotation=transportSelection==="quotation";
const total=serviceFee+transportFee;
const providerId=document.getElementById("homeProvider")?.value;
const date=document.getElementById("homeDate").value;
const time=document.getElementById("homeTime").value;
if(!validateHospitalBookingWindow(date,time,"home service")) return;
if(!providerId){ alert("Please select a nursing officer."); return; }
const providerConflict=db.homeServices.find(h=>h.providerId===providerId && h.date===date && h.time===time && h.status!=="Cancelled");
if(providerConflict){ alert("That nursing officer is already booked for a home service at this date and time. Please choose another nursing officer or time."); return; }

const request={


id:uid("home"),

patientId:
  currentUser.id,

providerId,

service:
  serviceName,

date,

time,

address:
  document.getElementById(
    "homeAddress"
  ).value,

serviceFee,

transportFee,

transportBand:transportSelection,

transportQuotation,

total,

notes:
  document.getElementById(
    "homeNotes"
  ).value,

status:
  "Pending Payment",

createdAt:
  new Date().toISOString()

};

db.homeServices.push(
request
);

const invoice={


id:uid("invoice"),

invoiceNumber:
  invoiceNumber("HOME"),

type:"Home Service",

patientId:
  currentUser.id,

homeServiceId:
  request.id,

items:[

  {
    description:
      serviceName,
    quantity:1,
    unitPrice:
      serviceFee
  },
  {
    description: transportQuotation ? "Transport — quotation based on distance" : `Transport fee (${transportSelection==="0" ? "0–5 km" : transportSelection==="300" ? "6–10 km" : "11–15 km"})`,
    quantity:1,
    unitPrice: transportFee
  },

 ],

total,

status:"Pending",

createdAt:
  new Date().toISOString()

};

db.invoices.push(
invoice
);

request.invoiceId=
invoice.id;

db.users
.filter(
u=>
u.role==="admin" &&
u.enabled
)
.forEach(
admin=>
notify(
admin.id,
`New home service request ${request.id} requires payment/processing.`
)
);

saveDB();

closeModal();

alert(
"Home service request created. Please pay the invoice."
);

navigate("invoices");
}

function assignHomeService(
serviceId
){

const service=
db.homeServices.find(
s=>s.id===serviceId
);

if(!service)return;

document.getElementById(
"modalContent"
).innerHTML=`


<h2>Manage Home Service</h2>

<p>
  <strong>
    ${escapeHTML(
      service.service
    )}
  </strong>
</p>

<p>
  ${service.date}
  at
  ${service.time}
</p>
<p><strong>Nursing Officer:</strong> ${escapeHTML(getUser(service.providerId)?.name||"Not assigned")}</p>

<div class="form-group">

  <label>Status</label>

  <select
    id="homeStatus"
    class="form-control"
  >

    <option>
      Paid - Awaiting Assignment
    </option>

    <option>
      Assigned
    </option>

    <option>
      In Progress
    </option>

    <option>
      Completed
    </option>

  </select>

</div>

<button
  class="btn btn-primary"
  onclick="saveHomeStatus('${serviceId}')"
>
  Save
</button>

`;

openModal();
}

function saveHomeStatus(
serviceId
){

const service=
db.homeServices.find(
s=>s.id===serviceId
);

if(!service)return;

service.status=
document.getElementById(
"homeStatus"
).value;

saveDB();

notify(
service.patientId,
`Your home service ${service.service} status is now ${service.status}.`
);

closeModal();

renderHomeServices();
}

/* =========================================================
INVENTORY
========================================================= */

function renderInventory(){

if(
currentUser.role!=="pharmacist" &&
currentUser.role!=="admin"
){
return;
}

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">

  Pharmacy Inventory

  ${
    currentUser.role==="pharmacist" ||
    currentUser.role==="admin"
    ?
    `<button
       class="btn btn-primary"
       onclick="showAddMedicine()"
     >
       + Add Medicine
     </button>`
    :
    ""
  }

</h1>

<div class="card">

  <div class="table-wrap">

    <table>

      <tr>

        <th>Medicine</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Expiry</th>
        <th>Status</th>

      </tr>

      ${db.inventory.map(m=>`

        <tr>

          <td>
            ${escapeHTML(m.name)}
          </td>

          <td>
            ${money(m.price)}
          </td>

          <td>
            ${m.quantity}
          </td>

          <td>
            ${m.expiry}
          </td>

          <td>

            ${
              m.quantity>0 &&
              new Date(m.expiry)>new Date()
              ?
              `<span class="badge badge-success">
                 Available
               </span>`
              :
              `<span class="badge badge-danger">
                 Unavailable
               </span>`
            }

          </td>

        </tr>

      `).join("")}

    </table>

  </div>

</div>

`;
}

function showAddMedicine(){

document.getElementById(
"modalContent"
).innerHTML=`


<h2>Add Medicine</h2>

<form onsubmit="addMedicine(event)">

  <div class="form-group">

    <label>Medicine Name</label>

    <input
      id="newMedicineName"
      class="form-control"
      required
    >

  </div>

  <div class="grid grid-3">

    <div class="form-group">

      <label>Price</label>

      <input
        id="newMedicinePrice"
        type="number"
        min="0"
        class="form-control"
        required
      >

    </div>

    <div class="form-group">

      <label>Quantity</label>

      <input
        id="newMedicineQuantity"
        type="number"
        min="0"
        class="form-control"
        required
      >

    </div>

    <div class="form-group">

      <label>Expiry</label>

      <input
        id="newMedicineExpiry"
        type="date"
        class="form-control"
        required
      >

    </div>

  </div>

  <button class="btn btn-primary">
    Add Medicine
  </button>

</form>

`;

openModal();
}

function addMedicine(e){

e.preventDefault();

db.inventory.push({


id:uid("medicine"),

name:
  document.getElementById(
    "newMedicineName"
  ).value,

price:
  Number(
    document.getElementById(
      "newMedicinePrice"
    ).value
  ),

quantity:
  Number(
    document.getElementById(
      "newMedicineQuantity"
    ).value
  ),

expiry:
  document.getElementById(
    "newMedicineExpiry"
  ).value

});

saveDB();

closeModal();

renderInventory();
}

/* =========================================================
ADMIN USERS
========================================================= */

function renderUsers(){

if(
currentUser.role!=="admin"
){
return;
}

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">

  User Management

  <button
    class="btn btn-primary"
    onclick="showAdminAddUser()"
  >
    + Add User
  </button>

</h1>

<div class="card">

  <div class="table-wrap">

    <table>

      <tr>

        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Specialty</th>
        <th>Patient Status</th>
        <th>Status</th>
        <th>Action</th>

      </tr>

      ${db.users.map(u=>`

        <tr>

          <td>
            ${escapeHTML(u.name)}
          </td>

          <td>
            ${escapeHTML(u.email)}
          </td>

          <td>
            ${formatRole(u.role)}
          </td>

          <td>
            ${escapeHTML(
              u.specialty||"-"
            )}
          </td>

          <td>
            ${u.role==="patient" ? patientStatusBadge(u.id) : "-"}
          </td>

          <td>

            <span class="badge ${
              u.enabled
              ? "badge-success"
              : "badge-danger"
            }">

              ${
                u.enabled
                ? "Enabled"
                : "Disabled"
              }

            </span>

          </td>

          <td>

            <button
              class="btn ${
                u.enabled
                ? "btn-danger"
                : "btn-success"
              }"
              onclick="toggleUser('${u.id}')"
            >

              ${
                u.enabled
                ? "Disable"
                : "Enable"
              }

            </button>

            <button
              class="btn btn-secondary"
              onclick="regenerateUserCode('${u.id}')"
            >
              🔐 New Code
            </button>

            ${u.role==="patient" ? `<button class="btn btn-primary" onclick="togglePatientStatusOverride('${u.id}')">${u.patientStatusOverride==="returning" ? "↩ Use Record Status" : "✓ Verify Returning"}</button>` : ""}

          </td>

        </tr>

      `).join("")}

    </table>

  </div>

</div>

`;
}

function toggleUser(
userId
){

const user=
getUser(userId);

if(!user)return;

if(
user.id===currentUser.id
){


alert(
  "You cannot disable your own administrator account."
);

return;

}

user.enabled=
!user.enabled;

saveDB();

renderUsers();
}

function showAdminAddUser(){

document.getElementById(
"modalContent"
).innerHTML=`


<h2>Add User</h2>

<form onsubmit="adminAddUser(event)">

  <div class="form-group">

    <label>Name</label>

    <input
      id="adminUserName"
      class="form-control"
      required
    >

  </div>

  <div class="grid grid-2">

    <div class="form-group">

      <label>Email</label>

      <input
        id="adminUserEmail"
        type="email"
        class="form-control"
        required
      >

    </div>

    <div class="form-group">

      <label>Phone</label>

      <input
        id="adminUserPhone"
        class="form-control"
        required
      >

    </div>

  </div>

  <div class="form-group">

    <label>Role</label>

    <select
      id="adminUserRole"
      class="form-control"
      onchange="toggleAdminSpecialty()"
    >

      <option value="patient">
        Patient
      </option>

      <option value="doctor">
        Doctor
      </option>

      <option value="pharmacist">
        Pharmacist
      </option>
      <option value="lab_technician">
        Laboratory Technician
      </option>

      <option value="rider">
        Rider
      </option>

      <option value="admin">
        Administrator
      </option>

    </select>

  </div>

  <div
    id="adminSpecialtyBox"
    class="form-group hidden"
  >

    <label>Doctor Specialty</label>

    <select
      id="adminUserSpecialty"
      class="form-control"
    >

      ${SPECIALTIES.map(s=>`
        <option>${s}</option>
      `).join("")}

    </select>

  </div>

  <div class="alert alert-info">
    A one-time login code will be generated automatically for this
    user (simulating an emailed code, since this demo has no email
    server). The user signs in with their email and this code, then
    is required to set their own password before entering the app.
  </div>

  <div class="form-group">

    <label>Address</label>

    <textarea
      id="adminUserAddress"
      class="form-control"
    ></textarea>

  </div>

  <button class="btn btn-primary">
    Create User & Generate Login Code
  </button>

</form>

`;

openModal();
}

function generateLoginCode(){

  /* 8-character alphanumeric code, uppercase, unambiguous characters only */
  const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code="";

  for(let i=0;i<8;i++){
    code+=chars.charAt(
      Math.floor(Math.random()*chars.length)
    );
  }

  return code;
}

function toggleAdminSpecialty(){

const role=
document.getElementById(
"adminUserRole"
).value;

document
.getElementById(
"adminSpecialtyBox"
)
.classList.toggle(
"hidden",
role!=="doctor"
);
}

function adminAddUser(e){

e.preventDefault();

const email=
document.getElementById(
"adminUserEmail"
).value
.trim()
.toLowerCase();

if(
db.users.some(
u=>u.email.toLowerCase()===email
)
){


alert(
  "That email already exists."
);

return;

}

const role=
document.getElementById(
"adminUserRole"
).value;

const loginCode=
  generateLoginCode();

const user={


id:uid(role),

name:
  document.getElementById(
    "adminUserName"
  ).value,

email,

phone:
  document.getElementById(
    "adminUserPhone"
  ).value,

password:
  loginCode,

mustChangePassword:true,

role,

enabled:true,

address:
  document.getElementById(
    "adminUserAddress"
  ).value,

lat:null,

lng:null,

patientStatusOverride:role==="patient" ? null : undefined

};

if(role==="doctor"){


user.specialty=
  document.getElementById(
    "adminUserSpecialty"
  ).value;

user.maxBookingsPerDay=10;

}

if(role==="rider"){


user.currentLocation=null;

}

db.users.push(user);

notify(
user.id,
`Welcome to Beacon of Hope Hospital. Your login code is ${loginCode}. Sign in with your email and this code, then set your own password.`
);

saveDB();

document.getElementById("modalContent").innerHTML=`

  <h2>✅ User Created</h2>

  <div class="alert alert-success">

    <strong>${escapeHTML(user.name)}</strong>
    (${escapeHTML(user.email)}) has been registered as a
    ${escapeHTML(formatRole(role))}.

  </div>

  <div class="alert alert-warning">

    <strong>Login code (simulated email):</strong>

    <div style="font-size:26px;font-weight:bold;letter-spacing:3px;margin:8px 0;color:var(--primary)">
      ${escapeHTML(loginCode)}
    </div>

    Share this code with the user. They sign in with their
    <strong>email</strong> and this <strong>code</strong> as the
    password, and will be required to set their own password on
    first login.

    <br><br>

    <span class="small">
      Production deployment should send this code by email/SMS
      instead of displaying it here.
    </span>

  </div>

  <button class="btn btn-primary" onclick="closeModal();renderUsers();">
    Done
  </button>

`;

openModal();
}

function regenerateUserCode(userId){

const user=getUser(userId);

if(!user)return;

if(!confirm(`Generate a new login code for ${user.name}? Their current password will stop working immediately.`)){
return;
}

const loginCode=generateLoginCode();

user.password=loginCode;
user.mustChangePassword=true;

saveDB();

notify(
user.id,
`Your login code has been reset by the administrator. New code: ${loginCode}. Sign in with your email and this code, then set a new password.`
);

document.getElementById("modalContent").innerHTML=`

  <h2>🔐 New Login Code Generated</h2>

  <div class="alert alert-warning">

    <strong>${escapeHTML(user.name)}</strong> (${escapeHTML(user.email)})

    <div style="font-size:26px;font-weight:bold;letter-spacing:3px;margin:8px 0;color:var(--primary)">
      ${escapeHTML(loginCode)}
    </div>

    The user must sign in with this code and will be required to
    set a new password.

  </div>

  <button class="btn btn-primary" onclick="closeModal();renderUsers();">
    Done
  </button>

`;

openModal();
}

/* =========================================================
DOCTOR CAPACITY / DATE SCHEDULE
========================================================= */

function renderDoctorSettings(){

if(
currentUser.role!=="doctor"
){
return;
}

const schedules=
db.doctorSchedules.filter(
s=>
s.doctorId===
currentUser.id
);

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">
  Booking Capacity
</h1>

<div class="alert alert-info">

  You can set a maximum number of
  bookings for a specific date.

  Every consultation remains
  maximum <strong>45 minutes</strong>.

</div>

<div class="card">

  <h3>Default Daily Capacity</h3>

  <div class="grid grid-2">

    <div class="form-group">

      <label>
        Default maximum bookings
      </label>

      <input
        id="defaultDoctorCapacity"
        type="number"
        min="1"
        max="100"
        class="form-control"
        value="${
          currentUser.maxBookingsPerDay||10
        }"
      >

    </div>

    <div class="form-group">

      <label>Specialty</label>

      <select
        id="doctorSpecialty"
        class="form-control"
      >

        ${SPECIALTIES.map(s=>`

          <option
            ${
              currentUser.specialty===s
              ? "selected"
              : ""
            }
          >
            ${s}
          </option>

        `).join("")}

      </select>

    </div>

  </div>

  <button
    class="btn btn-primary"
    onclick="saveDoctorDefaultSettings()"
  >
    Save Default Settings
  </button>

</div>

<div class="card">

  <h3>Set Capacity For A Specific Date</h3>

  <div class="grid grid-2">

    <div class="form-group">

      <label>Date</label>

      <input
        id="capacityDate"
        type="date"
        min="${today()}"
        class="form-control"
      >

    </div>

    <div class="form-group">

      <label>Maximum Bookings</label>

      <input
        id="capacityMax"
        type="number"
        min="1"
        max="100"
        value="10"
        class="form-control"
      >

    </div>

  </div>

  <button
    class="btn btn-primary"
    onclick="saveDateCapacity()"
  >
    Save Date Capacity
  </button>

</div>

<div class="card">

  <h3>Date-Based Capacities</h3>

  ${
    schedules.length
    ?
    `<table>

      <tr>
        <th>Date</th>
        <th>Maximum</th>
      </tr>

      ${schedules.map(s=>`

        <tr>
          <td>${s.date}</td>
          <td>${s.maxBookings}</td>
        </tr>

      `).join("")}

    </table>`
    :
    `<div class="empty">
      No date-specific capacities configured.
    </div>`
  }

</div>

`;
}

function saveDoctorDefaultSettings(){

const max=
Number(
document.getElementById(
"defaultDoctorCapacity"
).value
);

const specialty=
document.getElementById(
"doctorSpecialty"
).value;

if(max<1){


alert(
  "Capacity must be at least 1."
);

return;

}

const user=
getUser(
currentUser.id
);

user.maxBookingsPerDay=max;
user.specialty=specialty;

currentUser=user;

saveDB();

buildSidebar();

alert(
"Doctor settings saved."
);

renderDoctorSettings();
}

function saveDateCapacity(){

const date=
document.getElementById(
"capacityDate"
).value;

const max=
Number(
document.getElementById(
"capacityMax"
).value
);

if(!date||max<1){


alert(
  "Enter a valid date and capacity."
);

return;

}

let schedule=
db.doctorSchedules.find(
s=>
s.doctorId===
currentUser.id &&
s.date===date
);

if(schedule){


schedule.maxBookings=max;

}else{


db.doctorSchedules.push({

  id:uid("schedule"),

  doctorId:
    currentUser.id,

  date,

  maxBookings:max

});

}

saveDB();

alert(
`Maximum bookings for ${date} set to ${max}.`
);

renderDoctorSettings();
}

/* =========================================================
NOTIFICATIONS
========================================================= */

function renderNotifications(){

const notifications=
currentUser.role==="admin"
?
db.notifications
:
db.notifications.filter(
n=>
n.userId===
currentUser.id
);

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">
  Notifications
</h1>

<div class="card">

  ${
    notifications.length
    ?
    notifications
      .slice()
      .reverse()
      .map(n=>`

        <div class="alert alert-info">

          <strong>
            ${new Date(
              n.createdAt
            ).toLocaleString()}
          </strong>

          <br>

          ${escapeHTML(
            n.message
          )}

        </div>

      `).join("")
    :
    `<div class="empty">
      No notifications.
    </div>`
  }

</div>

`;
}

/* =========================================================
PROFILE
========================================================= */

function renderProfile(){

document.getElementById(
"content"
).innerHTML=`


<h1 class="page-title">
  My Profile
</h1>

<div class="card">

  <div class="grid grid-2">

    <div class="form-group">

      <label>Name</label>

      <input
        id="profileName"
        class="form-control"
        value="${escapeHTML(
          currentUser.name
        )}"
      >

    </div>

    <div class="form-group">

      <label>Email</label>

      <input
        class="form-control"
        value="${escapeHTML(
          currentUser.email
        )}"
        disabled
      >

    </div>

  </div>

  <div class="grid grid-2">

    <div class="form-group">

      <label>Phone</label>

      <input
        id="profilePhone"
        class="form-control"
        value="${escapeHTML(
          currentUser.phone||""
        )}"
      >

    </div>

    <div class="form-group">

      <label>Role</label>

      <input
        class="form-control"
        value="${formatRole(
          currentUser.role
        )}"
        disabled
      >

    </div>

  </div>

  ${
    currentUser.role==="doctor"
    ?
    `<div class="form-group">

      <label>Specialty</label>

      <input
        class="form-control"
        value="${escapeHTML(
          currentUser.specialty||
          "General Doctor"
        )}"
        disabled
      >

    </div>`
    :
    ""
  }

  <div class="form-group">

    <label>Address</label>

    <textarea
      id="profileAddress"
      class="form-control"
    >${escapeHTML(
      currentUser.address||""
    )}</textarea>

  </div>

  <button
    class="btn btn-primary"
    onclick="saveProfile()"
  >
    Save Profile
  </button>

</div>

`;
}

function saveProfile(){

const user=
getUser(
currentUser.id
);

if(!user)return;

user.name=
document.getElementById(
"profileName"
).value;

user.phone=
document.getElementById(
"profilePhone"
).value;

user.address=
document.getElementById(
"profileAddress"
).value;

currentUser=user;

localStorage.setItem(
"beaconHopeCurrentUser",
JSON.stringify(user)
);

saveDB();

document.getElementById(
"topUserName"
).textContent=
user.name;

document.getElementById(
"userAvatar"
).textContent=
user.name
.charAt(0)
.toUpperCase();

alert(
"Profile updated."
);
}

/* =========================================================
MODAL
========================================================= */

function openModal(){

document
.getElementById("modal")
.classList.remove(
"hidden"
);
}

function closeModal(){

document
.getElementById("modal")
.classList.add(
"hidden"
);

document.getElementById(
"modalContent"
).innerHTML="";
}

/* =========================================================
SESSION RESTORE
========================================================= */

(function restoreSession(){

const saved=
localStorage.getItem(
"beaconHopeCurrentUser"
);

if(!saved)return;

try{


const savedUser=
  JSON.parse(saved);

const user=
  getUser(
    savedUser.id
  );

if(
  user &&
  user.enabled
){

  currentUser=user;

  openApp();

}

}catch(e){


localStorage.removeItem(
  "beaconHopeCurrentUser"
);

}

})();

/* Authenticate account access through the Flask API. */
window.beaconLogin = async function(event){
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;
  const submitButton = event.currentTarget.querySelector('button[type="submit"], button:not([type])');

  if(submitButton) submitButton.disabled = true;
  try{
    const result = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({email, password})
    });
    const user = cacheBackendUser(result.user);
    localStorage.setItem(AUTH_TOKEN_KEY, result.token);
    currentUser = user;
    localStorage.setItem("beaconHopeCurrentUser", JSON.stringify(user));
    openApp();
  }catch(error){
    alert(error.message || "Unable to sign in. Please try again.");
  }finally{
    if(submitButton) submitButton.disabled = false;
  }
};

window.registerPatient = async function(event){
  event.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim().toLowerCase();
  const phone = document.getElementById("regPhone").value.trim();
  const address = document.getElementById("regAddress").value.trim();
  const password = document.getElementById("regPassword").value;
  const passwordConfirmation = document.getElementById("regPassword2").value;

  if(password !== passwordConfirmation){
    alert("Passwords do not match.");
    return;
  }

  const submitButton = event.currentTarget.querySelector('button[type="submit"], button:not([type])');
  if(submitButton) submitButton.disabled = true;
  try{
    const user = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({name, email, phone, address, password})
    });
    cacheBackendUser(user);
    closeModal();
    alert("Patient account created successfully. You can now sign in.");
    document.getElementById("loginEmail").value = email;
    document.getElementById("loginPassword").value = "";
  }catch(error){
    alert(error.message || "Unable to create your account. Please try again.");
  }finally{
    if(submitButton) submitButton.disabled = false;
  }
};

const savedAuthToken = localStorage.getItem(AUTH_TOKEN_KEY);
if(savedAuthToken){
  apiRequest("/me")
    .then(userData => {
      currentUser = cacheBackendUser(userData);
      localStorage.setItem("beaconHopeCurrentUser", JSON.stringify(currentUser));
      openApp();
    })
    .catch(error => {
      if(error.status === 401 || error.status === 403){
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem("beaconHopeCurrentUser");
      }else{
        console.error("Unable to restore API session:", error);
      }
    });
}
/* =========================================================
SAVE BEFORE EXIT
========================================================= */

window.addEventListener(
"beforeunload",
()=>{
saveDB();
}
);




/* =========================================================
   REFINED WORKFLOWS / USER REQUESTED FEATURES
========================================================= */

if(!Array.isArray(db.refillRequests)) db.refillRequests=[];

function notifyAllAdmins(message){
  db.users.filter(u=>u.role==="admin" && u.enabled).forEach(a=>notify(a.id,message,"booking"));
  saveDB();
}

function showForgotPassword(){
  document.getElementById("modalContent").innerHTML=`
    <h2>Reset Password</h2>
    <p class="text-muted">Enter the email and phone number registered to your account.</p>
    <form onsubmit="resetPassword(event)">
      <div class="form-group"><label>Email</label><input id="resetEmail" type="email" class="form-control" required></div>
      <div class="form-group"><label>Phone Number</label><input id="resetPhone" class="form-control" required></div>
      <div class="form-group"><label>New Password</label><input id="resetNewPassword" type="password" class="form-control" minlength="6" required></div>
      <div class="form-group"><label>Confirm New Password</label><input id="resetNewPassword2" type="password" class="form-control" minlength="6" required></div>
      <button class="btn btn-primary">Reset Password</button>
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    </form>`;
  openModal();
}

function resetPassword(e){
  e.preventDefault();
  const email=document.getElementById("resetEmail").value.trim().toLowerCase();
  const phone=document.getElementById("resetPhone").value.trim();
  const p1=document.getElementById("resetNewPassword").value;
  const p2=document.getElementById("resetNewPassword2").value;
  const user=db.users.find(u=>u.email.toLowerCase()===email && String(u.phone||"").trim()===phone);
  if(!user){alert("No account matched that email and phone number.");return;}
  if(p1!==p2){alert("The new passwords do not match.");return;}
  user.password=p1; saveDB(); closeModal(); alert("Password reset successfully. You can now sign in with the new password.");
}

function showEnquiries(){
  document.getElementById("modalContent").innerHTML=`
    <h2>Enquiries & Support</h2>
    <div class="grid grid-2">
      <div class="card"><h3>📞 Phone</h3><p>0720876123</p><span class="small text-muted">Beacon of Hope Hospital</span></div>
      <div class="card"><h3>✉️ Email</h3><p>hospital@beaconafrica.org</p><span class="small text-muted">Beacon of Hope Hospital</span></div>
      <div class="card"><h3>📍 Location</h3><p>Ongata Rongai, Beacon of Hope Centre, Off Magadi Rd,<br>Along Gataka Rd</p><span class="small text-muted">Beacon of Hope Hospital</span></div>
      <div class="card"><h3>💻 Platform</h3><p>Beacon of Hope Hospital Telemedicine</p><span class="small text-muted">Online consultations, physical bookings, pharmacy and home services.</span></div>
      <div class="card"><h3>🕐 Support</h3><p>For appointments, payments, deliveries and platform assistance.</p></div>
    </div>
    <button class="btn btn-primary" onclick="closeModal()">Close</button>`;
  openModal();
}

let serviceAssistantQuestions = 0;
const SERVICE_ASSISTANT_MAX_QUESTIONS = 3;

function showServiceChatbot(){
  serviceAssistantQuestions = 0;
  document.getElementById("modalContent").innerHTML=`
    <h2>🤖 Beacon Service Assistant</h2>
    <p class="text-muted">Ask about the services offered on this platform. You may ask up to <strong>3 questions</strong>.</p>
    <div id="chatWindow" class="chat-window"><div class="chat-msg chat-bot"><strong>Assistant:</strong> Hello! I can explain telemedicine, physical booking, NCD medicine refills, pharmacy delivery, laboratory services and home services. You may ask up to 3 questions.</div></div>
    <form id="serviceChatForm" onsubmit="sendServiceChat(event)" class="flex"><input id="chatInput" class="form-control" placeholder="e.g. How do I book a physical visit?" required style="flex:1"><button id="chatSendBtn" class="btn btn-primary">Send</button></form>
    <div id="chatQuestionCount" class="small text-muted" style="margin-top:8px">Questions remaining: 3</div>
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>`;
  openModal();
}

function serviceBotReply(q){
  const x=q.toLowerCase();
  if(x.includes("physical")||x.includes("hospital booking")||x.includes("visit")) return "Patients can book a physical hospital visit from Appointments. Choose Physical Hospital Visit, select a doctor, date and time, then complete the displayed payment step.";
  if(x.includes("telemedicine")||x.includes("video")||x.includes("audio")) return "Telemedicine appointments support video or audio consultations. Confirmed paid appointments appear under Consultation.";
  if(x.includes("refill")||x.includes("ncd")||x.includes("diabetes")||x.includes("hypertension")) return "Patients with ongoing NCD treatment can request a medicine refill without a consultation. The refill creates a pharmacy order; the patient pays for medicine and the delivery fee only.";
  if(x.includes("laboratory")||x.includes("lab")||x.includes("test")) return "Laboratory requests are created by doctors. Patients can view laboratory requests and results, but cannot request a test themselves.";
  if(x.includes("medicine")||x.includes("pharmacy")||x.includes("delivery")) return "Doctor prescriptions go to the pharmacy. The pharmacy checks stock, the patient pays for medicine, then the pharmacist calls the patient to confirm the delivery location and fee. The patient pays the delivery fee, after which the pharmacist assigns a rider and dispatches the order.";
  if(x.includes("home")||x.includes("wound")) return "Home services include wound dressing, home nursing, injection/medication administration, vital signs checks and sample collection.";
  if(x.includes("password")||x.includes("forgot")) return "Use the Forgot Password button on the login page and provide the registered email and phone number.";
  return "I can help with telemedicine, physical appointments, NCD refills, pharmacy/delivery, laboratory services, home services and password resets. What would you like to know?";
}

function sendServiceChat(e){
  e.preventDefault();
  const input=document.getElementById("chatInput");
  const sendBtn=document.getElementById("chatSendBtn");
  const form=document.getElementById("serviceChatForm");
  const counter=document.getElementById("chatQuestionCount");
  const box=document.getElementById("chatWindow");
  if(!input || !box) return;
  if(serviceAssistantQuestions >= SERVICE_ASSISTANT_MAX_QUESTIONS){
    return;
  }
  const q=input.value.trim();
  if(!q) return;

  serviceAssistantQuestions++;
  box.innerHTML+=`<div class="chat-msg chat-user">${escapeHTML(q)}</div>`;

  let reply=serviceBotReply(q);
  if(serviceAssistantQuestions >= SERVICE_ASSISTANT_MAX_QUESTIONS){
    reply += "<br><br>Thank you for using the Beacon of Hope Hospital Service Assistant. For further questions or personalised medical assistance, please visit Beacon of Hope Hospital at Ongata Rongai, Beacon of Hope Centre, Off Magadi Rd, Along Gataka Rd, or contact us on 0720876123 / hospital@beaconafrica.org.";
  }

  box.innerHTML+=`<div class="chat-msg chat-bot"><strong>Assistant:</strong> ${reply}</div>`;
  input.value="";

  const remaining=SERVICE_ASSISTANT_MAX_QUESTIONS-serviceAssistantQuestions;
  if(counter) counter.textContent=remaining>0 ? `Questions remaining: ${remaining}` : "Question limit reached. Please visit Beacon of Hope Hospital for further assistance.";

  if(serviceAssistantQuestions >= SERVICE_ASSISTANT_MAX_QUESTIONS){
    input.disabled=true;
    input.placeholder="Question limit reached";
    if(sendBtn) sendBtn.disabled=true;
    if(form) form.setAttribute("aria-disabled","true");
  }
  box.scrollTop=box.scrollHeight;
}

/* Patient navigation: no prescription-management section. */
function buildSidebar(){
  let html=`<div class="sidebar-section">Main</div><button data-page="dashboard" onclick="navigate('dashboard')">🏠 Dashboard</button>`;
  if(currentUser.role==="patient"){
    html+=`<div class="sidebar-section">Healthcare</div>
      <button data-page="appointments" onclick="navigate('appointments')">📅 Appointments / Booking</button>
      <button data-page="consultation" onclick="navigate('consultation')">🎥 Consultation</button>
      <button data-page="pharmacy" onclick="navigate('pharmacy')">💊 Pharmacy Orders</button>
      <button data-page="laboratory" onclick="navigate('laboratory')">🧪 Laboratory Results</button>
      <button data-page="home-services" onclick="navigate('home-services')">🏠 Home Services</button>
      <button data-page="deliveries" onclick="navigate('deliveries')">🚚 Delivery Status</button>
      <button data-page="invoices" onclick="navigate('invoices')">💳 Payments</button>
      <button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>`;
  } else if(currentUser.role==="doctor"){
    html+=`<div class="sidebar-section">Doctor</div>
      <button data-page="appointments" onclick="navigate('appointments')">📅 Appointments</button>
      <button data-page="consultation" onclick="navigate('consultation')">🎥 Consultation</button>
      <button data-page="prescriptions" onclick="navigate('prescriptions')">💊 Prescriptions</button>
      <button data-page="laboratory" onclick="navigate('laboratory')">🧪 Laboratory Requests</button>
      <button data-page="doctor-settings" onclick="navigate('doctor-settings')">⚙️ Booking Capacity</button>
      <button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>`;
  } else if(currentUser.role==="pharmacist"){
    html+=`<div class="sidebar-section">Pharmacy</div>
      <button data-page="pharmacy" onclick="navigate('pharmacy')">💊 Pharmacy Orders & Dispatch</button>
      <button data-page="inventory" onclick="navigate('inventory')">📦 Inventory</button>
      <button data-page="deliveries" onclick="navigate('deliveries')">🚚 Deliveries</button>
      <button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>`;
  } else if(currentUser.role==="rider"){
    html+=`<div class="sidebar-section">Delivery</div><button data-page="deliveries" onclick="navigate('deliveries')">🚚 My Deliveries</button><button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>`;
  } else if(currentUser.role==="nurse"){
    html+=`<div class="sidebar-section">Clinical Home Care</div><button data-page="home-services" onclick="navigate('home-services')">🏠 Home Services</button><button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>`;
  } else if(currentUser.role==="admin"){
    html+=`<div class="sidebar-section">Administration</div><button data-page="users" onclick="navigate('users')">👥 Users</button><button data-page="admin-orders" onclick="navigate('admin-orders')">📦 Orders</button><button data-page="pharmacy" onclick="navigate('pharmacy')">💊 Pharmacy</button><button data-page="laboratory" onclick="navigate('laboratory')">🧪 Laboratory</button><button data-page="home-services" onclick="navigate('home-services')">🏠 Home Services</button><button data-page="reports" onclick="navigate('reports')">📊 Reports</button><button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>`;
  }
  html+=`<div class="sidebar-section">Account</div><button data-page="profile" onclick="navigate('profile')">👤 My Profile</button>`;
  document.getElementById("sidebar").innerHTML=html;
}

function navigate(page){
  if(currentUser && currentUser.role==="patient" && page==="prescriptions") page="pharmacy";
  currentPage=page;
  document.querySelectorAll(".sidebar button[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  document.getElementById("sidebar")?.classList.remove("open");
  const pages={dashboard:renderDashboard,appointments:renderAppointments,consultation:renderConsultation,prescriptions:renderPrescriptions,pharmacy:renderPharmacy,inventory:renderInventory,deliveries:renderDeliveries,invoices:renderInvoices,laboratory:renderLaboratory,"home-services":renderHomeServices,"admin-orders":renderAdminOrders,users:renderUsers,"doctor-settings":renderDoctorSettings,"rider-map":renderRiderMap,notifications:renderNotifications,profile:renderProfile,reports:renderReports};
  try{ (pages[page]||renderDashboard)(); }catch(err){ console.error(err); document.getElementById("content").innerHTML=`<div class="card"><div class="alert alert-danger"><strong>Unable to load this page.</strong><br>${escapeHTML(err.message||"Unknown error")}</div><button class="btn btn-primary" onclick="navigate('dashboard')">Return to Dashboard</button></div>`; }
}

/* Patient appointments: telemedicine OR physical hospital booking, plus rescheduling. */
function renderAppointments(){
  const mine=currentUser.role==="patient"?db.appointments.filter(a=>a.patientId===currentUser.id):db.appointments.filter(a=>a.doctorId===currentUser.id);
  document.getElementById("content").innerHTML=`<h1 class="page-title">Appointments ${currentUser.role==="patient"?`<button class="btn btn-primary" onclick="showBookingForm()">+ Book Appointment</button>`:""}</h1>
  <div class="alert alert-info">Appointments are limited to 45 minutes. Patients may book telemedicine consultations or physical hospital visits. Future patient appointments can be rescheduled to a later available date/time.</div>
  <div class="card"><div class="table-wrap"><table><thead><tr><th>Date</th><th>Time</th><th>Patient</th><th>Doctor</th><th>Specialty</th><th>Type</th><th>Status</th><th>Action</th></tr></thead><tbody>${mine.length?mine.map(a=>{const p=getUser(a.patientId),d=getUser(a.doctorId);const canRes=currentUser.role==="patient"&&a.patientId===currentUser.id&&!['Completed','Cancelled'].includes(a.status);return `<tr><td>${a.date}</td><td>${a.time}–${a.endTime||addMinutesToTime(a.time,45)}</td><td>${escapeHTML(p?.name||'-')}</td><td>${escapeHTML(d?.name||'-')}</td><td>${escapeHTML(a.specialty||d?.specialty||'-')}</td><td>${escapeHTML(a.type||'Telemedicine')}</td><td><span class="badge ${a.status==='Confirmed'?'badge-success':a.status==='Pending Payment'?'badge-warning':'badge-info'}">${escapeHTML(a.status==='Confirmed' && a.paymentStatus==='Paid' ? 'PAID / CONFIRMED' : a.status)}</span></td><td>${a.status==='Confirmed'&&a.type!=='Physical Hospital Visit'?`<button class="btn btn-primary" onclick="joinConsultation('${a.id}')">Join</button>`:''}${canRes?`<button class="btn btn-secondary" onclick="showRescheduleForm('${a.id}')">Reschedule</button>`:''}</td></tr>`}).join(''):`<tr><td colspan="8"><div class="empty">No appointments booked.</div></td></tr>`}</tbody></table></div></div>`;
}

function doctorProviderBusy(doctorId,date,time,excludeId=""){
  if(!doctorId||!date||!time) return false;
  const requestedStart=timeToMinutes(time);
  const requestedEnd=requestedStart+45;
  return db.appointments.some(a=>{
    if(a.id===excludeId || a.doctorId!==doctorId || a.date!==date || a.status==="Cancelled") return false;
    const start=timeToMinutes(a.time);
    const end=timeToMinutes(a.endTime||addMinutesToTime(a.time,45));
    return overlap(requestedStart,requestedEnd,start,end);
  });
}

function updateDoctorProviderAvailability(){
  const select=document.getElementById("bookDoctor");
  if(!select) return;
  const date=document.getElementById("bookDate")?.value||"";
  const time=document.getElementById("bookTime")?.value||"";
  const specialty=document.getElementById("bookSpecialty")?.value||"";
  const current=select.value;
  const doctors=db.users.filter(u=>u.role==="doctor"&&u.enabled&&(!specialty||u.specialty===specialty));
  select.innerHTML=`<option value="">Select doctor</option>`+doctors.map(d=>{
    const busy=date&&time ? doctorProviderBusy(d.id,date,time) : false;
    return `<option value="${d.id}" ${current===d.id&&!busy?"selected":""} ${busy?"disabled":""}>${escapeHTML(d.name)} — ${escapeHTML(d.specialty||"General Doctor")} — ${busy?"Busy":"Available"}</option>`;
  }).join("");
  if(current && doctorProviderBusy(current,date,time)) select.value="";
}

function showBookingForm(){
  const doctors=db.users.filter(u=>u.role==="doctor"&&u.enabled);
  const consultationServices=getActiveServices("Telemedicine / Consultation");
  document.getElementById("modalContent").innerHTML=`<h2>Book an Appointment</h2>
  <div class="alert alert-info"><strong>Consultation & follow-up fees</strong><br>
    Please select the service you require. The applicable fee will be shown before you confirm the booking.
    <div style="margin-top:10px"><strong>• Consultation/follow-up (15–30 minutes): KES 500</strong><br>
    <strong>• Telemedicine + review of home BP/glucose readings: KES 500–750</strong><br>
    <strong>• Physiotherapy virtual follow-up: KES 750</strong><br>
    <strong>• Nursing/caregiver virtual consultation: KES 500</strong></div>
  </div>
  <div class="alert alert-warning"><strong>45-minute scheduling rule:</strong> appointments are scheduled in 45-minute slots to prevent overlapping bookings.</div>
  <form onsubmit="createAppointment(event)">
    <div class="form-group"><label>Appointment Type</label><select id="bookType" class="form-control" required><option>Video Consultation</option><option>Audio Consultation</option><option>Physical Hospital Visit</option></select></div>
    <div class="form-group"><label>Consultation / Follow-up Service</label><select id="bookConsultationService" class="form-control" onchange="updateConsultationFeeDisplay()" required>
      <option value="">Select service</option>
      ${consultationServices.map((x,i)=>`<option value="${i}">${escapeHTML(x.name)} — ${x.priceLabel||money(x.price)}</option>`).join("")}
    </select></div>
    <div id="consultationFeeDisplay" class="alert alert-info" style="display:none"></div>
    <div class="form-group"><label>Clinical Provider / Doctor / Clinician</label><select id="bookDoctor" class="form-control" onchange="updateDoctorProviderAvailability()" required><option value="">Select doctor</option>${doctors.map(d=>`<option value="${d.id}">${escapeHTML(d.name)} — ${escapeHTML(d.specialty||'General Doctor')} — Available</option>`).join('')}</select><div class="small text-muted" style="margin-top:6px">A provider who is already booked for the selected time is shown as <strong>Busy</strong>. Other providers remain available for the same time.</div></div>
    <div class="form-group"><label>Specialty</label><select id="bookSpecialty" class="form-control" onchange="updateDoctorProviderAvailability()"><option value="">All specialties</option>${SPECIALTIES.map(s=>`<option>${escapeHTML(s)}</option>`).join('')}</select></div>
    <div class="grid grid-2"><div class="form-group"><label>Date</label><input id="bookDate" type="date" min="${today()}" class="form-control" onchange="updateDoctorProviderAvailability()" required></div><div class="form-group"><label>Start Time</label><input id="bookTime" type="time" min="08:00" max="17:00" class="form-control" onchange="updateDoctorProviderAvailability()" required></div></div>
    <div class="form-group"><label>Reason / Notes (optional)</label><textarea id="bookReason" class="form-control" rows="3" placeholder="Brief reason for the visit"></textarea></div>
    <button class="btn btn-primary">Book Appointment</button><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
  </form>`;
  openModal();
  applyHospitalBookingWindow("bookDate","bookTime");
}

function updateConsultationFeeDisplay(){
  const select=document.getElementById("bookConsultationService");
  const box=document.getElementById("consultationFeeDisplay");
  if(!select||!box) return;
  const services=getActiveServices("Telemedicine / Consultation");
  const item=services[Number(select.value)];
  if(!item){box.style.display="none";return;}
  box.style.display="block";
  box.innerHTML=`<strong>Selected service:</strong> ${escapeHTML(item.name)}<br><strong>Fee:</strong> ${item.label}`;
}

function createAppointment(e){
  e.preventDefault();
  const doctorId=document.getElementById("bookDoctor").value,date=document.getElementById("bookDate").value,time=document.getElementById("bookTime").value,type=document.getElementById("bookType").value;
  const consultationServices=getActiveServices("Telemedicine / Consultation");
  const serviceIndex=Number(document.getElementById("bookConsultationService")?.value);
  const consultationService=consultationServices[serviceIndex];
  if(!doctorId||!date||!time||!consultationService){alert("Please select the consultation/follow-up service, doctor, date and time.");return;}
  if(!validateHospitalBookingWindow(date,time,"appointment")) return;
  const doctor=getUser(doctorId); if(!doctor){alert("Doctor not found.");return;}
  if(doctorProviderBusy(doctorId,date,time)){alert("This provider is Busy at the selected time. Please choose another available provider or a different time.");return;}
  const max=getDoctorMaxBookings(doctorId,date), apps=getDoctorAppointments(doctorId,date);
  if(apps.length>=max){alert(`This doctor has reached the maximum of ${max} bookings for ${date}.`);return;}
  const start=timeToMinutes(time),end=start+45;
  if(apps.some(a=>overlap(start,end,timeToMinutes(a.time),timeToMinutes(a.endTime||addMinutesToTime(a.time,45))))){const next=findNextAvailable(doctorId,date,time);alert(`That time overlaps another appointment. ${next?`Next available start: ${next}.`:'No later slot is available today.'}`);return;}
  const patientConflict=db.appointments.find(a=>a.patientId===currentUser.id&&a.date===date&&a.status!=="Cancelled"&&overlap(start,end,timeToMinutes(a.time),timeToMinutes(a.endTime||addMinutesToTime(a.time,45))));
  if(patientConflict){alert("You already have another appointment during this time.");return;}
  const appointment={id:uid("appointment"),patientId:currentUser.id,doctorId,specialty:doctor.specialty||"General Doctor",date,time,endTime:addMinutesToTime(time,45),durationMinutes:45,type,consultationService:consultationService.name,consultationFee:consultationService.price,reason:document.getElementById("bookReason")?.value||"",status:"Pending Payment",createdAt:new Date().toISOString()};
  db.appointments.push(appointment);
  const invoice={id:uid("invoice"),invoiceNumber:invoiceNumber(type==="Physical Hospital Visit"?"PHYS":"CONS"),type:"Consultation",appointmentId:appointment.id,patientId:currentUser.id,items:[{description:`${consultationService.name} — ${doctor.specialty||'General Doctor'}`,quantity:1,unitPrice:Number(consultationService.price)}],total:Number(consultationService.price),status:"Pending",paymentMethod:null,transactionReference:null,createdAt:new Date().toISOString()};
  db.invoices.push(invoice);
  notify(currentUser.id,`${type} booked for ${date} at ${time}. Please pay invoice ${invoice.invoiceNumber}.`);
  notify(doctorId,`New ${type.toLowerCase()} booking request for ${date} at ${time}.`);
  notifyAllAdmins(`NEW BOOKING: ${currentUser.name} booked ${type} for ${date} at ${time} with ${doctor.name}.`);
  saveDB(); closeModal(); alert(`Appointment booked for ${date} at ${time}. Please complete payment.`); navigate("invoices");
}

function showRescheduleForm(id){
  const a=db.appointments.find(x=>x.id===id); if(!a||a.patientId!==currentUser.id){alert("Appointment not found.");return;}
  document.getElementById("modalContent").innerHTML=`<h2>Reschedule Appointment</h2><p class="text-muted">Current: ${a.date} at ${a.time}. Choose a later date and time.</p><form onsubmit="rescheduleAppointment(event,'${a.id}')"><div class="grid grid-2"><div class="form-group"><label>New Date</label><input id="resDate" type="date" min="${today()}" class="form-control" required></div><div class="form-group"><label>New Start Time</label><input id="resTime" type="time" min="08:00" max="17:00" class="form-control" required></div></div><button class="btn btn-primary">Save New Time</button><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button></form>`;openModal(); applyHospitalBookingWindow("resDate","resTime");
}
function rescheduleAppointment(e,id){
  e.preventDefault(); const a=db.appointments.find(x=>x.id===id); if(!a)return; const d=document.getElementById("resDate").value,t=document.getElementById("resTime").value;
  if(!validateHospitalBookingWindow(d,t,"rescheduled appointment")) return;
  const oldStamp=new Date(`${a.date}T${a.time}`),newStamp=new Date(`${d}T${t}`); if(newStamp<=oldStamp){alert("Please choose a later date/time than the current appointment.");return;}
  const apps=db.appointments.filter(x=>x.doctorId===a.doctorId&&x.date===d&&x.id!==a.id&&x.status!=="Cancelled"); const st=timeToMinutes(t),en=st+45;
  if(apps.some(x=>overlap(st,en,timeToMinutes(x.time),timeToMinutes(x.endTime||addMinutesToTime(x.time,45))))){alert("The doctor is already booked for that time.");return;}
  a.date=d;a.time=t;a.endTime=addMinutesToTime(t,45);a.rescheduledAt=new Date().toISOString();a.status=a.status==="Confirmed"?"Confirmed":"Pending Payment";
  notify(a.doctorId,`Appointment rescheduled to ${d} at ${t}.`);notifyAllAdmins(`APPOINTMENT RESCHEDULED: ${currentUser.name}'s appointment is now ${d} at ${t}.`);saveDB();closeModal();alert("Appointment rescheduled successfully.");navigate("appointments");
}

/* Patients can view lab results, but only doctors create lab requests. */
function showLabForm(){
  if(currentUser.role!=="doctor"){alert("Only doctors can request laboratory tests.");return;}
  originalShowLabForm();
}

function renderLaboratory(){
  const requests=currentUser.role==="patient"?db.labRequests.filter(l=>l.patientId===currentUser.id):db.labRequests;
  document.getElementById("content").innerHTML=`<h1 class="page-title">Laboratory</h1>${currentUser.role==="doctor"?`<div class="alert alert-info">Only doctors can request laboratory tests. Patients can view results here.</div><button class="btn btn-primary" onclick="showLabForm()">+ Request Laboratory Test</button>`:currentUser.role==="patient"?`<div class="alert alert-info">Laboratory requests are made by your doctor. You can view results here once available.</div>`:''}<div class="card"><div class="table-wrap"><table><thead><tr><th>Request</th><th>Patient</th><th>Test</th><th>Status</th><th>Result</th><th>Action</th></tr></thead><tbody>${requests.length?requests.map(r=>{const p=getUser(r.patientId);return `<tr><td>${r.id}</td><td>${escapeHTML(p?.name||'-')}</td><td>${escapeHTML(r.testName)}</td><td>${escapeHTML(r.status)}</td><td>${r.result?'Result Available':'Pending'}</td><td>${currentUser.role==="doctor"&&r.status!=="Completed"?`<button class="btn btn-primary" onclick="processLab('${r.id}')">Process</button>`:''}${currentUser.role==="patient"&&r.result?`<button class="btn btn-success" onclick="viewLabResult('${r.id}')">View Result</button>`:''}</td></tr>`}).join(''):`<tr><td colspan="6"><div class="empty">No laboratory requests.</div></td></tr>`}</tbody></table></div></div>`;
}

/* NCD medicine refill: no consultation fee; only medicine and delivery invoices. */
function showRefillForm(){
  const meds=db.inventory.filter(m=>m.quantity>0&&new Date(m.expiry)>=new Date());
  document.getElementById("modalContent").innerHTML=`<h2>💊 NCD Medicine Refill</h2><div class="alert alert-info">For ongoing NCD medicines. No consultation is required. You pay only for the medicine and delivery fee.</div><form onsubmit="createRefillRequest(event)"><div class="form-group"><label>Medicine</label><select id="refillMedicine" class="form-control" required>${meds.map(m=>`<option value="${m.id}">${escapeHTML(m.name)} — ${money(m.price)} each</option>`).join('')}</select></div><div class="form-group"><label>Quantity</label><input id="refillQty" type="number" min="1" value="1" class="form-control" required></div><div class="form-group"><label>Condition / Refill Note</label><textarea id="refillNote" class="form-control" placeholder="e.g. Diabetes / hypertension maintenance refill"></textarea></div><button class="btn btn-primary">Submit Refill Request</button><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button></form>`;openModal();
}
function createRefillRequest(e){
  e.preventDefault(); const med=db.inventory.find(m=>m.id===document.getElementById("refillMedicine").value),qty=Number(document.getElementById("refillQty").value); if(!med||qty<1||med.quantity<qty){alert("Selected quantity is not available.");return;}
  const order={id:uid("refill"),patientId:currentUser.id,prescriptionId:null,type:"NCD Refill",items:[{medicineName:med.name,quantity:qty,dosage:"As previously prescribed",frequency:"As previously prescribed",duration:"Refill"}],status:"Pending",createdAt:new Date().toISOString(),refillNote:document.getElementById("refillNote").value};
  db.pharmacyOrders.push(order);db.refillRequests.push(order);saveDB();
  notify(currentUser.id,"Your NCD medicine refill request has been sent to the pharmacy.");
  db.users.filter(u=>u.role==="pharmacist"&&u.enabled).forEach(p=>notify(p.id,`New NCD refill request ${order.id} requires stock processing.`));
  notifyAllAdmins(`NCD REFILL: ${currentUser.name} submitted refill request ${order.id}.`);
  closeModal();alert("Refill request submitted. You will be notified when the pharmacy invoice is ready.");navigate("pharmacy");
}

function renderPatientDashboard(){
  /* keep the existing dashboard style but add the refill action */
  if(typeof originalRenderPatientDashboard==="function") originalRenderPatientDashboard();
  const content=document.getElementById("content");
  if(currentUser.role!=="patient") return;
  const card=document.createElement("div"); card.className="card"; card.innerHTML=`<h3>Medicine Refill</h3><p class="text-muted">For ongoing NCD medicines such as diabetes or hypertension treatment. No consultation is required.</p><button class="btn btn-primary" onclick="showRefillForm()">💊 Request NCD Refill</button>`; content.appendChild(card);
}

/* Clinical notes are saved during the consultation and are visible to the doctor/patient in the consultation record. */
function joinConsultation(appointmentId){
  const a=db.appointments.find(x=>x.id===appointmentId); if(!a||a.status!=="Confirmed"){alert("This consultation has not been confirmed.");return;}
  const existing=db.consultations.find(c=>c.appointmentId===appointmentId);
  document.getElementById("modalContent").innerHTML=`<h2>Telemedicine Consultation</h2><div class="alert alert-success">${a.date} ${a.time}–${a.endTime}<br>Maximum duration: <strong>45 minutes</strong>.</div><div class="grid grid-2"><div class="card"><h3>Video / Audio</h3><div style="height:230px;background:#0F172A;border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;font-size:50px">🎥</div><br><button class="btn btn-primary" onclick="startCamera()">📹 Camera</button><button class="btn btn-secondary" onclick="startMicrophone()">🎤 Microphone</button></div><div class="card"><h3>Consultation</h3><div id="consultTimer" style="font-size:34px;font-weight:bold;color:#0A5DB0">45:00</div><textarea id="consultChat" class="form-control" rows="4" placeholder="Consultation chat..."></textarea>${currentUser.role==="doctor"?`<label style="margin-top:12px">Clinical Notes</label><textarea id="clinicalNotes" class="form-control" rows="6" placeholder="History, examination, assessment, plan...">${escapeHTML(existing?.clinicalNotes||'')}</textarea><button class="btn btn-secondary" onclick="saveClinicalNotes('${a.id}')">📝 Save Clinical Notes</button><br><button class="btn btn-success" onclick="endConsultation('${a.id}')">End Consultation & Prescribe</button>`:''}</div></div>`;openModal();
  let remaining=45*60; const key=appointmentId; if(consultIntervals[key])clearInterval(consultIntervals[key]); consultIntervals[key]=setInterval(()=>{const el=document.getElementById("consultTimer");if(!el){clearInterval(consultIntervals[key]);return;}remaining--;el.textContent=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`;if(remaining<=0){clearInterval(consultIntervals[key]);if(currentUser.role==="doctor")endConsultation(appointmentId,true);}},1000);
}
function saveClinicalNotes(appointmentId){
  const a=db.appointments.find(x=>x.id===appointmentId);if(!a||currentUser.role!=="doctor")return;let c=db.consultations.find(x=>x.appointmentId===appointmentId);if(!c){c={id:uid("consultation"),appointmentId,patientId:a.patientId,doctorId:a.doctorId,createdAt:new Date().toISOString(),durationMinutes:0};db.consultations.push(c);}c.clinicalNotes=document.getElementById("clinicalNotes")?.value||"";c.updatedAt=new Date().toISOString();saveDB();notify(a.patientId,"Your doctor has updated the clinical notes for your consultation.");alert("Clinical notes saved.");}
function endConsultation(appointmentId,autoEnd=false){
  const a=db.appointments.find(x=>x.id===appointmentId);if(!a)return;if(consultIntervals[appointmentId]){clearInterval(consultIntervals[appointmentId]);delete consultIntervals[appointmentId];}
  let c=db.consultations.find(x=>x.appointmentId===appointmentId);if(!c){c={id:uid("consultation"),appointmentId,patientId:a.patientId,doctorId:a.doctorId,createdAt:new Date().toISOString(),durationMinutes:45};db.consultations.push(c);}if(currentUser.role==="doctor"){c.clinicalNotes=document.getElementById("clinicalNotes")?.value||c.clinicalNotes||"";c.durationMinutes=45;c.endedAt=new Date().toISOString();}a.status="Completed";saveDB();closeModal();notify(a.patientId,"Your consultation has ended. A prescription may now be processed by the pharmacy.");if(currentUser.role==="doctor"){showPrescriptionForm(a.patientId,a.id);}else if(!autoEnd)alert("Consultation completed.");
}

/* Pharmacy owns rider assignment and dispatch after both medicine and delivery fees are paid. */
function pharmacistDispatch(orderId){
  if(currentUser.role!=="pharmacist"){alert("Only the pharmacy can assign riders and dispatch medicine.");return;}
  const order=db.pharmacyOrders.find(o=>o.id===orderId);if(!order)return;
  const delivery=db.deliveries.find(d=>d.pharmacyOrderId===orderId);if(!delivery){alert("Delivery record not found.");return;}
  if(delivery.status!=="Paid - Awaiting Dispatch"){alert("Delivery fee must be paid before the pharmacy can dispatch this order.");return;}
  const riders=db.users.filter(u=>u.role==="rider"&&u.enabled);if(!riders.length){alert("No enabled riders are available.");return;}
  document.getElementById("modalContent").innerHTML=`<h2>Assign Rider & Dispatch</h2><p>Order: <strong>${escapeHTML(order.id)}</strong></p><div class="form-group"><label>Select Rider</label><select id="dispatchRider" class="form-control" required>${riders.map(r=>`<option value="${r.id}">${escapeHTML(r.name)} — ${escapeHTML(r.phone||'')}</option>`).join('')}</select></div><button class="btn btn-success" onclick="confirmPharmacyDispatch('${orderId}')">Assign & Dispatch</button><button class="btn btn-secondary" onclick="closeModal()">Cancel</button>`;openModal();
}
function confirmPharmacyDispatch(orderId){
  const order=db.pharmacyOrders.find(o=>o.id===orderId),delivery=db.deliveries.find(d=>d.pharmacyOrderId===orderId),rider=getUser(document.getElementById("dispatchRider").value);if(!order||!delivery||!rider)return;
  delivery.riderId=rider.id;delivery.status="Assigned";delivery.assignedAt=new Date().toISOString();order.status="Dispatched";order.dispatchedAt=new Date().toISOString();notify(order.patientId,`Your medicine order ${order.id} has been dispatched by the pharmacy and assigned to ${rider.name}.`);notify(rider.id,`You have been assigned medicine delivery ${order.id}.`);notifyAllAdmins(`PHARMACY DISPATCH: Order ${order.id} was assigned to rider ${rider.name} by the pharmacy.`);saveDB();closeModal();alert("Rider assigned and order dispatched successfully.");renderPharmacy();
}
function syncPaidPharmacyOrders(){
  db.pharmacyOrders.forEach(order=>{
    const medicineInvoice=db.invoices.find(i=>i.type==="Pharmacy"&&i.pharmacyOrderId===order.id);
    const delivery=db.deliveries.find(d=>d.pharmacyOrderId===order.id);
    if(!medicineInvoice || medicineInvoice.status!=="Paid") return;
    if(!delivery){ createDeliveryForOrder(order); return; }

    const deliveryInvoice=db.invoices.find(i=>i.type==="Delivery"&&i.deliveryId===delivery.id);
    const deliveryPaid=delivery.status==="Paid - Awaiting Dispatch" || delivery.deliveryPaymentStatus==="Paid" || (deliveryInvoice && deliveryInvoice.status==="Paid");
    if(deliveryPaid){
      delivery.status="Paid - Awaiting Dispatch";
      delivery.deliveryPaymentStatus="Paid";
      if(deliveryInvoice) delivery.deliveryInvoiceId=deliveryInvoice.id;
      order.deliveryId=delivery.id;
      order.deliveryPaymentStatus="Paid";
      order.status="Paid - Awaiting Pharmacist Dispatch";
      return;
    }

    const detailsComplete=String(delivery.deliveryLocation||"").trim() && String(delivery.directions||"").trim() && Number(delivery.deliveryFee||0)>0;
    if(!detailsComplete && !["Paid - Awaiting Dispatch","Ready for Admin Dispatch","Dispatched","Assigned","Picked Up","In Transit","Delivered"].includes(delivery.status)){
      delivery.status="Awaiting Delivery Details";
      order.status="Awaiting Delivery Details";
    } else if(delivery.status==="Awaiting Delivery Payment") order.status="Awaiting Delivery Payment";
  });
}

function renderPharmacy(){
  syncPaidPharmacyOrders();
  saveDB();
  const orders=currentUser.role==="patient"?db.pharmacyOrders.filter(o=>o.patientId===currentUser.id):db.pharmacyOrders;
  document.getElementById("content").innerHTML=`
    <h1 class="page-title">Pharmacy Orders</h1>
    ${currentUser.role==="patient"?`
      <div class="alert alert-info">After medicine payment, the pharmacist will call you to confirm the delivery location, directions and delivery fee. The delivery fee will then appear as a separate invoice.</div>
      <button class="btn btn-primary" onclick="showRefillForm()">💊 Request NCD Medicine Refill</button>`:currentUser.role==="pharmacist"?``:''}
    <div class="card"><div class="table-wrap"><table><thead><tr><th>Order</th><th>Patient</th><th>Type</th><th>Medicines</th><th>Status</th><th>Delivery Details</th><th>Action</th></tr></thead><tbody>
    ${orders.length?orders.map(o=>{
      const p=getUser(o.patientId);
      const delivery=db.deliveries.find(d=>d.pharmacyOrderId===o.id);
      const inv=db.invoices.find(i=>i.pharmacyOrderId===o.id&&i.type==="Pharmacy"&&i.status==="Pending");
      const dinv=delivery?db.invoices.find(i=>i.deliveryId===delivery.id&&i.status==="Pending"):null;
      const deliveryDetailsComplete=delivery &&
        String(delivery.deliveryLocation||"").trim() &&
        String(delivery.directions||"").trim() &&
        Number(delivery.deliveryFee||0)>0;
      const pharmacistNeedsDeliveryDetails=currentUser.role==="pharmacist" &&
        delivery &&
        !deliveryDetailsComplete &&
        !["Paid - Awaiting Dispatch","Ready for Admin Dispatch","Dispatched","Assigned","Picked Up","In Transit","Delivered"].includes(delivery.status);
      return `<tr>
        <td>${escapeHTML(o.id)}</td>
        <td>${escapeHTML(p?.name||'-')}</td>
        <td>${escapeHTML(o.type||'Prescription')}</td>
        <td>${o.items.map(i=>`${escapeHTML(i.medicineName)} × ${i.quantity}`).join('<br>')}</td>
        <td>${escapeHTML(o.status)}${delivery?`<br><span class="small">Delivery: ${escapeHTML(delivery.status)}</span>`:''}</td>
        <td>${delivery?`<div><strong>Location:</strong> ${escapeHTML(delivery.deliveryLocation||'Not confirmed')}<br><strong>Directions:</strong> ${escapeHTML(delivery.directions||'Not confirmed')}<br><strong>Receiver:</strong> ${escapeHTML(delivery.receiverPhone||p?.phone||'-')}<br><strong>Fee:</strong> ${delivery.deliveryFee!=null?money(delivery.deliveryFee):'-'}</div>`:'Not yet created'}</td>
        <td>
          ${currentUser.role==="pharmacist"&&o.status==="Pending"?`<button class="btn btn-primary" onclick="processPharmacyOrder('${o.id}')">Check Stock</button>`:''}
          ${currentUser.role==="patient"&&o.status==="Awaiting Pharmacy Payment"&&inv?`<button class="btn btn-success" onclick="payRelatedInvoice('${inv.id}'); return false;">Pay Medicine</button>`:''}
          ${pharmacistNeedsDeliveryDetails?`<button class="btn btn-primary" onclick="showDeliveryDetailsForm('${delivery.id}')">📍 Confirm Delivery Details</button>`:''}
          ${currentUser.role==="patient"&&delivery&&delivery.status==="Awaiting Delivery Payment"&&dinv?`<button class="btn btn-warning" onclick="payRelatedInvoice('${dinv.id}'); return false;">Pay Delivery Fee</button>`:''}
          ${currentUser.role==="pharmacist"&&delivery&&delivery.status==="Paid - Awaiting Dispatch"?`<button class="btn btn-success" onclick="pharmacistDispatch('${o.id}')">Assign Rider & Dispatch</button>`:''}
        </td>
      </tr>`;
    }).join(''):`<tr><td colspan="7"><div class="empty">No pharmacy orders.</div></td></tr>`}
    </tbody></table></div></div>`;
}

/* Patients may never access prescription management directly. */
function renderPrescriptions(){
  if(currentUser.role==="patient"){navigate("pharmacy");return;}
  const list=db.prescriptions.filter(p=>currentUser.role==="doctor"?p.doctorId===currentUser.id:true);
  document.getElementById("content").innerHTML=`<h1 class="page-title">Prescriptions</h1><div class="card"><div class="table-wrap"><table><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Medicine</th><th>Pharmacy Status</th></tr>${list.length?list.map(p=>{const patient=getUser(p.patientId),doctor=getUser(p.doctorId),order=db.pharmacyOrders.find(o=>o.prescriptionId===p.id);return `<tr><td>${escapeHTML(patient?.name||'-')}</td><td>${escapeHTML(doctor?.name||'-')}</td><td>${new Date(p.createdAt).toLocaleString()}</td><td>${p.items.map(i=>`${escapeHTML(i.medicineName)} × ${i.quantity}`).join('<br>')}</td><td>${escapeHTML(order?.status||'-')}</td></tr>`}).join(''):`<tr><td colspan="5"><div class="empty">No prescriptions.</div></td></tr>`}</table></div></div>`;
}

/* Keep an internal reference to the original patient dashboard after the override is installed. */


function renderAdminOrders(){
  if(currentUser.role!=="admin"){navigate("dashboard");return;}
  const deliveries=db.deliveries.slice().reverse();
  document.getElementById("content").innerHTML=`<h1 class="page-title">Order & Delivery Monitoring</h1><div class="alert alert-info">The administrator can monitor payment and delivery status. Rider assignment and dispatch are handled by the pharmacy.</div><div class="card"><div class="table-wrap"><table><thead><tr><th>Delivery</th><th>Order</th><th>Patient</th><th>Delivery Fee</th><th>Status</th><th>Rider</th></tr></thead><tbody>${deliveries.length?deliveries.map(d=>{const p=getUser(d.patientId),r=getUser(d.riderId);return `<tr><td>${d.id}</td><td>${escapeHTML(d.pharmacyOrderId||'-')}</td><td>${escapeHTML(p?.name||'-')}</td><td>${money(d.deliveryFee||0)}</td><td>${escapeHTML(d.status||'-')}</td><td>${escapeHTML(r?.name||'Not yet assigned by pharmacy')}</td></tr>`}).join(''):`<tr><td colspan="6"><div class="empty">No deliveries yet.</div></td></tr>`}</tbody></table></div></div>`;
}

function assignRider(){
  alert("Rider assignment is handled by the pharmacy after the delivery fee has been paid.");
}

/* =========================================================
ADMIN REPORTS
========================================================= */

function renderReports(){

  if(currentUser.role!=="admin"){navigate("dashboard");return;}

  document.getElementById("content").innerHTML=`

    <h1 class="page-title">Reports</h1>

    <div class="alert alert-info">
      Choose a date range (optional) and generate a report.
      Reports can be viewed here and downloaded as CSV.
    </div>

    <div class="card">
      <div class="grid grid-3">
        <div class="form-group">
          <label>From Date</label>
          <input id="reportFrom" type="date" class="form-control">
        </div>
        <div class="form-group">
          <label>To Date</label>
          <input id="reportTo" type="date" class="form-control">
        </div>
        <div class="form-group">
          <label>Report Type</label>
          <select id="reportType" class="form-control">
            <option value="financial">Financial Summary (Invoices)</option>
            <option value="appointments">Appointments</option>
            <option value="pharmacy">Pharmacy Orders</option>
            <option value="deliveries">Deliveries</option>
            <option value="home-services">Home Services</option>
            <option value="laboratory">Laboratory Requests</option>
            <option value="users">Users</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary" onclick="generateReport()">Generate Report</button>
    </div>

    <div id="reportOutput"></div>

  `;
}

function reportDateFilter(dateStr,from,to){

  if(!dateStr)return true;

  const d=dateStr.slice(0,10);

  if(from&&d<from)return false;
  if(to&&d>to)return false;

  return true;
}

function generateReport(){

  const from=document.getElementById("reportFrom").value;
  const to=document.getElementById("reportTo").value;
  const type=document.getElementById("reportType").value;

  let rows=[],columns=[],title="";

  if(type==="financial"){

    title="Financial Summary";
    columns=["Invoice","Type","Patient","Total (KES)","Status","Created"];

    rows=db.invoices
      .filter(i=>reportDateFilter(i.createdAt,from,to))
      .map(i=>{
        const p=getUser(i.patientId);
        return [i.invoiceNumber,i.type,p?.name||"-",i.total,i.status,new Date(i.createdAt).toLocaleString()];
      });

  }else if(type==="appointments"){

    title="Appointments";
    columns=["Date","Time","Patient","Doctor","Specialty","Type","Status"];

    rows=db.appointments
      .filter(a=>reportDateFilter(a.date,from,to))
      .map(a=>{
        const p=getUser(a.patientId),d=getUser(a.doctorId);
        return [a.date,a.time,p?.name||"-",d?.name||"-",a.specialty||"-",a.type||"-",a.status];
      });

  }else if(type==="pharmacy"){

    title="Pharmacy Orders";
    columns=["Order","Patient","Type","Medicines","Status","Created"];

    rows=db.pharmacyOrders
      .filter(o=>reportDateFilter(o.createdAt,from,to))
      .map(o=>{
        const p=getUser(o.patientId);
        return [o.id,p?.name||"-",o.type||"Prescription",o.items.map(i=>`${i.medicineName} x${i.quantity}`).join("; "),o.status,new Date(o.createdAt).toLocaleString()];
      });

  }else if(type==="deliveries"){

    title="Deliveries";
    columns=["Delivery","Order","Patient","Rider","Location","Receiver Phone","Fee (KES)","Status","Created"];

    rows=db.deliveries
      .filter(d=>reportDateFilter(d.createdAt,from,to))
      .map(d=>{
        const p=getUser(d.patientId),r=getUser(d.riderId);
        return [d.id,d.pharmacyOrderId||"-",p?.name||"-",r?.name||"-",d.deliveryLocation||"-",d.receiverPhone||p?.phone||"-",d.deliveryFee||0,d.status,new Date(d.createdAt).toLocaleString()];
      });

  }else if(type==="home-services"){

    title="Home Services";
    columns=["Request","Patient","Service","Date","Total (KES)","Status"];

    rows=db.homeServices
      .filter(s=>reportDateFilter(s.createdAt,from,to))
      .map(s=>{
        const p=getUser(s.patientId);
        return [s.id,p?.name||"-",s.service,s.date,s.total,s.status];
      });

  }else if(type==="laboratory"){

    title="Laboratory Requests";
    columns=["Request","Patient","Test","Status","Created"];

    rows=db.labRequests
      .filter(l=>reportDateFilter(l.createdAt,from,to))
      .map(l=>{
        const p=getUser(l.patientId);
        return [l.id,p?.name||"-",l.testName,l.status,new Date(l.createdAt).toLocaleString()];
      });

  }else if(type==="users"){

    title="Users";
    columns=["Name","Email","Role","Specialty","Status"];

    rows=db.users.map(u=>[u.name,u.email,formatRole(u.role),u.specialty||"-",u.enabled?"Enabled":"Disabled"]);

  }

  window.__lastReport={title,columns,rows};

  const box=document.getElementById("reportOutput");

  let summaryHTML="";

  if(type==="financial"){

    const paidTotal=rows.filter(r=>r[4]==="Paid").reduce((sum,r)=>sum+Number(r[3]),0);

    summaryHTML=`<div class="alert alert-success"><strong>Total paid in range:</strong> ${money(paidTotal)} across ${rows.filter(r=>r[4]==="Paid").length} paid invoice(s).</div>`;

  }

  box.innerHTML=`

    <div class="card">

      <div class="page-title">
        <h3>${escapeHTML(title)} (${rows.length} record${rows.length===1?"":"s"})</h3>
        <button class="btn btn-secondary" onclick="downloadReportCSV()">⬇️ Download CSV</button>
      </div>

      ${summaryHTML}

      ${
        rows.length
        ?
        `<div class="table-wrap"><table><tr>${columns.map(c=>`<th>${escapeHTML(c)}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(v=>`<td>${escapeHTML(String(v))}</td>`).join("")}</tr>`).join("")}</table></div>`
        :
        `<div class="empty">No records found for this range.</div>`
      }

    </div>

  `;
}

function downloadReportCSV(){

  const report=window.__lastReport;

  if(!report||!report.rows.length){
    alert("Generate a report with results first.");
    return;
  }

  const escapeCsv=v=>{
    const s=String(v??"");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s;
  };

  const lines=[
    report.columns.map(escapeCsv).join(","),
    ...report.rows.map(r=>r.map(escapeCsv).join(","))
  ];

  const csv=lines.join("\r\n");

  const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});

  const url=URL.createObjectURL(blob);

  const a=document.createElement("a");

  a.href=url;
  a.download=report.title.toLowerCase().replace(/\s+/g,"-")+"-"+today()+".csv";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}


/* =========================================================
PATIENT MEDICINE PRIVACY OVERRIDES
Patients can see pharmacy/payment/delivery status, but never the
names, quantities, dosage or frequency of medicines prescribed by doctors.
Doctors and pharmacy staff retain access to the clinical/pharmacy details.
========================================================= */

const _originalRenderPharmacyForPrivacy = renderPharmacy;
renderPharmacy = function(){
  _originalRenderPharmacyForPrivacy();
  if(!currentUser || currentUser.role!=="patient") return;

  const table=document.querySelector("#content table");
  if(!table) return;

  const headers=[...table.querySelectorAll("thead th")];
  let medicineIndex=headers.findIndex(th=>th.textContent.trim().toLowerCase()==="medicines");
  if(medicineIndex<0){
    // Older table markup may not have THEAD. Find the header row instead.
    const firstRow=table.querySelector("tr");
    if(firstRow){
      const cells=[...firstRow.children];
      medicineIndex=cells.findIndex(c=>c.textContent.trim().toLowerCase()==="medicines");
    }
  }

  if(medicineIndex>=0){
    table.querySelectorAll("tr").forEach(row=>{
      if(row.children[medicineIndex]) row.children[medicineIndex].remove();
    });
  }
};

const _originalRenderPrescriptionsForPrivacy = renderPrescriptions;
renderPrescriptions = function(){
  if(currentUser && currentUser.role==="patient"){
    navigate("pharmacy");
    return;
  }
  _originalRenderPrescriptionsForPrivacy();
};

const _originalRenderInvoicesForPrivacy = renderInvoices;
renderInvoices = function(){
  _originalRenderInvoicesForPrivacy();
  if(!currentUser || currentUser.role!=="patient") return;

  const patientInvoices=db.invoices.filter(i=>i.patientId===currentUser.id);
  const rows=[...document.querySelectorAll("#content table tr")];

  // Pharmacy invoice descriptions are deliberately generic on the patient side.
  patientInvoices.forEach((invoice,index)=>{
    if(invoice.type!=="Pharmacy") return;
    const row=rows.find(r=>{
      const first=r.children[0];
      return first && first.textContent.trim()===String(invoice.invoiceNumber);
    });
    if(row && row.children[2]) row.children[2].textContent="Pharmacy medicine charges";
  });
};

const _originalBuildSidebarForPrivacy = buildSidebar;
buildSidebar = function(){
  _originalBuildSidebarForPrivacy();
  if(!currentUser || currentUser.role!=="patient") return;

  // Remove any prescription-management link from the patient sidebar.
  document.querySelectorAll('#sidebar button[data-page="prescriptions"]').forEach(btn=>btn.remove());
};

const _originalNavigateForPrivacy = navigate;
navigate = function(page){
  if(currentUser && currentUser.role==="patient" && page==="prescriptions"){
    page="pharmacy";
  }
  return _originalNavigateForPrivacy(page);
};


/* =========================================================
MANUAL DELIVERY WORKFLOW — GPS DISABLED
========================================================= */
function getPatientGPS(){ alert("GPS delivery tracking is currently disabled. The pharmacist will call to confirm your delivery location."); }
function startRiderGPS(){ alert("Rider GPS tracking is currently disabled. Call the receiver to confirm directions."); }
function stopRiderGPS(){ return; }
function trackDelivery(){ alert("Live GPS tracking is currently disabled. Please use the delivery address, directions and receiver phone number shown on the order."); }
function renderRiderMap(){ navigate("deliveries"); }

/* FINAL BOOKING HOURS RULE — ALL BOOKABLE SERVICES
   Monday-Saturday only; Sunday closed.
   Booking times: 08:00 through 17:00.
*/
const HOSPITAL_BOOKING_OPEN_MINUTES = 8 * 60;
const HOSPITAL_BOOKING_CLOSE_MINUTES = 17 * 60;

function validateHospitalBookingWindow(date,time,label="booking") {
  if(!date || !time) {
    alert("Please select a date and time for the " + label + ".");
    return false;
  }
  const day = new Date(`${date}T00:00:00`).getDay();
  if(day === 0) {
    alert("There are no services available on Sunday. Please select Monday to Saturday.");
    return false;
  }
  const minutes = timeToMinutes(time);
  if(!Number.isFinite(minutes) || minutes < HOSPITAL_BOOKING_OPEN_MINUTES || minutes > HOSPITAL_BOOKING_CLOSE_MINUTES) {
    alert("There are no services available at this time. Services are available from 8:00 AM to 5:00 PM, Monday to Saturday.");
    return false;
  }
  return true;
}

function applyHospitalBookingWindow(dateId,timeId) {
  const date=document.getElementById(dateId);
  const time=document.getElementById(timeId);
  const formGroup=time?.closest(".form-group") || date?.closest(".form-group");
  let message=document.getElementById(`${dateId}_bookingMessage`);
  if(!message && formGroup){
    message=document.createElement("div");
    message.id=`${dateId}_bookingMessage`;
    message.className="alert alert-warning";
    message.style.display="none";
    message.style.marginTop="8px";
    formGroup.appendChild(message);
  }

  function showBookingMessage(text){
    if(message){
      message.textContent=text;
      message.style.display="block";
    }
  }
  function clearBookingMessage(){
    if(message){
      message.textContent="";
      message.style.display="none";
    }
  }
  function checkWindow(){
    if(date?.value){
      const day=new Date(`${date.value}T00:00:00`).getDay();
      if(day===0){
        showBookingMessage("There are no services available on Sunday. Please select Monday to Saturday.");
        return false;
      }
    }
    if(time?.value){
      const minutes=timeToMinutes(time.value);
      if(!Number.isFinite(minutes) || minutes < HOSPITAL_BOOKING_OPEN_MINUTES || minutes > HOSPITAL_BOOKING_CLOSE_MINUTES){
        showBookingMessage("There are no services available at this time. Services are available from 8:00 AM to 5:00 PM, Monday to Saturday.");
        return false;
      }
    }
    clearBookingMessage();
    return true;
  }

  if(time){
    time.min="08:00";
    time.max="17:00";
    time.addEventListener("input",checkWindow);
    time.addEventListener("change",checkWindow);
    time.addEventListener("blur",checkWindow);
  }
  if(date){
    date.addEventListener("change",checkWindow);
    date.addEventListener("input",checkWindow);
  }
}

// FINAL WORKFLOW PATCH
// Added by final build: patient status + home assessment + configurable medicine delivery fee.

// ---- Settings migration ----
if(!db.settings) db.settings={};
if(db.settings.defaultDeliveryFee===undefined){
  db.settings.defaultDeliveryFee=0;
}
if(db.settings.homeAssessmentFee===undefined){
  // Initial configurable assessment charge. Admin can change this in Settings.
  db.settings.homeAssessmentFee=1500;
}

// Keep the requested real facility administrator identity on the current local database.
const __realAdmin=getUser("admin1");
if(__realAdmin){
  __realAdmin.name="Boniface Machogu";
  __realAdmin.email="boniface@beaconafrica.org";
  __realAdmin.phone="0724741827";
  __realAdmin.role="admin";
  __realAdmin.enabled=true;
  __realAdmin.mustChangePassword=false;
}

// Keep the requested clinical provider list and remove obsolete demo clinical providers.
const __wantedDoctors=["Eunice Wanjiku Ngugi","George Keitany","Benard Onyinsi","Angela Mwangi"];
db.users=db.users.filter(u=>{
  if(u.role!=="doctor") return true;
  return __wantedDoctors.includes(u.name);
});
db.users.filter(u=>u.role==="doctor").forEach(u=>u.specialty="Clinical Provider");

// Ensure requested nursing/pharmacy/rider staff exist in the local database.
const __staff=[
 {id:"nurse_beatrice",name:"Beatrice Gitamo",email:"beatrice.gitamo@beaconhope.demo",password:"DemoBeatrice2026!",role:"nurse",phone:"0700000201",enabled:true,homeServiceProvider:true},
 {id:"nurse_gerald",name:"Gerald Ragira",email:"gerald.ragira@beaconhope.demo",password:"DemoGerald2026!",role:"nurse",phone:"0700000202",enabled:true,homeServiceProvider:true},
 {id:"nurse_dennis",name:"Dennis Onami",email:"dennis.onami@beaconhope.demo",password:"DemoDennis2026!",role:"nurse",phone:"0700000203",enabled:true,homeServiceProvider:true},
 {id:"nurse_caroline",name:"Caroline Wanjiku",email:"caroline.wanjiku@beaconhope.demo",password:"DemoCaroline2026!",role:"nurse",phone:"0700000204",enabled:true,homeServiceProvider:true},
 {id:"pharmacist_peter",name:"Peter Miano",email:"peter.miano@beaconhope.demo",password:"DemoPeter2026!",role:"pharmacist",phone:"0700000301",enabled:true},
 {id:"pharmacist_rajab",name:"Rajab Ziada",email:"rajab.ziada@beaconhope.demo",password:"DemoRajab2026!",role:"pharmacist",phone:"0700000302",enabled:true},
 {id:"rider_dancan",name:"Dancan Bande",email:"dancan.bande@beaconhope.demo",password:"DemoDancan2026!",role:"rider",phone:"0700000401",enabled:true,vehicle:"Motorbike",currentLocation:null}
];
__staff.forEach(s=>{
  if(!db.users.some(u=>u.id===s.id)) db.users.push(JSON.parse(JSON.stringify(s)));
});

// ---- Patient status helpers ----
function patientCanBookHomeDirectly(patientId){
  const patient=getUser(patientId);
  if(!patient || patient.role!=="patient") return false;
  return getPatientStatus(patientId)==="Returning Client" || patient.homeAssessmentStatus==="approved";
}

function homeAssessmentStatusLabel(patientId){
  const p=getUser(patientId);
  if(!p) return "-";
  if(p.homeAssessmentStatus==="approved") return "Home Assessment Approved";
  if(p.homeAssessmentStatus==="completed_not_suitable") return "Facility Assessment Required";
  if(p.homeAssessmentStatus==="paid_pending") return "Assessment Paid — Awaiting Visit";
  return getPatientStatus(patientId)==="Returning Client" ? "Returning Client" : "Home Assessment Required";
}

// ---- New-client Home Assessment ----
function showHomeAssessmentForm(){
  if(currentUser?.role!=="patient") return;
  const fee=Number(db.settings.homeAssessmentFee||0);
  const nurses=db.users.filter(u=>u.role==="nurse"&&u.enabled&&u.homeServiceProvider);
  document.getElementById("modalContent").innerHTML=`
    <h2>Home Assessment</h2>
    <div class="alert alert-info">
      <strong>New clients must be assessed before home treatment is booked.</strong><br>
      You will pay the Home Assessment fee first. A Nursing Officer will visit you, assess your condition and determine whether the requested care can safely be provided at home.
      If home care is not appropriate, you will be advised to attend Beacon of Hope Hospital for further assessment or treatment.
    </div>
    <div class="card" style="margin-bottom:16px">
      <strong>Home Assessment Fee:</strong> ${money(fee)}
    </div>
    <form onsubmit="createHomeAssessment(event)">
      <div class="grid grid-2">
        <div class="form-group"><label>Preferred Date</label><input id="assessmentDate" type="date" class="form-control" min="${today()}" required></div>
        <div class="form-group"><label>Preferred Time</label><input id="assessmentTime" type="time" min="08:00" max="17:00" class="form-control" required></div>
      </div>
      <div class="form-group"><label>Preferred Nursing Officer</label>
        <select id="assessmentProvider" class="form-control" required>
          <option value="">Select nursing officer</option>
          ${nurses.map(n=>`<option value="${n.id}">${escapeHTML(n.name)}</option>`).join("")}
        </select>
      </div>
      <div class="form-group"><label>Home Address / Location</label><textarea id="assessmentAddress" class="form-control" rows="3" required>${escapeHTML(currentUser.address||"")}</textarea></div>
      <div class="form-group"><label>Reason for requesting home assessment</label><textarea id="assessmentReason" class="form-control" rows="4" required placeholder="Briefly describe what help you need at home."></textarea></div>
      <button class="btn btn-primary">Create Assessment Invoice</button>
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    </form>`;
  openModal();
  applyHospitalBookingWindow("assessmentDate","assessmentTime");
}

function createHomeAssessment(e){
  e.preventDefault();
  if(currentUser?.role!=="patient") return;
  if(getPatientStatus(currentUser.id)==="Returning Client"){
    alert("Your hospital record shows you as a returning client. You can request an eligible home service directly.");
    closeModal(); renderHomeServices(); return;
  }
  const providerId=document.getElementById("assessmentProvider")?.value;
  const date=document.getElementById("assessmentDate")?.value;
  const time=document.getElementById("assessmentTime")?.value;
  const address=(document.getElementById("assessmentAddress")?.value||"").trim();
  const reason=(document.getElementById("assessmentReason")?.value||"").trim();
  if(!validateHospitalBookingWindow(date,time,"home assessment")) return;
  if(!providerId||!date||!time||!address||!reason){ alert("Please complete all assessment details."); return; }
  if(isHomeProviderBusy(providerId,date,time)){ alert("That nursing officer is already busy at the selected time. Please choose another officer or time."); return; }

  const existing=db.homeServices.find(h=>h.patientId===currentUser.id&&h.requestType==="assessment"&&!['Cancelled','Completed','Not Suitable'].includes(h.status));
  if(existing){ alert("You already have an active Home Assessment request. Please check your invoice or notifications."); return; }

  const fee=Number(db.settings.homeAssessmentFee||0);
  const request={
    id:uid("assessment"), patientId:currentUser.id, providerId, requestType:"assessment",
    service:"Home Assessment", date,time,address,notes:reason,serviceFee:fee,transportFee:0,total:fee,
    status:"Pending Payment", createdAt:new Date().toISOString()
  };
  db.homeServices.push(request);
  const invoice={
    id:uid("invoice"), invoiceNumber:invoiceNumber("ASSESS"), type:"Home Assessment",
    patientId:currentUser.id, homeServiceId:request.id, items:[{description:"Home Assessment",quantity:1,unitPrice:fee}],
    total:fee,status:"Pending",createdAt:new Date().toISOString()
  };
  db.invoices.push(invoice); request.invoiceId=invoice.id;
  const patient=getUser(currentUser.id);
  if(patient) patient.homeAssessmentStatus="paid_pending";
  notifyAllAdmins(`New Home Assessment request ${request.id} from ${patient?.name||"patient"} requires payment/processing.`);
  db.users.filter(u=>u.role==="nurse"&&u.enabled&&u.id===providerId).forEach(n=>notify(n.id,`A new Home Assessment has been requested for ${date} at ${time}.`));
  saveDB(); closeModal(); alert("Home Assessment request created. Please pay the assessment invoice."); navigate("invoices");
}

function manageHomeAssessment(id){
  const a=db.homeServices.find(h=>h.id===id&&h.requestType==="assessment");
  if(!a) return;
  const patient=getUser(a.patientId);
  if(!["nurse","admin"].includes(currentUser?.role)) return;
  document.getElementById("modalContent").innerHTML=`
    <h2>Manage Home Assessment</h2>
    <div class="card">
      <p><strong>Patient:</strong> ${escapeHTML(patient?.name||"-")}</p>
      <p><strong>Phone:</strong> ${escapeHTML(patient?.phone||"-")}</p>
      <p><strong>Location:</strong> ${escapeHTML(a.address||patient?.address||"-")}</p>
      <p><strong>Requested:</strong> ${escapeHTML(a.date)} at ${escapeHTML(a.time)}</p>
      <p><strong>Reason:</strong> ${escapeHTML(a.notes||"-")}</p>
    </div>
    <div class="form-group"><label>Assessment outcome</label>
      <select id="assessmentOutcome" class="form-control">
        <option value="approved">Home care appropriate — approve home services</option>
        <option value="completed_not_suitable">Home care not appropriate — refer to facility</option>
      </select>
    </div>
    <div class="form-group"><label>Clinical / assessment notes</label><textarea id="assessmentClinicalNotes" class="form-control" rows="5" required></textarea></div>
    <button class="btn btn-primary" onclick="saveHomeAssessmentOutcome('${a.id}')">Save Assessment</button>
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>`;
  openModal();
}

function saveHomeAssessmentOutcome(id){
  const a=db.homeServices.find(h=>h.id===id&&h.requestType==="assessment");
  if(!a) return;
  if(!["nurse","admin"].includes(currentUser?.role)) return;
  const outcome=document.getElementById("assessmentOutcome")?.value;
  const notes=(document.getElementById("assessmentClinicalNotes")?.value||"").trim();
  if(!notes){ alert("Please enter the assessment notes."); return; }
  a.outcome=outcome; a.assessmentNotes=notes; a.assessedBy=currentUser.id; a.assessedAt=new Date().toISOString();
  a.status=outcome==="approved"?"Completed":"Not Suitable";
  const patient=getUser(a.patientId);
  if(patient) patient.homeAssessmentStatus=outcome;
  notify(a.patientId,outcome==="approved"?"Your Home Assessment is complete. Home care has been approved and you may now request an eligible home service.":"Your Home Assessment is complete. The Nursing Officer has advised that you should attend Beacon of Hope Hospital for further assessment or treatment.");
  saveDB(); closeModal(); renderHomeServices();
}

// ---- Home Services page: direct booking for returning/approved clients, assessment for new clients ----
function renderHomeServices(){
  const patientStatus=currentUser.role==="patient"?getPatientStatus(currentUser.id):null;
  const directAccess=currentUser.role==="patient"&&patientCanBookHomeDirectly(currentUser.id);
  const services=currentUser.role==="patient"?db.homeServices.filter(s=>s.patientId===currentUser.id):currentUser.role==="nurse"?db.homeServices.filter(s=>s.providerId===currentUser.id):db.homeServices;
  document.getElementById("content").innerHTML=`
    <h1 class="page-title">Home Healthcare Services
      ${currentUser.role==="patient" ? (directAccess?`<button class="btn btn-primary" onclick="showHomeServiceForm()">+ Request Home Service</button>`:`<button class="btn btn-primary" onclick="showHomeAssessmentForm()">+ Request Home Assessment</button>`) : ""}
    </h1>
    ${currentUser.role==="patient"?`<div class="alert ${directAccess?'alert-success':'alert-warning'}">
      <strong>Client status:</strong> ${escapeHTML(patientStatus)}${currentUser.homeAssessmentStatus?`<br><strong>Home assessment:</strong> ${escapeHTML(homeAssessmentStatusLabel(currentUser.id))}`:""}
      <br><br>${directAccess?"You may request an eligible home service directly. A returning client is identified from completed hospital clinical history or staff verification.":"Because you do not yet have a completed hospital clinical encounter, a Home Assessment is required before treatment at home can be requested. Pay the assessment fee first; the Nursing Officer will determine whether home care is appropriate."}
    </div>`:`<div class="alert alert-info">Nursing Officers can see patient phone numbers and locations. A nursing officer is shown as Busy when already booked at the selected time.</div>`}

    ${currentUser.role==="admin"?renderAdminHomeServiceCatalogHtml():""}

    <div class="card"><h3>${currentUser.role==="patient"?"My Home Service Requests":currentUser.role==="nurse"?"Assigned Home Services & Assessments":"Home Service Requests"}</h3>
      <div class="table-wrap"><table><thead><tr><th>Request</th><th>Patient</th><th>Service</th><th>Date</th><th>Time</th><th>Phone</th><th>Location</th><th>Status</th><th>Action</th></tr></thead><tbody>
      ${services.length?services.map(s=>{const p=getUser(s.patientId);const isAssessment=s.requestType==="assessment";const action=(currentUser.role==="nurse"&&isAssessment)?`<button class="btn btn-primary" onclick="manageHomeAssessment('${s.id}')">Assess</button>`:(currentUser.role==="nurse"||currentUser.role==="admin")?`<button class="btn btn-primary" onclick="assignHomeService('${s.id}')">Manage</button>`:"";return `<tr><td>${escapeHTML(s.id)}</td><td>${escapeHTML(p?.name||'-')}</td><td>${escapeHTML(s.service||'-')}</td><td>${escapeHTML(s.date||'-')}</td><td>${escapeHTML(s.time||'-')}</td><td>${escapeHTML(p?.phone||'-')}</td><td>${escapeHTML(s.address||p?.address||'-')}</td><td><span class="badge ${s.status==="Completed"?'badge-success':s.status==="Not Suitable"?'badge-danger':s.status.includes('Paid')?'badge-info':'badge-warning'}">${escapeHTML(s.status||'-')}</span></td><td>${action}</td></tr>`}).join(""):`<tr><td colspan="9"><div class="empty">No home-service requests.</div></td></tr>`}
      </tbody></table></div>
    </div>`;
}

function renderAdminHomeServiceCatalogHtml(){
  return `<div class="card"><div class="flex" style="justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div><h3>Home Service Charges</h3><p class="small text-muted">Admin can add, edit or remove home services. Existing requests are not changed.</p></div><button class="btn btn-primary" onclick="showHomeServiceCatalogForm()">+ Add Service</button></div><div class="table-wrap"><table><tr><th>Service</th><th>Charge</th><th>Status</th><th>Action</th></tr>${HOME_SERVICES.map(s=>`<tr><td>${escapeHTML(s.name)}</td><td>${money(s.price)}</td><td>${s.active===false?'Removed':'Active'}</td><td><button class="btn btn-secondary" onclick="showHomeServiceCatalogForm('${s.id}')">Edit</button><button class="btn ${s.active===false?'btn-primary':'btn-danger'}" onclick="toggleHomeServiceCatalog('${s.id}')">${s.active===false?'Restore':'Remove'}</button></td></tr>`).join("")}</table></div></div>`;
}

// ---- Configurable medicine delivery fee ----
function createDeliveryForOrder(order){
  if(db.deliveries.some(d=>d.pharmacyOrderId===order.id)) return;
  const defaultFee=Number(db.settings.defaultDeliveryFee||0);
  const delivery={id:uid("delivery"),pharmacyOrderId:order.id,patientId:order.patientId,riderId:null,status:"Awaiting Delivery Details",deliveryLocation:"",directions:"",receiverPhone:getUser(order.patientId)?.phone||"",deliveryFee:defaultFee,defaultDeliveryFeeAtCreation:defaultFee,otp:null,createdAt:new Date().toISOString()};
  db.deliveries.push(delivery); order.deliveryId=delivery.id; order.status="Awaiting Delivery Details"; saveDB();
  notify(order.patientId,"Your medicine payment has been received. The pharmacist will call you to confirm your delivery location and delivery fee.");
  db.users.filter(u=>u.role==="pharmacist"&&u.enabled).forEach(p=>notify(p.id,`Medicine order ${order.id} has been paid. Call the patient to confirm delivery location and delivery fee. The current admin default delivery fee is ${money(defaultFee)}; adjust it if needed after confirming the location.`));
}

function showDeliveryDetailsForm(deliveryId){
  if(currentUser?.role!=="pharmacist"){alert("Only the pharmacist can enter delivery details.");return;}
  const delivery=db.deliveries.find(d=>d.id===deliveryId); if(!delivery)return;
  const patient=getUser(delivery.patientId); const defaultFee=Number(db.settings.defaultDeliveryFee||0);
  document.getElementById("modalContent").innerHTML=`<h2>Confirm Delivery Details</h2><div class="alert alert-info"><strong>Call the patient first.</strong><br>Confirm the exact delivery location, directions/landmark, receiver phone number and delivery fee. GPS/distance tracking is not used in this workflow.<br><br><strong>Admin default delivery fee:</strong> ${money(defaultFee)}<br><strong>Patient:</strong> ${escapeHTML(patient?.name||"-")}<br><strong>Patient phone:</strong> ${escapeHTML(patient?.phone||"-")}</div><form onsubmit="saveDeliveryDetails(event,'${deliveryId}')"><div class="form-group"><label>Delivery Location / Address</label><textarea id="deliveryLocation" class="form-control" rows="3" required>${escapeHTML(delivery.deliveryLocation||patient?.address||"")}</textarea></div><div class="form-group"><label>Directions / Landmark</label><textarea id="deliveryDirections" class="form-control" rows="3" required>${escapeHTML(delivery.directions||"")}</textarea></div><div class="grid grid-2"><div class="form-group"><label>Receiver Phone Number</label><input id="receiverPhone" class="form-control" type="tel" required value="${escapeHTML(delivery.receiverPhone||patient?.phone||"")}"></div><div class="form-group"><label>Delivery Fee (KES)</label><input id="deliveryFee" class="form-control" type="number" min="0" step="1" required value="${Number(delivery.deliveryFee||defaultFee)}"></div></div><div class="flex"><button type="submit" class="btn btn-primary">Save & Create Delivery Invoice</button><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button></div></form>`; openModal();
}

// ---- General hospital service management ----
function showServiceCatalogForm(serviceId=""){
  if(currentUser?.role!=="admin") return;
  const service=SERVICE_CATALOG.find(s=>s.id===serviceId);
  document.getElementById("modalContent").innerHTML=`
    <h2>${service?"Update Service":"Add Hospital Service"}</h2>
    <div class="alert alert-info">This service manager is for hospital services generally. Home Services remain managed in their dedicated Home Services section.</div>
    <form onsubmit="saveServiceCatalog(event,'${serviceId||""}')">
      <div class="form-group"><label>Service Category</label><select id="serviceCategory" class="form-control" required>
        ${["Telemedicine / Consultation","Physical Hospital Service","Laboratory / Diagnostic","Home Service","Other Hospital Service"].map(c=>`<option ${service?.category===c?"selected":""}>${c}</option>`).join("")}
      </select></div>
      <div class="form-group"><label>Service Name</label><input id="serviceName" class="form-control" required value="${service?escapeHTML(service.name):""}"></div>
      <div class="form-group"><label>Description</label><textarea id="serviceDescription" class="form-control" rows="4" required>${service?escapeHTML(service.description):""}</textarea></div>
      <div class="grid grid-2">
        <div class="form-group"><label>Charge (KES)</label><input id="servicePrice" class="form-control" type="number" min="0" step="1" required value="${service?Number(service.price):""}"></div>
        <div class="form-group"><label>Displayed Price (optional)</label><input id="servicePriceLabel" class="form-control" placeholder="e.g. KES 500–750" value="${service?escapeHTML(service.priceLabel||money(service.price)):""}"></div>
      </div>
      <div class="flex" style="gap:8px"><button class="btn btn-primary" type="submit">Save Service</button><button class="btn btn-secondary" type="button" onclick="closeModal()">Cancel</button></div>
    </form>`;
  openModal();
}

function saveServiceCatalog(e,serviceId=""){
  e.preventDefault();
  if(currentUser?.role!=="admin") return;
  const category=document.getElementById("serviceCategory").value;
  const name=document.getElementById("serviceName").value.trim();
  const description=document.getElementById("serviceDescription").value.trim();
  const price=Number(document.getElementById("servicePrice").value);
  const priceLabel=document.getElementById("servicePriceLabel").value.trim() || money(price);
  if(!category||!name||!description||!Number.isFinite(price)||price<0){alert("Please enter a valid category, service name, description and charge.");return;}
  if(!serviceId){
    if(SERVICE_CATALOG.some(s=>s.name.toLowerCase()===name.toLowerCase()&&s.active!==false)){alert("A service with this name already exists.");return;}
    SERVICE_CATALOG.push({id:uid("service"),category,name,description,price,priceLabel,active:true});
  }else{
    const service=SERVICE_CATALOG.find(s=>s.id===serviceId); if(!service)return;
    service.category=category; service.name=name; service.description=description; service.price=price; service.priceLabel=priceLabel; service.active=true;
  }
  db.settings.serviceCatalog=SERVICE_CATALOG; saveDB(); closeModal(); renderAdminSettings();
  alert(serviceId?"Service updated successfully.":"Service added successfully.");
}

function toggleServiceCatalog(serviceId){
  if(currentUser?.role!=="admin") return;
  const service=SERVICE_CATALOG.find(s=>s.id===serviceId); if(!service)return;
  const removing=service.active!==false;
  if(removing&&!confirm(`Remove "${service.name}" from active services? Existing records will remain unchanged.`))return;
  service.active=removing?false:true; db.settings.serviceCatalog=SERVICE_CATALOG; saveDB(); renderAdminSettings();
}

function renderGeneralServiceCatalogHtml(){
  return `<div class="card"><div class="flex" style="justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div><h3>Hospital Service Management</h3><p class="small text-muted">Add, edit or remove services across the hospital—not only Home Services. Existing bookings and invoices are not changed.</p></div><button class="btn btn-primary" onclick="showServiceCatalogForm()">+ Add Service</button></div><div class="table-wrap"><table><tr><th>Category</th><th>Service</th><th>Charge</th><th>Status</th><th>Action</th></tr>${SERVICE_CATALOG.map(s=>`<tr><td>${escapeHTML(s.category)}</td><td><strong>${escapeHTML(s.name)}</strong><br><span class="small text-muted">${escapeHTML(s.description||"")}</span></td><td>${escapeHTML(s.priceLabel||money(s.price))}</td><td>${s.active===false?'Removed':'Active'}</td><td><button class="btn btn-secondary" onclick="showServiceCatalogForm('${s.id}')">Edit</button> <button class="btn ${s.active===false?'btn-primary':'btn-danger'}" onclick="toggleServiceCatalog('${s.id}')">${s.active===false?'Restore':'Remove'}</button></td></tr>`).join("")}</table></div></div>`;
}

// ---- Admin settings ----
function renderAdminSettings(){
  if(currentUser?.role!=="admin") return;
  const bands=getDeliveryChargeBands();
  const assessmentFee=Number(db.settings.homeAssessmentFee||1500);
  document.getElementById("content").innerHTML=`<h1 class="page-title">Administration Settings</h1>${renderGeneralServiceCatalogHtml()}
  <div class="alert alert-info">These settings control new transactions. The medicine-delivery tariff below is the current proposed Beacon of Hope tariff. Administrators can change any charge when hospital policy is updated. Changes affect new delivery records; existing invoices remain unchanged.</div>
  <div class="card">
    <h3>Medicine Delivery Charges</h3>
    <p class="small text-muted">Pharmacists select the distance band after calling the patient and confirming the delivery location. The individual delivery fee remains editable. No GPS or automatic distance calculation is used.</p>
    <form onsubmit="saveAdminSettings(event)">
      <div class="table-wrap"><table><thead><tr><th>Distance</th><th>Patient delivery charge</th><th>Admin charge (KES)</th></tr></thead><tbody>
        ${bands.filter(b=>!b.quotation).map(b=>`<tr><td>${escapeHTML(b.label)}</td><td>${money(b.fee)}</td><td><input id="${b.id}" class="form-control" type="number" min="0" step="1" value="${Number(b.fee||0)}" required></td></tr>`).join("")}
        ${bands.filter(b=>b.quotation).map(b=>`<tr><td>${escapeHTML(b.label)}</td><td>KES 20 per km, quoted before dispatch</td><td><input id="${b.id}_perkm" class="form-control" type="number" min="0" step="1" value="${Number(b.perKm||20)}" required><div class="small text-muted">Per-km rate for quotations above 30 km.</div></td></tr>`).join("")}
      </tbody></table></div>
      <div class="form-group mt"><label>New-Client Home Assessment Fee (KES)</label><input id="adminHomeAssessmentFee" type="number" min="0" step="1" class="form-control" value="${assessmentFee}" required><div class="small text-muted">Paid before a new client can receive a Home Assessment. This amount can also be changed whenever hospital policy changes.</div></div>
      <button class="btn btn-primary">Save Charges</button>
    </form>
  </div>`;
}

function saveAdminSettings(e){
  e.preventDefault(); if(currentUser?.role!=="admin")return;
  const bands=getDeliveryChargeBands().map(b=>{
    const copy=Object.assign({},b);
    if(b.quotation){ copy.perKm=Number(document.getElementById(b.id+"_perkm")?.value); }
    else { copy.fee=Number(document.getElementById(b.id)?.value); }
    return copy;
  });
  const a=Number(document.getElementById("adminHomeAssessmentFee")?.value);
  if(bands.some(b=>!Number.isFinite(b.quotation?b.perKm:b.fee)||(b.quotation?b.perKm:b.fee)<0)||!Number.isFinite(a)||a<0){alert("Please enter valid non-negative amounts.");return;}
  db.settings.deliveryChargeBands=bands;
  db.settings.deliveryRatePerKm=Number(bands.find(b=>b.quotation)?.perKm||20);
  db.settings.defaultDeliveryFee=Number(bands[0]?.fee||100);
  db.settings.homeAssessmentFee=a;
  saveDB(); alert("Medicine delivery and Home Assessment charges saved successfully."); renderAdminSettings();
}

// ---- Admin sidebar and navigation ----
function buildSidebar(){
  let html=`<div class="sidebar-section">Main</div><button data-page="dashboard" onclick="navigate('dashboard')">🏠 Dashboard</button>`;
  if(currentUser.role==="patient") html+=`<div class="sidebar-section">Healthcare</div><button data-page="appointments" onclick="navigate('appointments')">📅 Appointments / Booking</button><button data-page="consultation" onclick="navigate('consultation')">🎥 Consultation</button><button data-page="pharmacy" onclick="navigate('pharmacy')">💊 Pharmacy Orders</button><button data-page="laboratory" onclick="navigate('laboratory')">🧪 Laboratory Results</button><button data-page="home-services" onclick="navigate('home-services')">🏠 Home Services</button><button data-page="deliveries" onclick="navigate('deliveries')">🚚 Delivery Status</button><button data-page="invoices" onclick="navigate('invoices')">💳 Payments</button><button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>`;
  else if(currentUser.role==="doctor") html+=`<div class="sidebar-section">Doctor</div><button data-page="appointments" onclick="navigate('appointments')">📅 Appointments</button><button data-page="consultation" onclick="navigate('consultation')">🎥 Consultation</button><button data-page="prescriptions" onclick="navigate('prescriptions')">💊 Prescriptions</button><button data-page="laboratory" onclick="navigate('laboratory')">🧪 Laboratory Requests</button><button data-page="doctor-settings" onclick="navigate('doctor-settings')">⚙️ Booking Capacity</button><button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>`;
  else if(currentUser.role==="pharmacist") html+=`<div class="sidebar-section">Pharmacy</div><button data-page="pharmacy" onclick="navigate('pharmacy')">💊 Pharmacy Orders & Dispatch</button><button data-page="inventory" onclick="navigate('inventory')">📦 Inventory</button><button data-page="deliveries" onclick="navigate('deliveries')">🚚 Deliveries</button><button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>`;
  else if(currentUser.role==="rider") html+=`<div class="sidebar-section">Delivery</div><button data-page="deliveries" onclick="navigate('deliveries')">🚚 My Deliveries</button><button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>`;
  else if(currentUser.role==="nurse") html+=`<div class="sidebar-section">Clinical Home Care</div><button data-page="home-services" onclick="navigate('home-services')">🏠 Home Services & Assessments</button><button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>`;
  else if(currentUser.role==="admin") html+=`<div class="sidebar-section">Administration</div><button data-page="users" onclick="navigate('users')">👥 Users</button><button data-page="admin-orders" onclick="navigate('admin-orders')">📦 Orders</button><button data-page="pharmacy" onclick="navigate('pharmacy')">💊 Pharmacy</button><button data-page="laboratory" onclick="navigate('laboratory')">🧪 Laboratory</button><button data-page="home-services" onclick="navigate('home-services')">🏠 Home Services</button><button data-page="settings" onclick="navigate('settings')">⚙️ Settings</button><button data-page="reports" onclick="navigate('reports')">📊 Reports</button><button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>`;
  html+=`<div class="sidebar-section">Account</div><button data-page="profile" onclick="navigate('profile')">👤 My Profile</button>`;
  document.getElementById("sidebar").innerHTML=html;
}
function navigate(page){
  if(currentUser&&currentUser.role==="patient"&&page==="prescriptions") page="pharmacy";
  currentPage=page; document.querySelectorAll(".sidebar button[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page)); document.getElementById("sidebar")?.classList.remove("open");
  const pages={dashboard:renderDashboard,appointments:renderAppointments,consultation:renderConsultation,prescriptions:renderPrescriptions,pharmacy:renderPharmacy,inventory:renderInventory,deliveries:renderDeliveries,invoices:renderInvoices,laboratory:renderLaboratory,"home-services":renderHomeServices,"admin-orders":renderAdminOrders,users:renderUsers,"doctor-settings":renderDoctorSettings,"rider-map":renderRiderMap,notifications:renderNotifications,profile:renderProfile,reports:renderReports,settings:renderAdminSettings};
  try{(pages[page]||renderDashboard)();}catch(err){console.error(err);document.getElementById("content").innerHTML=`<div class="card"><div class="alert alert-danger"><strong>Unable to load this page.</strong><br>${escapeHTML(err.message||"Unknown error")}</div><button class="btn btn-primary" onclick="navigate('dashboard')">Return to Dashboard</button></div>`;}
}

// ---- Payment handler extension for Home Assessment invoices ----
const __previousHandlePaidInvoice=__baseHandlePaidInvoice;
function handlePaidInvoice(invoice){
  if(invoice.type==="Home Assessment"){
    const a=db.homeServices.find(s=>s.invoiceId===invoice.id||s.id===invoice.homeServiceId);
    if(a){
      a.status="Paid - Awaiting Assessment"; a.paidAt=new Date().toISOString();
      const p=getUser(a.patientId); if(p)p.homeAssessmentStatus="paid_pending";
      notify(a.patientId,"Home Assessment payment received. Your Nursing Officer will complete the assessment at the scheduled time.");
      db.users.filter(u=>u.role==="nurse"&&u.enabled&&u.id===a.providerId).forEach(n=>notify(n.id,`Home Assessment ${a.id} has been paid. Please complete the assessment for ${p?.name||"the patient"}.`));
      db.users.filter(u=>u.role==="admin"&&u.enabled).forEach(ad=>notify(ad.id,`Home Assessment ${a.id} has been paid and is awaiting assessment.`));
    }
    return;
  }
  return __previousHandlePaidInvoice(invoice);
}

/* Synchronize an already-open doctor dashboard when another tab records a payment. */
window.addEventListener("storage", function(event){
  if(event.key!==DB_KEY || !event.newValue || !currentUser) return;
  try{
    db=JSON.parse(event.newValue);
    if(currentUser.role==="doctor" && currentPage==="dashboard") renderDoctorDashboard();
    else if(currentUser.role==="doctor" && currentPage==="appointments") renderAppointments();
  }catch(err){
    console.error("Unable to synchronize dashboard data",err);
  }
});

// Persist migrations immediately.
saveDB();




/* FINAL MEDICINE DELIVERY WORKFLOW OVERRIDE
   Patient pays medicine -> pharmacist confirms initial delivery details/fee ->
   patient pays delivery -> pharmacy sees PAID -> pharmacist assigns rider ->
   rider picks up -> rider calls patient again -> rider starts delivery -> delivered.
   GPS/map tracking is not used in this workflow.
*/
function __delivery(orderId){ return db.deliveries.find(d=>d.pharmacyOrderId===orderId); }
function __deliveryOrder(d){ return d ? db.pharmacyOrders.find(o=>o.id===d.pharmacyOrderId) : null; }

function pharmacistDispatch(orderId){
  if(currentUser?.role!=="pharmacist"){ alert("Only the pharmacist can assign riders and dispatch medicine."); return; }
  const order=db.pharmacyOrders.find(o=>o.id===orderId);
  const delivery=__delivery(orderId);
  if(!order||!delivery){ alert("Delivery record not found."); return; }
  if(delivery.status!=="Paid - Awaiting Dispatch" || delivery.deliveryPaymentStatus!=="Paid"){
    alert("The delivery fee must be paid before the pharmacy can dispatch this order."); return;
  }
  const riders=db.users.filter(u=>u.role==="rider"&&u.enabled);
  if(!riders.length){ alert("No enabled riders are available."); return; }
  document.getElementById("modalContent").innerHTML=`
    <h2>Assign Rider & Dispatch</h2>
    <div class="alert alert-info">Delivery payment is <strong>PAID</strong>. Assign the medicine to a rider for pickup.</div>
    <p>Order: <strong>${escapeHTML(order.id)}</strong></p>
    <div class="form-group"><label>Select Rider</label>
      <select id="dispatchRider" class="form-control" required>
        ${riders.map(r=>`<option value="${r.id}">${escapeHTML(r.name)} — ${escapeHTML(r.phone||"")}</option>`).join("")}
      </select>
    </div>
    <div class="flex">
      <button class="btn btn-success" onclick="confirmPharmacyDispatch('${orderId}')">Assign & Dispatch</button>
      <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    </div>`;
  openModal();
}

function confirmPharmacyDispatch(orderId){
  if(currentUser?.role!=="pharmacist"){alert("Only the pharmacist can dispatch medicine.");return;}
  const order=db.pharmacyOrders.find(o=>o.id===orderId);
  const delivery=__delivery(orderId);
  const riderId=document.getElementById("dispatchRider")?.value;
  const rider=getUser(riderId);
  if(!order||!delivery||!rider)return;
  if(delivery.status!=="Paid - Awaiting Dispatch"||delivery.deliveryPaymentStatus!=="Paid"){
    alert("The delivery fee must be paid before dispatch.");return;
  }
  delivery.riderId=rider.id;
  delivery.status="Assigned";
  delivery.assignedAt=new Date().toISOString();
  order.status="Dispatched";
  order.dispatchedAt=new Date().toISOString();
  notify(order.patientId,`Your medicine order ${order.id} has been dispatched to rider ${rider.name}. The rider will call you again to confirm the exact location before starting delivery.`);
  notify(rider.id,`Medicine order ${order.id} is assigned to you. Pick up the medicine from the pharmacy, then call the patient again to confirm the exact delivery location and directions before starting delivery.`);
  db.users.filter(u=>u.role==="admin"&&u.enabled).forEach(a=>notify(a.id,`Pharmacy dispatched order ${order.id} to rider ${rider.name}.`));
  saveDB(); closeModal(); alert("Rider assigned and medicine dispatched successfully."); navigate("pharmacy");
}

function riderPickUpMedicine(deliveryId){
  const d=db.deliveries.find(x=>x.id===deliveryId);
  if(!d||currentUser?.role!=="rider"||d.riderId!==currentUser.id){alert("You are not authorised to update this delivery.");return;}
  if(d.status!=="Assigned"){alert("This delivery is not ready for pickup.");return;}
  d.status="Picked Up - Confirm Patient Location";
  d.pickedUpAt=new Date().toISOString();
  saveDB();
  notify(d.patientId,"The rider has picked up your medicine and will call you again to confirm the exact delivery location and directions before starting delivery.");
  renderDeliveries();
}

function riderConfirmPatientLocation(deliveryId){
  const d=db.deliveries.find(x=>x.id===deliveryId);
  if(!d||currentUser?.role!=="rider"||d.riderId!==currentUser.id){alert("You are not authorised to update this delivery.");return;}
  if(d.status!=="Picked Up - Confirm Patient Location"){alert("Pick up the medicine first.");return;}
  const patient=getUser(d.patientId);
  const confirmed=confirm(`Call ${patient?.name||"the patient"} at ${d.receiverPhone||patient?.phone||"the recorded phone number"} and confirm the exact location and directions.\n\nHave you confirmed the location by phone?`);
  if(!confirmed)return;
  d.finalLocationConfirmedAt=new Date().toISOString();
  d.finalLocationConfirmedBy=currentUser.id;
  d.status="In Transit";
  d.startedDeliveryAt=new Date().toISOString();
  saveDB();
  notify(d.patientId,"The rider has confirmed your location by phone and has started the delivery. Your medicine is now in transit.");
  renderDeliveries();
}

function riderMarkDelivered(deliveryId){
  const d=db.deliveries.find(x=>x.id===deliveryId);
  if(!d||currentUser?.role!=="rider"||d.riderId!==currentUser.id){alert("You are not authorised to update this delivery.");return;}
  if(d.status!=="In Transit"){alert("The delivery must be in transit before it can be marked delivered.");return;}
  const code=prompt("Enter the patient's delivery OTP:");
  if(d.otp && code!==d.otp){alert("Incorrect OTP.");return;}
  d.status="Delivered";
  d.deliveredAt=new Date().toISOString();
  const order=__deliveryOrder(d); if(order)order.status="Completed";
  saveDB();
  notify(d.patientId,"Your medicine has been delivered successfully.");
  alert("Delivery completed successfully.");
  renderDeliveries();
}

function updateDeliveryStatus(deliveryId,status){
  if(status==="Picked Up") return riderPickUpMedicine(deliveryId);
  if(status==="In Transit") return riderConfirmPatientLocation(deliveryId);
  if(status==="Delivered") return riderMarkDelivered(deliveryId);
  const d=db.deliveries.find(x=>x.id===deliveryId);
  if(!d||currentUser?.role!=="rider"||d.riderId!==currentUser.id){alert("You are not authorised to update this delivery.");return;}
  d.status=status; saveDB(); renderDeliveries();
}

function renderDeliveries(){
  const deliveries=currentUser.role==="patient"?db.deliveries.filter(d=>d.patientId===currentUser.id):currentUser.role==="rider"?db.deliveries.filter(d=>d.riderId===currentUser.id):db.deliveries;
  document.getElementById("content").innerHTML=`
    <h1 class="page-title">Medicine Deliveries</h1>
    ${currentUser.role==="patient"?`<div class="alert alert-info">No live GPS tracking is used. The pharmacist confirms the initial delivery details and fee. After pickup, the rider calls you again to confirm the exact location and directions before starting delivery.</div>`:""}
    <div class="card"><div class="table-wrap"><table><thead><tr><th>Patient / Receiver</th><th>Phone</th><th>Location & Directions</th><th>Delivery Fee</th><th>Status</th><th>Action</th></tr></thead><tbody>
    ${deliveries.length?deliveries.map(d=>{
      const patient=getUser(d.patientId), phone=d.receiverPhone||patient?.phone||"";
      let actions="";
      if(currentUser.role==="patient"&&d.status==="Awaiting Delivery Payment"){
        const inv=db.invoices.find(i=>i.type==="Delivery"&&i.deliveryId===d.id&&i.status==="Pending");
        if(inv)actions+=`<button class="btn btn-success" onclick="payRelatedInvoice('${inv.id}');return false;">Pay Delivery Fee</button>`;
      }
      if(currentUser.role==="pharmacist"&&d.status==="Awaiting Delivery Details") actions+=`<button class="btn btn-primary" onclick="showDeliveryDetailsForm('${d.id}')">📍 Confirm Delivery Details</button>`;
      if(currentUser.role==="rider"&&d.status==="Assigned") actions+=`<button class="btn btn-primary" onclick="riderPickUpMedicine('${d.id}')">📦 Pick Up Medicine</button>`;
      if(currentUser.role==="rider"&&d.status==="Picked Up - Confirm Patient Location") actions+=`<button class="btn btn-primary" onclick="riderConfirmPatientLocation('${d.id}')">📞 Call Patient & Confirm Location</button>`;
      if(currentUser.role==="rider"&&d.status==="In Transit") actions+=`<button class="btn btn-success" onclick="riderMarkDelivered('${d.id}')">✅ Mark Delivered</button>`;
      if(currentUser.role==="rider"&&phone) actions+=`<a class="btn btn-secondary" href="tel:${escapeHTML(phone)}">📞 Call Receiver</a>`;
      return `<tr><td>${escapeHTML(patient?.name||"-")}</td><td>${phone?`<a href="tel:${escapeHTML(phone)}">${escapeHTML(phone)}</a>`:"-"}</td><td><strong>${escapeHTML(d.deliveryLocation||"Not yet confirmed")}</strong><br><span class="small">${escapeHTML(d.directions||"")}</span></td><td>${money(d.deliveryFee||0)}</td><td><span class="badge ${d.status==="Delivered"?"badge-success":d.status.includes("Paid")?"badge-success":"badge-info"}">${escapeHTML(d.status||"-")}</span></td><td>${actions||"-"}</td></tr>`;
    }).join(""):`<tr><td colspan="6"><div class="empty">No deliveries found.</div></td></tr>`}
    </tbody></table></div></div>`;
}

function renderRiderDashboard(){
  const deliveries=db.deliveries.filter(d=>d.riderId===currentUser.id);
  document.getElementById("content").innerHTML=`
    <h1 class="page-title">Rider Dashboard</h1>
    <div class="grid grid-4">
      <div class="stat-card"><div class="stat-title">Assigned</div><div class="stat-number">${deliveries.filter(d=>d.status==="Assigned").length}</div></div>
      <div class="stat-card"><div class="stat-title">Picked Up / Confirming</div><div class="stat-number">${deliveries.filter(d=>d.status==="Picked Up - Confirm Patient Location").length}</div></div>
      <div class="stat-card"><div class="stat-title">In Transit</div><div class="stat-number">${deliveries.filter(d=>d.status==="In Transit").length}</div></div>
      <div class="stat-card"><div class="stat-title">Delivered</div><div class="stat-number">${deliveries.filter(d=>d.status==="Delivered").length}</div></div>
    </div><br>
    <div class="card"><h3>My Assigned Medicine Deliveries</h3>${deliveries.length?deliveries.map(d=>{const p=getUser(d.patientId);const phone=d.receiverPhone||p?.phone||"";return `<div class="card" style="margin-top:12px"><strong>Order:</strong> ${escapeHTML(d.pharmacyOrderId||d.id)}<br><strong>Patient:</strong> ${escapeHTML(p?.name||"-")}<br><strong>Phone:</strong> ${phone?`<a href="tel:${escapeHTML(phone)}">${escapeHTML(phone)}</a>`:"-"}<br><strong>Location:</strong> ${escapeHTML(d.deliveryLocation||"-")}<br><strong>Directions:</strong> ${escapeHTML(d.directions||"-")}<br><strong>Status:</strong> ${escapeHTML(d.status||"-")}<div class="flex" style="margin-top:10px">${d.status==="Assigned"?`<button class="btn btn-primary" onclick="riderPickUpMedicine('${d.id}')">📦 Pick Up Medicine</button>`:""}${d.status==="Picked Up - Confirm Patient Location"?`<button class="btn btn-primary" onclick="riderConfirmPatientLocation('${d.id}')">📞 Call Patient & Confirm Location</button>`:""}${d.status==="In Transit"?`<button class="btn btn-success" onclick="riderMarkDelivered('${d.id}')">✅ Mark Delivered</button>`:""}${phone?`<a class="btn btn-secondary" href="tel:${escapeHTML(phone)}">📞 Call Patient</a>`:""}</div></div>`}).join(""):`<div class="empty">No medicine deliveries assigned.</div>`}</div>`;
}

function renderRiderMap(){ alert("GPS/map tracking is not used in the current medicine delivery workflow. Use Medicine Deliveries to manage pickup, phone confirmation and delivery status."); }
function trackDelivery(){ alert("Live GPS tracking is not used. The rider confirms the patient's location and directions by phone before starting delivery."); }



/* =========================================================
   BEACON OF HOPE — FINAL MEDICINE DELIVERY WORKFLOW
   1. Patient pays medicine.
   2. Pharmacy immediately sees MEDICINE PAID.
   3. Pharmacist calls patient and manually records location,
      directions, receiver phone and delivery fee.
   4. Patient receives a DELIVERY invoice and pays it.
   5. Pharmacy immediately sees DELIVERY PAID.
   6. Pharmacist dispatches medicine and assigns a rider.
   7. Rider sees the assigned delivery and receiver contact.
   8. Rider picks up medicine, calls receiver again, confirms
      exact location/directions, then starts delivery.
   9. Rider marks delivered after successful handover.
   GPS/map tracking is intentionally not used.
========================================================= */

(function(){

  function deliveryForOrder(orderId){
    return db.deliveries.find(d => d.pharmacyOrderId === orderId);
  }

  function pharmacyInvoice(orderId){
    return db.invoices.find(i =>
      i.type === "Pharmacy" &&
      i.pharmacyOrderId === orderId
    );
  }

  function deliveryInvoice(deliveryId){
    return db.invoices.find(i =>
      i.type === "Delivery" &&
      i.deliveryId === deliveryId
    );
  }

  function statusClass(status){
    if(["Paid","Medicine Paid","Delivery Paid","Delivered"].includes(status)) return "badge-success";
    if(String(status).toLowerCase().includes("awaiting")) return "badge-warning";
    if(String(status).toLowerCase().includes("unavailable")) return "badge-danger";
    return "badge-info";
  }

  /* ---------- Payment state synchronisation ---------- */

  const originalHandlePaidInvoice = window.handlePaidInvoice;

  window.handlePaidInvoice = function(invoice){

    if(invoice && invoice.type === "Pharmacy"){
      const order = db.pharmacyOrders.find(o => o.id === invoice.pharmacyOrderId);

      if(order){
        invoice.status = "Paid";
        order.medicinePaymentStatus = "Paid";
        order.medicinePaidAt = invoice.paidAt || new Date().toISOString();

        let delivery = deliveryForOrder(order.id);

        if(!delivery){
          delivery = {
            id:uid("delivery"),
            pharmacyOrderId:order.id,
            patientId:order.patientId,
            riderId:null,
            status:"Awaiting Delivery Details",
            medicinePaymentStatus:"Paid",
            deliveryPaymentStatus:"Pending",
            deliveryLocation:"",
            directions:"",
            receiverPhone:getUser(order.patientId)?.phone || "",
            deliveryFee:0,
            otp:null,
            createdAt:new Date().toISOString()
          };
          db.deliveries.push(delivery);
        }else{
          delivery.medicinePaymentStatus = "Paid";
          if(!delivery.status ||
             delivery.status === "Pending" ||
             delivery.status === "Awaiting Pharmacy Payment"){
            delivery.status = "Awaiting Delivery Details";
          }
        }

        order.deliveryId = delivery.id;
        order.status = "Awaiting Delivery Details";

        db.users
          .filter(u => u.role === "pharmacist" && u.enabled)
          .forEach(p => notify(
            p.id,
            `MEDICINE PAID: Order ${order.id}. Call ${getUser(order.patientId)?.name || "the patient"} to confirm the delivery location, directions, receiver phone and delivery fee.`
          ));

        notify(
          order.patientId,
          "Medicine payment received. The pharmacy will call you to confirm the delivery location and delivery fee."
        );

        saveDB();
        return;
      }
    }

    if(invoice && invoice.type === "Delivery"){
      const delivery =
        db.deliveries.find(d => d.id === invoice.deliveryId) ||
        db.deliveries.find(d => d.pharmacyOrderId === invoice.pharmacyOrderId);

      if(delivery){
        delivery.deliveryInvoiceId = invoice.id;
        delivery.deliveryPaymentStatus = "Paid";
        delivery.deliveryPaidAt = invoice.paidAt || new Date().toISOString();
        delivery.status = "Paid - Ready for Pharmacy Dispatch";

        const order = db.pharmacyOrders.find(o => o.id === delivery.pharmacyOrderId);
        if(order){
          order.deliveryPaymentStatus = "Paid";
          order.status = "Delivery Paid - Ready for Pharmacy Dispatch";
          order.deliveryPaidAt = delivery.deliveryPaidAt;
        }

        db.users
          .filter(u => u.role === "pharmacist" && u.enabled)
          .forEach(p => notify(
            p.id,
            `DELIVERY PAID: Order ${delivery.pharmacyOrderId}. The delivery fee is PAID. You can now dispatch the medicine and assign a rider.`
          ));

        db.users
          .filter(u => u.role === "admin" && u.enabled)
          .forEach(a => notify(
            a.id,
            `DELIVERY PAID: Order ${delivery.pharmacyOrderId}. Pharmacy can now dispatch and assign a rider.`
          ));

        notify(
          delivery.patientId,
          "Your delivery fee has been received. The pharmacy will now dispatch your medicine and assign a rider."
        );

        saveDB();
        return;
      }
    }

    if(typeof originalHandlePaidInvoice === "function"){
      return originalHandlePaidInvoice(invoice);
    }
  };

  /* ---------- Pharmacist: confirm location + fee ---------- */

  window.showDeliveryDetailsForm = function(deliveryId){
    if(currentUser?.role !== "pharmacist"){
      alert("Only the pharmacist can confirm delivery details.");
      return;
    }

    const d = db.deliveries.find(x => x.id === deliveryId);
    if(!d) return;

    const patient = getUser(d.patientId);

    document.getElementById("modalContent").innerHTML = `
      <h2>Confirm Delivery Details</h2>

      <div class="alert alert-info">
        <strong>Call the patient first.</strong><br>
        Confirm the delivery location, directions/landmark, receiver phone number
        and the delivery fee. Enter the information manually below.
        <br><br>
        <strong>Patient:</strong> ${escapeHTML(patient?.name || "-")}
        <br>
        <strong>Patient phone:</strong> ${escapeHTML(patient?.phone || "-")}
      </div>

      <form onsubmit="saveFinalDeliveryDetails(event,'${deliveryId}')">

        <div class="form-group">
          <label>Confirmed Delivery Location / Address</label>
          <textarea id="finalDeliveryLocation" class="form-control" rows="3" required
            placeholder="Enter the exact location confirmed by phone"></textarea>
        </div>

        <div class="form-group">
          <label>Directions / Landmark</label>
          <textarea id="finalDeliveryDirections" class="form-control" rows="3" required
            placeholder="Enter directions or landmark confirmed by phone"></textarea>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label>Receiver Phone Number</label>
            <input id="finalReceiverPhone" class="form-control" type="tel"
              required value="${escapeHTML(d.receiverPhone || patient?.phone || "")}">
          </div>

          <div class="form-group">
            <label>Delivery Fee (KES)</label>
            <input id="finalDeliveryFee" class="form-control" type="number"
              min="0" step="1" required value="${Number(d.deliveryFee || 0)}">
          </div>
        </div>

        <div class="alert alert-warning small">
          The delivery fee is entered manually by the pharmacist after speaking
          with the patient. The patient will receive a separate delivery invoice.
        </div>

        <div class="flex">
          <button class="btn btn-primary" type="submit">
            Save Details & Send Invoice
          </button>
          <button class="btn btn-secondary" type="button" onclick="closeModal()">
            Cancel
          </button>
        </div>
      </form>
    `;

    openModal();
  };

  window.saveFinalDeliveryDetails = function(event, deliveryId){
    event.preventDefault();

    if(currentUser?.role !== "pharmacist"){
      alert("Only the pharmacist can save delivery details.");
      return;
    }

    const d = db.deliveries.find(x => x.id === deliveryId);
    if(!d) return;

    const location =
      document.getElementById("finalDeliveryLocation")?.value.trim() || "";
    const directions =
      document.getElementById("finalDeliveryDirections")?.value.trim() || "";
    const receiverPhone =
      document.getElementById("finalReceiverPhone")?.value.trim() || "";
    const fee =
      Number(document.getElementById("finalDeliveryFee")?.value);

    if(!location || !directions || !receiverPhone ||
       !Number.isFinite(fee) || fee < 0){
      alert("Please enter the confirmed location, directions, receiver phone and delivery fee.");
      return;
    }

    d.deliveryLocation = location;
    d.directions = directions;
    d.receiverPhone = receiverPhone;
    d.deliveryFee = fee;
    d.deliveryPaymentStatus = "Pending";
    d.status = "Awaiting Delivery Payment";
    d.detailsConfirmedAt = new Date().toISOString();
    d.detailsConfirmedBy = currentUser.id;

    const order = db.pharmacyOrders.find(o => o.id === d.pharmacyOrderId);
    if(order){
      order.status = "Awaiting Delivery Payment";
      order.deliveryPaymentStatus = "Pending";
    }

    let inv = deliveryInvoice(d.id);

    if(!inv){
      inv = {
        id:uid("invoice"),
        invoiceNumber:invoiceNumber("DEL"),
        type:"Delivery",
        deliveryId:d.id,
        pharmacyOrderId:d.pharmacyOrderId,
        patientId:d.patientId,
        items:[
          {description:"Medicine delivery",quantity:1,unitPrice:fee}
        ],
        total:fee,
        status:"Pending",
        paymentMethod:null,
        transactionReference:null,
        createdAt:new Date().toISOString()
      };
      db.invoices.push(inv);
    }else{
      inv.items=[
        {description:"Medicine delivery",quantity:1,unitPrice:fee}
      ];
      inv.total=fee;
      inv.status="Pending";
      inv.paymentMethod=null;
      inv.transactionReference=null;
    }

    d.deliveryInvoiceId = inv.id;

    saveDB();

    notify(
      d.patientId,
      `Delivery invoice ${inv.invoiceNumber} is ready. Delivery fee: ${money(fee)}. Please pay the delivery fee before dispatch.`
    );

    closeModal();
    alert("Delivery details saved. The patient has been sent the delivery invoice.");
    renderPharmacy();
  };

  /* ---------- Pharmacist: dispatch + rider assignment ---------- */

  window.pharmacistDispatch = function(orderId){
    if(currentUser?.role !== "pharmacist"){
      alert("Only the pharmacist can dispatch medicine.");
      return;
    }

    const order = db.pharmacyOrders.find(o => o.id === orderId);
    const d = deliveryForOrder(orderId);

    if(!order || !d){
      alert("Delivery record not found.");
      return;
    }

    if(d.deliveryPaymentStatus !== "Paid" ||
       d.status !== "Paid - Ready for Pharmacy Dispatch"){
      alert("The delivery fee must be PAID before dispatch.");
      return;
    }

    const riders = db.users.filter(u => u.role === "rider" && u.enabled);

    if(!riders.length){
      alert("No enabled rider is available.");
      return;
    }

    document.getElementById("modalContent").innerHTML = `
      <h2>Dispatch Medicine & Assign Rider</h2>

      <div class="alert alert-success">
        <strong>Delivery fee: PAID</strong><br>
        The medicine can now be dispatched.
      </div>

      <div class="card">
        <strong>Order:</strong> ${escapeHTML(order.id)}<br>
        <strong>Receiver:</strong> ${escapeHTML(getUser(d.patientId)?.name || "-")}<br>
        <strong>Phone:</strong> ${escapeHTML(d.receiverPhone || "-")}<br>
        <strong>Location:</strong> ${escapeHTML(d.deliveryLocation || "-")}
      </div>

      <div class="form-group">
        <label>Select Rider</label>
        <select id="finalDispatchRider" class="form-control" required>
          <option value="">Select rider</option>
          ${riders.map(r => `
            <option value="${r.id}">
              ${escapeHTML(r.name)} — ${escapeHTML(r.phone || "")}
            </option>
          `).join("")}
        </select>
      </div>

      <div class="alert alert-info small">
        After assignment, the rider will see this delivery, pick up the medicine,
        then call the receiver again to confirm the exact location and directions.
      </div>

      <div class="flex">
        <button class="btn btn-success" onclick="confirmFinalDispatch('${orderId}')">
          Dispatch & Assign Rider
        </button>
        <button class="btn btn-secondary" onclick="closeModal()">
          Cancel
        </button>
      </div>
    `;

    openModal();
  };

  window.confirmFinalDispatch = function(orderId){
    if(currentUser?.role !== "pharmacist"){
      alert("Only the pharmacist can dispatch medicine.");
      return;
    }

    const order = db.pharmacyOrders.find(o => o.id === orderId);
    const d = deliveryForOrder(orderId);
    const riderId = document.getElementById("finalDispatchRider")?.value;
    const rider = getUser(riderId);

    if(!order || !d || !rider){
      alert("Please select a rider.");
      return;
    }

    if(d.deliveryPaymentStatus !== "Paid"){
      alert("The delivery fee must be paid before dispatch.");
      return;
    }

    d.riderId = rider.id;
    d.status = "Assigned";
    d.assignedAt = new Date().toISOString();

    order.status = "Dispatched - Rider Assigned";
    order.riderId = rider.id;
    order.dispatchedAt = new Date().toISOString();

    notify(
      rider.id,
      `DELIVERY ASSIGNED: Order ${order.id}. Pick up the medicine from the pharmacy. Then call the receiver at ${d.receiverPhone} to confirm the exact delivery location and directions.`
    );

    notify(
      d.patientId,
      `Your medicine order ${order.id} has been dispatched and assigned to rider ${rider.name}. The rider will call you again to confirm the exact delivery location.`
    );

    saveDB();
    closeModal();
    alert("Medicine dispatched and rider assigned successfully.");
    navigate("pharmacy");
  };

  /* ---------- Rider workflow ---------- */

  window.riderPickUpMedicine = function(deliveryId){
    const d = db.deliveries.find(x => x.id === deliveryId);

    if(!d || currentUser?.role !== "rider" || d.riderId !== currentUser.id){
      alert("You are not authorised to update this delivery.");
      return;
    }

    if(d.status !== "Assigned"){
      alert("This delivery is not waiting for rider pickup.");
      return;
    }

    d.status = "Picked Up - Call Receiver";
    d.pickedUpAt = new Date().toISOString();

    const order = db.pharmacyOrders.find(o => o.id === d.pharmacyOrderId);
    if(order) order.status = "Picked Up - Call Receiver";

    notify(
      d.patientId,
      "The rider has picked up your medicine and will call you again to confirm the exact delivery location and directions."
    );

    saveDB();
    renderDeliveries();
  };

  window.riderConfirmPatientLocation = function(deliveryId){
    const d = db.deliveries.find(x => x.id === deliveryId);

    if(!d || currentUser?.role !== "rider" || d.riderId !== currentUser.id){
      alert("You are not authorised to update this delivery.");
      return;
    }

    if(d.status !== "Picked Up - Call Receiver"){
      alert("Pick up the medicine before confirming the receiver's location.");
      return;
    }

    const patient = getUser(d.patientId);
    const phone = d.receiverPhone || patient?.phone || "";

    const confirmed = confirm(
      `Call receiver: ${phone}\n\n` +
      `Confirm the exact delivery location and directions by phone.\n\n` +
      `Have you spoken to the receiver and confirmed the location?`
    );

    if(!confirmed) return;

    d.finalLocationConfirmedAt = new Date().toISOString();
    d.finalLocationConfirmedBy = currentUser.id;
    d.status = "In Transit";
    d.startedDeliveryAt = new Date().toISOString();

    const order = db.pharmacyOrders.find(o => o.id === d.pharmacyOrderId);
    if(order) order.status = "In Transit";

    notify(
      d.patientId,
      "The rider has confirmed your delivery location by phone and has started the delivery."
    );

    saveDB();
    renderDeliveries();
  };

  window.riderMarkDelivered = function(deliveryId){
    const d = db.deliveries.find(x => x.id === deliveryId);

    if(!d || currentUser?.role !== "rider" || d.riderId !== currentUser.id){
      alert("You are not authorised to update this delivery.");
      return;
    }

    if(d.status !== "In Transit"){
      alert("The delivery must be in transit before it can be completed.");
      return;
    }

    const code = prompt("Enter the patient's delivery confirmation OTP:");

    if(d.otp && code !== d.otp){
      alert("Incorrect OTP.");
      return;
    }

    d.status = "Delivered";
    d.deliveredAt = new Date().toISOString();

    const order = db.pharmacyOrders.find(o => o.id === d.pharmacyOrderId);
    if(order) order.status = "Completed - Delivered";

    notify(
      d.patientId,
      "Your medicine has been delivered successfully."
    );

    saveDB();
    alert("Delivery completed successfully.");
    renderDeliveries();
  };

  /* ---------- Pharmacy screen ---------- */

  window.renderPharmacy = function(){
    const orders = currentUser.role === "patient"
      ? db.pharmacyOrders.filter(o => o.patientId === currentUser.id)
      : db.pharmacyOrders;

    document.getElementById("content").innerHTML = `
      <h1 class="page-title">Pharmacy Orders</h1>

      ${currentUser.role === "pharmacist" ? `
        <div class="alert alert-info">
          <strong>Medicine Delivery Workflow:</strong><br>
          Medicine payment → pharmacist confirms location & fee → delivery invoice →
          delivery payment → pharmacy dispatches & assigns rider → rider calls receiver →
          delivery starts.
        </div>
      ` : ""}

      <div class="card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Patient</th>
                ${currentUser.role !== "patient" ? "<th>Medicines</th>" : ""}
                <th>Medicine Payment</th>
                <th>Delivery</th>
                <th>Delivery Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${orders.length ? orders.map(order => {
                const patient = getUser(order.patientId);
                const medInv = pharmacyInvoice(order.id);
                const d = deliveryForOrder(order.id);
                const dinv = d ? deliveryInvoice(d.id) : null;

                const medicinePaid =
                  medInv?.status === "Paid" ||
                  order.medicinePaymentStatus === "Paid";

                const deliveryPaid =
                  d?.deliveryPaymentStatus === "Paid" ||
                  dinv?.status === "Paid";

                let action = "";

                if(currentUser.role === "pharmacist"){
                  if(order.status === "Pending"){
                    action = `<button class="btn btn-primary"
                      onclick="processPharmacyOrder('${order.id}')">Check Stock</button>`;
                  }else if(medicinePaid && d && d.status === "Awaiting Delivery Details"){
                    action = `<button class="btn btn-primary"
                      onclick="showDeliveryDetailsForm('${d.id}')">📞 Confirm Delivery Details</button>`;
                  }else if(d && d.status === "Awaiting Delivery Payment" && !deliveryPaid){
                    action = `<span class="small text-muted">Waiting for patient delivery payment</span>`;
                  }else if(d && deliveryPaid && d.status === "Paid - Ready for Pharmacy Dispatch"){
                    action = `<button class="btn btn-success"
                      onclick="pharmacistDispatch('${order.id}')">🚚 Dispatch & Assign Rider</button>`;
                  }else if(d && d.status === "Assigned"){
                    action = `<span class="badge badge-info">Rider Assigned</span>`;
                  }else if(d && d.status === "Picked Up - Call Receiver"){
                    action = `<span class="badge badge-info">Rider Confirming Location</span>`;
                  }else if(d && d.status === "In Transit"){
                    action = `<span class="badge badge-success">In Transit</span>`;
                  }else if(d && d.status === "Delivered"){
                    action = `<span class="badge badge-success">Delivered</span>`;
                  }
                }

                if(currentUser.role === "patient"){
                  if(!medicinePaid && medInv?.status === "Pending"){
                    action = `<button class="btn btn-success"
                      onclick="payRelatedInvoice('${medInv.id}');return false;">Pay Medicine</button>`;
                  }else if(medicinePaid && d?.status === "Awaiting Delivery Payment" && dinv?.status === "Pending"){
                    action = `<button class="btn btn-warning"
                      onclick="payRelatedInvoice('${dinv.id}');return false;">Pay Delivery Fee</button>`;
                  }else if(d?.status === "Delivered"){
                    action = `<span class="badge badge-success">Delivered</span>`;
                  }
                }

                const deliveryText = d
                  ? (d.status === "Awaiting Delivery Details"
                      ? "Waiting for pharmacy to confirm location"
                      : d.status === "Awaiting Delivery Payment"
                      ? `Invoice sent — ${money(d.deliveryFee)}`
                      : d.status)
                  : "Not started";

                return `
                  <tr>
                    <td><strong>${escapeHTML(order.id)}</strong></td>
                    <td>${escapeHTML(patient?.name || "-")}</td>
                    ${currentUser.role !== "patient"
                      ? `<td>${order.items.map(i =>
                          `${escapeHTML(i.medicineName)} × ${i.quantity}`
                        ).join("<br>")}</td>`
                      : ""}
                    <td>
                      <span class="badge ${medicinePaid ? "badge-success" : "badge-warning"}">
                        ${medicinePaid ? "PAID" : (medInv?.status || "Pending")}
                      </span>
                    </td>
                    <td>${escapeHTML(deliveryText)}</td>
                    <td>
                      <span class="badge ${deliveryPaid ? "badge-success" : "badge-warning"}">
                        ${deliveryPaid ? "PAID" : (d?.deliveryPaymentStatus || "Not invoiced")}
                      </span>
                    </td>
                    <td>${action || "-"}</td>
                  </tr>
                `;
              }).join("") : `
                <tr>
                  <td colspan="${currentUser.role === "patient" ? 6 : 7}">
                    <div class="empty">No pharmacy orders.</div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  /* ---------- Delivery screen ---------- */

  window.renderDeliveries = function(){
    let deliveries;

    if(currentUser.role === "patient"){
      deliveries = db.deliveries.filter(d => d.patientId === currentUser.id);
    }else if(currentUser.role === "rider"){
      deliveries = db.deliveries.filter(d => d.riderId === currentUser.id);
    }else{
      deliveries = db.deliveries;
    }

    document.getElementById("content").innerHTML = `
      <h1 class="page-title">
        ${currentUser.role === "rider" ? "My Assigned Deliveries" : "Medicine Deliveries"}
      </h1>

      ${currentUser.role === "rider" ? `
        <div class="alert alert-info">
          Your assigned delivery appears here after the pharmacy dispatches the medicine.
          Pick up the medicine, call the receiver, confirm the exact location and directions,
          then start the delivery.
        </div>
      ` : ""}

      <div class="card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Receiver</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Delivery Fee</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${deliveries.length ? deliveries.map(d => {
                const patient = getUser(d.patientId);
                const phone = d.receiverPhone || patient?.phone || "";
                let action = "";

                if(currentUser.role === "rider"){
                  if(d.status === "Assigned"){
                    action = `<button class="btn btn-primary"
                      onclick="riderPickUpMedicine('${d.id}')">📦 Pick Up Medicine</button>`;
                  }else if(d.status === "Picked Up - Call Receiver"){
                    action = `
                      <button class="btn btn-primary"
                        onclick="riderConfirmPatientLocation('${d.id}')">
                        📞 Call Receiver & Confirm Location
                      </button>
                      ${phone ? `<a class="btn btn-secondary" href="tel:${escapeHTML(phone)}">📞 Call</a>` : ""}
                    `;
                  }else if(d.status === "In Transit"){
                    action = `<button class="btn btn-success"
                      onclick="riderMarkDelivered('${d.id}')">✅ Mark Delivered</button>`;
                  }else if(d.status === "Delivered"){
                    action = `<span class="badge badge-success">Completed</span>`;
                  }
                }

                if(currentUser.role === "patient"){
                  action = phone
                    ? `<a class="btn btn-secondary" href="tel:${escapeHTML(phone)}">📞 Contact Receiver</a>`
                    : "-";
                }

                return `
                  <tr>
                    <td>${escapeHTML(d.pharmacyOrderId || d.id)}</td>
                    <td>${escapeHTML(patient?.name || "-")}</td>
                    <td>${phone
                      ? `<a href="tel:${escapeHTML(phone)}">${escapeHTML(phone)}</a>`
                      : "-"}</td>
                    <td>
                      <strong>${escapeHTML(d.deliveryLocation || "Not confirmed")}</strong>
                      <br>
                      <span class="small">${escapeHTML(d.directions || "")}</span>
                    </td>
                    <td>${money(d.deliveryFee || 0)}</td>
                    <td>
                      <span class="badge ${statusClass(d.status)}">
                        ${escapeHTML(d.status || "-")}
                      </span>
                    </td>
                    <td>${action}</td>
                  </tr>
                `;
              }).join("") : `
                <tr>
                  <td colspan="7">
                    <div class="empty">
                      ${currentUser.role === "rider"
                        ? "No medicine deliveries have been assigned to you."
                        : "No medicine deliveries found."}
                    </div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  /* ---------- Rider dashboard ---------- */

  if(typeof window.renderRiderDashboard === "function"){
    const originalRiderDashboard = window.renderRiderDashboard;

    window.renderRiderDashboard = function(){
      const mine = db.deliveries.filter(d => d.riderId === currentUser.id);

      document.getElementById("content").innerHTML = `
        <h1 class="page-title">Rider Dashboard</h1>

        <div class="grid grid-4">
          <div class="stat-card">
            <div class="stat-title">Assigned</div>
            <div class="stat-number">${mine.filter(d => d.status === "Assigned").length}</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Picked Up / Call Receiver</div>
            <div class="stat-number">${mine.filter(d => d.status === "Picked Up - Call Receiver").length}</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">In Transit</div>
            <div class="stat-number">${mine.filter(d => d.status === "In Transit").length}</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Delivered</div>
            <div class="stat-number">${mine.filter(d => d.status === "Delivered").length}</div>
          </div>
        </div>

        <div class="card">
          <h3>Assigned Medicine Deliveries</h3>
          ${mine.length ? mine.map(d => {
            const p = getUser(d.patientId);
            const phone = d.receiverPhone || p?.phone || "";

            return `
              <div class="card" style="margin-top:12px">
                <strong>Order:</strong> ${escapeHTML(d.pharmacyOrderId || d.id)}<br>
                <strong>Receiver:</strong> ${escapeHTML(p?.name || "-")}<br>
                <strong>Phone:</strong>
                ${phone ? `<a href="tel:${escapeHTML(phone)}">${escapeHTML(phone)}</a>` : "-"}<br>
                <strong>Location:</strong> ${escapeHTML(d.deliveryLocation || "-")}<br>
                <strong>Directions:</strong> ${escapeHTML(d.directions || "-")}<br>
                <strong>Status:</strong>
                <span class="badge ${statusClass(d.status)}">${escapeHTML(d.status || "-")}</span>

                <div class="flex" style="margin-top:10px">
                  ${d.status === "Assigned"
                    ? `<button class="btn btn-primary"
                        onclick="riderPickUpMedicine('${d.id}')">📦 Pick Up Medicine</button>`
                    : ""}
                  ${d.status === "Picked Up - Call Receiver"
                    ? `<button class="btn btn-primary"
                        onclick="riderConfirmPatientLocation('${d.id}')">
                        📞 Call Receiver & Confirm Location
                       </button>`
                    : ""}
                  ${d.status === "In Transit"
                    ? `<button class="btn btn-success"
                        onclick="riderMarkDelivered('${d.id}')">✅ Mark Delivered</button>`
                    : ""}
                  ${phone
                    ? `<a class="btn btn-secondary"
                        href="tel:${escapeHTML(phone)}">📞 Call Receiver</a>`
                    : ""}
                </div>
              </div>
            `;
          }).join("") : `
            <div class="empty">No medicine deliveries assigned.</div>
          `}
        </div>
      `;
    };
  }

  /* ---------- Admin: monitoring only ---------- */

  window.renderAdminOrders = function(){
    if(currentUser?.role !== "admin"){
      navigate("dashboard");
      return;
    }

    const deliveries = db.deliveries.slice().reverse();

    document.getElementById("content").innerHTML = `
      <h1 class="page-title">Delivery Monitoring</h1>

      <div class="alert alert-info">
        The pharmacy controls delivery confirmation, payment checking,
        dispatch and rider assignment. This page is for monitoring only.
      </div>

      <div class="card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Patient</th>
                <th>Medicine Payment</th>
                <th>Delivery Fee</th>
                <th>Delivery Payment</th>
                <th>Rider</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${deliveries.length ? deliveries.map(d => {
                const p = getUser(d.patientId);
                const r = getUser(d.riderId);
                const medPaid =
                  pharmacyInvoice(d.pharmacyOrderId)?.status === "Paid" ||
                  d.medicinePaymentStatus === "Paid";

                return `
                  <tr>
                    <td>${escapeHTML(d.pharmacyOrderId || d.id)}</td>
                    <td>${escapeHTML(p?.name || "-")}</td>
                    <td><span class="badge ${medPaid ? "badge-success" : "badge-warning"}">
                      ${medPaid ? "PAID" : "Pending"}
                    </span></td>
                    <td>${money(d.deliveryFee || 0)}</td>
                    <td><span class="badge ${d.deliveryPaymentStatus === "Paid" ? "badge-success" : "badge-warning"}">
                      ${d.deliveryPaymentStatus === "Paid" ? "PAID" : (d.deliveryPaymentStatus || "Pending")}
                    </span></td>
                    <td>${escapeHTML(r?.name || "Not assigned")}</td>
                    <td><span class="badge ${statusClass(d.status)}">${escapeHTML(d.status || "-")}</span></td>
                  </tr>
                `;
              }).join("") : `
                <tr><td colspan="7"><div class="empty">No deliveries.</div></td></tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

})();



/* =========================================================
   V8 ENHANCEMENTS
   1. Laboratory Technician role (sees every lab request)
   2. Notification engine: bell + unread badge, live toasts,
      "while you were away" digest on login, browser alerts,
      and an SMS/e-mail message log (gateway hook included)
   3. Random, overlap-free assignment of doctors and nurses
   4. Clinical notes saved per patient + patient history
   5. Live captions / transcription / translation in consultations
   All overrides use window.X = function(){} and capture the
   previous version first, so nothing can recurse into itself.
========================================================= */
(function(){
"use strict";

const ROLE_LAB = "lab_technician";
const HOME_VISIT_MINUTES = 90;      /* a home visit blocks the nurse for this long */
const APPT_MINUTES = 45;
const V8 = window.V8 = {labFilter:"all", labQuery:"", notifScope:"mine", session:null, wideNext:false, recAll:false, translators:{}};

/* ---------- small helpers ---------- */
function $(id){ return document.getElementById(id); }
function esc(v){ return escapeHTML(v); }
function fmtDT(iso){ try{ return new Date(iso).toLocaleString([], {dateStyle:"medium", timeStyle:"short"}); }catch(e){ return iso||""; } }
function fmtClock(iso){ try{ return new Date(iso).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit", second:"2-digit"}); }catch(e){ return ""; } }
function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function roleName(r){ return r===ROLE_LAB ? "Laboratory Technician" : formatRole(r); }
function ensureDB(){
  ["outbox","notifications","labRequests","consultations","appointments","homeServices","invoices","doctorDaysOff","prescriptions","pharmacyOrders"].forEach(k=>{ if(!Array.isArray(db[k])) db[k]=[]; });
}
ensureDB();

/* Pull the latest bookings written by other tabs before we decide who is free. */
function rawSyncBookings(){
  try{
    const raw = localStorage.getItem(DB_KEY); if(!raw) return;
    const fresh = JSON.parse(raw);
    ["appointments","homeServices"].forEach(k=>{ if(Array.isArray(fresh[k])) db[k] = fresh[k]; });
  }catch(e){}
}
function syncBookings(){ rawSyncBookings(); releaseStaleBookings(); }   /* also frees slots held by unpaid bookings */

/* =========================================================
   FORMAT ROLE + DASHBOARD + SIDEBAR
========================================================= */
window.formatRole = function(role){
  const map = {admin:"Administrator", doctor:"Doctor", nurse:"Nursing Officer", pharmacist:"Pharmacist", rider:"Rider", patient:"Patient"};
  map[ROLE_LAB] = "Laboratory Technician";
  return map[role] || role;
};

const prevBuildSidebar = window.buildSidebar;
window.buildSidebar = function(){
  if(currentUser && currentUser.role===ROLE_LAB){
    $("sidebar").innerHTML = `
      <div class="sidebar-section">Main</div>
      <button data-page="dashboard" onclick="navigate('dashboard')">🏠 Dashboard</button>
      <div class="sidebar-section">Laboratory</div>
      <button data-page="laboratory" onclick="navigate('laboratory')">🧪 All Lab Requests</button>
      <button data-page="notifications" onclick="navigate('notifications')">🔔 Notifications</button>
      <div class="sidebar-section">Account</div>
      <button data-page="profile" onclick="navigate('profile')">👤 My Profile</button>`;
  }else{
    prevBuildSidebar();
    if(currentUser && currentUser.role==="doctor" && !document.querySelector('#sidebar [data-page="patient-records"]')){
      const anchor = document.querySelector('#sidebar [data-page="consultation"]');
      const b = document.createElement("button");
      b.setAttribute("data-page","patient-records"); b.setAttribute("onclick","navigate('patient-records')");
      b.textContent = "📋 Patient Records";
      if(anchor) anchor.after(b); else $("sidebar").appendChild(b);
    }
    if(currentUser && currentUser.role==="doctor" && !document.querySelector('#sidebar [data-page="days-off"]')){
      const anchor = document.querySelector('#sidebar [data-page="doctor-settings"]');
      const b = document.createElement("button");
      b.setAttribute("data-page","days-off"); b.setAttribute("onclick","navigate('days-off')");
      b.textContent = "🏖 Days Off";
      if(anchor) anchor.after(b); else $("sidebar").appendChild(b);
    }
    if(currentUser && currentUser.role==="admin" && !document.querySelector('#sidebar [data-page="outbox"]')){
      const anchor = document.querySelector('#sidebar [data-page="notifications"]');
      const b = document.createElement("button");
      b.setAttribute("data-page","outbox"); b.setAttribute("onclick","navigate('outbox')");
      b.textContent = "📨 Message Log (SMS/Email)";
      if(anchor) anchor.after(b); else $("sidebar").appendChild(b);
    }
  }
  refreshBell();
};

const prevRenderDashboard = window.renderDashboard;
window.renderDashboard = function(){
  if(currentUser && currentUser.role===ROLE_LAB){ renderLabDashboard(); return; }
  prevRenderDashboard();
};

const prevNavigate = window.navigate;
window.navigate = function(page){
  const custom = {"patient-records":["doctor",renderPatientRecords], "days-off":["doctor",renderDaysOff], "outbox":["admin",renderOutbox]};
  if(custom[page] && currentUser && currentUser.role===custom[page][0]){
    currentPage = page;
    document.querySelectorAll(".sidebar button[data-page]").forEach(b=>b.classList.toggle("active", b.dataset.page===page));
    $("sidebar")?.classList.remove("open");
    try{ custom[page][1](); }catch(err){ console.error(err); $("content").innerHTML = `<div class="card"><div class="alert alert-danger">Unable to load this page: ${esc(err.message)}</div></div>`; }
    refreshBell();
    return;
  }
  prevNavigate(page);
  refreshBell();
};

/* Modal: make the consultation room wider, reset for every other modal. */
const prevOpenModal = window.openModal;
window.openModal = function(){
  const mc = $("modalContent");
  if(mc){ if(V8.wideNext) mc.classList.add("v8-wide"); else mc.classList.remove("v8-wide"); }
  V8.wideNext = false;
  prevOpenModal();
};
const prevCloseModal = window.closeModal;
window.closeModal = function(){
  stopSession();
  prevCloseModal();
  $("modalContent")?.classList.remove("v8-wide");
};

const prevLogout = window.logout;
window.logout = function(){ stopSession(); prevLogout(); };

/* =========================================================
   NOTIFICATION ENGINE
========================================================= */
const TYPE_ICON = {booking:"📅", lab:"🧪", reminder:"⏰", result:"🧾", home:"🏠", info:"🔔", alert:"⚠️", consult:"🎥", payment:"💳"};
function iconFor(t){ return TYPE_ICON[t] || "🔔"; }
V8.seen = new Set();                       /* notification ids already shown/known on this device */
function markSeen(){ db.notifications.forEach(n=>V8.seen.add(n.id)); }
function unreadFor(userId){ return db.notifications.filter(n=>n.userId===userId && !n.read); }

/* Hospitals normally push alerts to a provider's phone. This demo has no SMS/email
   gateway, so every alert is also written to db.outbox (see admin "Message Log").
   To go live, set window.SEND_EXTERNAL_ALERT = function(user, message, entry){...}
   to call your SMS/email/push provider from a backend. */
function queueExternalAlert(userId, message, type){
  const u = getUser(userId); if(!u) return;
  const entry = {
    id: uid("msg"), userId, role:u.role, name:u.name, type,
    channel: u.phone && u.email ? "SMS + Email" : (u.phone ? "SMS" : "Email"),
    to: [u.phone, u.email].filter(Boolean).join(" / "),
    message, createdAt:new Date().toISOString(),
    status: typeof window.SEND_EXTERNAL_ALERT==="function" ? "Sent to gateway" : "Queued (demo – no gateway connected)"
  };
  db.outbox.push(entry);
  if(db.outbox.length>400) db.outbox.splice(0, db.outbox.length-400);
  if(typeof window.SEND_EXTERNAL_ALERT==="function"){ try{ window.SEND_EXTERNAL_ALERT(u, message, entry); }catch(e){ entry.status="Gateway error"; } }
}

window.notify = function(userId, message, type){
  type = type || "info";
  const n = {id:uid("notification"), userId, message, type, createdAt:new Date().toISOString(), read:false};
  db.notifications.push(n);
  queueExternalAlert(userId, message, type);
  saveDB();
  V8.seen.add(n.id);
  if(currentUser && currentUser.id===userId) pushToast(n);
  refreshBell();
};

function toastHost(){
  let h = $("v8Toasts");
  if(!h){ h = document.createElement("div"); h.id = "v8Toasts"; document.body.appendChild(h); }
  return h;
}
function pushToast(n){
  const h = toastHost();
  const el = document.createElement("div");
  el.className = "v8-toast";
  el.innerHTML = `<div class="v8-toast-title">${iconFor(n.type)} New notification</div><div>${esc(n.message)}</div><div class="v8-toast-time">Just now · click to open</div>`;
  el.onclick = ()=>{ el.remove(); navigate("notifications"); };
  h.appendChild(el);
  setTimeout(()=>el.remove(), 10000);
  while(h.children.length>4) h.firstChild.remove();
  try{
    if(document.hidden && "Notification" in window && Notification.permission==="granted"){
      new Notification("Beacon of Hope Hospital", {body:n.message});
    }
  }catch(e){}
}

function ensureBell(){
  const area = document.querySelector(".user-area");
  if(!area || $("v8Bell")) return;
  const b = document.createElement("button");
  b.id = "v8Bell"; b.className = "v8-bell"; b.type = "button"; b.title = "Notifications";
  b.setAttribute("onclick","navigate('notifications')");
  b.innerHTML = `🔔<span id="v8BellCount" class="v8-bell-count hidden">0</span>`;
  area.insertBefore(b, area.children[1] || null);
}
function refreshBell(){
  if(!currentUser) return;
  ensureBell();
  const n = unreadFor(currentUser.id).length;
  const c = $("v8BellCount");
  if(c){ c.textContent = n>99 ? "99+" : n; c.classList.toggle("hidden", n===0); }
  document.querySelectorAll('#sidebar button[data-page="notifications"]').forEach(btn=>{
    btn.querySelectorAll(".v8-badge").forEach(x=>x.remove());
    if(n>0){ const s = document.createElement("span"); s.className = "v8-badge"; s.textContent = n>99 ? "99+" : n; btn.appendChild(s); }
  });
  document.title = (n>0 ? `(${n}) ` : "") + "Beacon of Hope Hospital | Telemedicine";
}

function showDigest(){
  if(!currentUser || !$("modal")?.classList.contains("hidden")) return;   /* never replace a modal that is already open */
  const list = unreadFor(currentUser.id);
  if(!list.length) return;
  const shown = list.slice().reverse().slice(0,6);
  $("modalContent").innerHTML = `
    <h2>🔔 You have ${list.length} new notification${list.length>1?"s":""}</h2>
    <p class="text-muted">These arrived while you were away.</p>
    ${shown.map(n=>`<div class="alert alert-info"><strong>${iconFor(n.type)} ${esc(fmtDT(n.createdAt))}</strong><br>${esc(n.message)}</div>`).join("")}
    ${list.length>shown.length ? `<p class="small text-muted">…and ${list.length-shown.length} more.</p>` : ""}
    <button class="btn btn-primary" onclick="closeModal();navigate('notifications')">Open notifications</button>
    <button class="btn btn-secondary" onclick="closeModal()">Dismiss</button>`;
  openModal();
}

const prevOpenApp = window.openApp;
window.openApp = function(){
  prevOpenApp();
  markSeen();
  ensureBell(); refreshBell();
  startTick();
  try{ if("Notification" in window && Notification.permission==="default") Notification.requestPermission(); }catch(e){}
  setTimeout(showDigest, 350);
};

/* Live updates from other tabs/devices sharing this browser profile. */
window.addEventListener("storage", function(ev){
  if(ev.key!==DB_KEY || !ev.newValue || !currentUser) return;
  let fresh; try{ fresh = JSON.parse(ev.newValue); }catch(e){ return; }
  db = fresh; ensureDB();
  (db.notifications||[]).filter(n=>n.userId===currentUser.id && !n.read && !V8.seen.has(n.id)).forEach(n=>{ V8.seen.add(n.id); pushToast(n); });
  refreshBell();
  const modalOpen = !$("modal")?.classList.contains("hidden");
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||"");
  if(!modalOpen && !typing && ["dashboard","notifications","laboratory","appointments","consultation","patient-records"].includes(currentPage)){
    navigate(currentPage);
  }
});

window.renderNotifications = function(){
  const me = currentUser, isAdmin = me.role==="admin";
  const all = isAdmin && V8.notifScope==="all";
  const list = (all ? db.notifications : db.notifications.filter(n=>n.userId===me.id)).slice().reverse();
  const unreadCount = unreadFor(me.id).length;
  $("content").innerHTML = `
    <h1 class="page-title">Notifications
      <span class="flex">
        ${isAdmin ? `<button class="btn ${all?"btn-secondary":"btn-primary"}" onclick="V8.notifScope='mine';renderNotifications()">Mine</button>
                     <button class="btn ${all?"btn-primary":"btn-secondary"}" onclick="V8.notifScope='all';renderNotifications()">All hospital activity</button>` : ""}
        ${unreadCount ? `<button class="btn btn-secondary" onclick="v8MarkAllRead()">Mark all as read</button>` : ""}
      </span>
    </h1>
    <div class="card">
      ${list.length ? list.map(n=>{
        const who = all ? getUser(n.userId) : null;
        return `<div class="alert ${n.read?"alert-info v8-read":"alert-info v8-unread"}">
          <strong>${iconFor(n.type)} ${esc(fmtDT(n.createdAt))}</strong>${!n.read?` <span class="badge badge-danger">NEW</span>`:""}
          ${who ? `<span class="badge badge-dark">${esc(who.name)} · ${esc(roleName(who.role))}</span>` : ""}
          <br>${esc(n.message)}</div>`;
      }).join("") : `<div class="empty">No notifications.</div>`}
    </div>`;
  /* Opening the inbox marks the user's own notifications as read (the NEW tags stay for this view). */
  let changed = false;
  db.notifications.forEach(n=>{ if(n.userId===me.id && !n.read){ n.read = true; changed = true; } });
  if(changed){ saveDB(); refreshBell(); }
};
window.v8MarkAllRead = function(){
  db.notifications.forEach(n=>{ if(n.userId===currentUser.id) n.read = true; });
  saveDB(); refreshBell(); renderNotifications();
};

function renderOutbox(){
  const rows = db.outbox.slice().reverse().slice(0,150);
  $("content").innerHTML = `
    <h1 class="page-title">Message Log (SMS / Email)</h1>
    <div class="alert alert-warning"><strong>Demo mode:</strong> alerts are recorded here exactly as they would be sent to each person's phone and email, so providers are reached even before they open their dashboard.
      No SMS/email gateway is connected in this standalone file. A developer can connect one by defining <code>window.SEND_EXTERNAL_ALERT(user, message, entry)</code> (e.g. Africa's Talking, Twilio, or an email API called from a server).</div>
    <div class="card"><div class="table-wrap"><table>
      <thead><tr><th>Time</th><th>Recipient</th><th>Channel</th><th>To</th><th>Message</th><th>Status</th></tr></thead>
      <tbody>${rows.length ? rows.map(m=>`<tr><td>${esc(fmtDT(m.createdAt))}</td><td>${esc(m.name)}<div class="small text-muted">${esc(roleName(m.role))}</div></td><td>${esc(m.channel)}</td><td class="small">${esc(m.to)}</td><td>${esc(m.message)}</td><td><span class="badge badge-dark">${esc(m.status)}</span></td></tr>`).join("") : `<tr><td colspan="6"><div class="empty">No messages yet.</div></td></tr>`}</tbody>
    </table></div></div>`;
}

/* Wrap payments so lab staff and ordering doctors are alerted when a test is paid for. */
const prevHandlePaid = window.handlePaidInvoice;
window.handlePaidInvoice = function(invoice){
  prevHandlePaid(invoice);
  try{
    if(invoice && invoice.type==="Laboratory"){
      const r = db.labRequests.find(l=>l.invoiceId===invoice.id);
      if(r){
        const p = getUser(r.patientId);
        db.users.filter(u=>u.role===ROLE_LAB && u.enabled).forEach(t=>notify(t.id, `LAB PAID – ready to process: ${r.testName} for ${p?.name||"patient"} (request ${r.id}).`, "lab"));
        if(r.requestedBy) notify(r.requestedBy, `Lab payment received for ${p?.name||"your patient"}: ${r.testName}. The lab will now process it.`, "lab");
      }
    }
  }catch(e){ console.error(e); }
};

/* =========================================================
   LABORATORY TECHNICIAN
========================================================= */
function labInvoice(r){ return db.invoices.find(i=>i.id===r.invoiceId) || db.invoices.find(i=>i.labRequestId===r.id); }
function labPaid(r){
  const inv = labInvoice(r);
  return !!(inv && inv.status==="Paid") || /^Paid/.test(r.status||"") || r.status==="Processing" || r.status==="Completed";
}
function labStage(r){
  if(r.status==="Completed") return {key:"completed", label:"Completed", cls:"badge-success"};
  if(r.status==="Processing") return {key:"progress", label:"In Progress", cls:"badge-info"};
  if(labPaid(r)) return {key:"ready", label:"Ready to Process", cls:"badge-warning"};
  return {key:"unpaid", label:"Awaiting Payment", cls:"badge-dark"};
}
function labRequestsFor(user){
  if(user.role===ROLE_LAB || user.role==="admin") return db.labRequests.slice();
  if(user.role==="patient") return db.labRequests.filter(l=>l.patientId===user.id);
  if(user.role==="doctor") return db.labRequests.filter(l=>l.requestedBy===user.id || (!l.requestedBy && getUser(l.patientId)?.role==="doctor"));
  return [];
}

function renderLabDashboard(){
  const all = db.labRequests.slice();
  const c = {unpaid:0, ready:0, progress:0, completed:0};
  all.forEach(r=>c[labStage(r).key]++);
  const urgent = all.filter(r=>r.urgency==="Urgent" && labStage(r).key!=="completed" && labStage(r).key!=="unpaid").length;
  const recent = all.slice().sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt))).slice(0,8);
  $("content").innerHTML = `
    <h1 class="page-title">Laboratory — ${esc(currentUser.name)}</h1>
    <p class="text-muted">Every laboratory request raised by doctors appears here as soon as it is made.</p>
    <div class="grid grid-4">
      <div class="card"><div class="text-muted small">Ready to process</div><h1 style="margin:6px 0">${c.ready}</h1></div>
      <div class="card"><div class="text-muted small">In progress</div><h1 style="margin:6px 0">${c.progress}</h1></div>
      <div class="card"><div class="text-muted small">Awaiting payment</div><h1 style="margin:6px 0">${c.unpaid}</h1></div>
      <div class="card"><div class="text-muted small">Completed</div><h1 style="margin:6px 0">${c.completed}</h1></div>
    </div>
    ${urgent ? `<div class="alert alert-danger"><strong>${urgent} urgent request${urgent>1?"s":""}</strong> waiting to be processed.</div>` : ""}
    <div class="card">
      <div class="flex space-between"><h3 style="margin:0">Latest requests</h3><button class="btn btn-primary" onclick="navigate('laboratory')">Open all requests</button></div>
      ${labTableHTML(recent, ROLE_LAB)}
    </div>`;
}

function labTableHTML(requests, role){
  const isStaff = role===ROLE_LAB || role==="admin";
  const head = isStaff
    ? "<th>Request</th><th>Requested</th><th>Patient</th><th>Requested by</th><th>Test</th><th>Priority</th><th>Clinical notes</th><th>Payment</th><th>Stage</th><th>Action</th>"
    : (role==="doctor"
        ? "<th>Request</th><th>Requested</th><th>Patient</th><th>Test</th><th>Stage</th><th>Result</th><th>Action</th>"
        : "<th>Request</th><th>Requested</th><th>Test</th><th>Stage</th><th>Result</th><th>Action</th>");
  const cols = head.split("<th>").length-1;
  const rows = requests.slice().sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt))).map(r=>{
    const p = getUser(r.patientId), d = getUser(r.requestedBy), st = labStage(r), paid = labPaid(r);
    const q = `${p?.name||""} ${r.testName||""} ${d?.name||""} ${r.id}`.toLowerCase();
    const view = r.result && st.key==="completed" ? `<button class="btn btn-success" onclick="viewLabResult('${r.id}')">View Result</button>` : "";
    let action = view;
    if(role===ROLE_LAB){
      if(st.key==="unpaid") action = `<span class="small text-muted">Waiting for payment</span>`;
      else if(st.key==="completed") action = view;
      else action = `<button class="btn btn-primary" onclick="processLab('${r.id}')">${st.key==="progress"?"Enter Result":"Process"}</button>`;
    }
    action += ` <button class="btn btn-secondary" onclick="v8PrintLab('${r.id}')">🖨 Print</button>`;
    if(isStaff){
      return `<tr data-stage="${st.key}" data-q="${esc(q)}"><td class="small">${esc(r.id.slice(-10))}</td><td>${esc(fmtDT(r.createdAt))}</td><td>${esc(p?.name||"-")}<div class="small text-muted">${esc(p?.phone||"")}</div></td>
        <td>${esc(d?.name||"-")}</td><td>${esc(r.testName)}</td><td>${r.urgency==="Urgent"?`<span class="badge badge-danger">URGENT</span>`:`<span class="badge badge-dark">Routine</span>`}</td>
        <td class="small">${esc(r.notes||"-")}</td><td><span class="badge ${paid?"badge-success":"badge-warning"}">${paid?"Paid":"Unpaid"}</span></td>
        <td><span class="badge ${st.cls}">${st.label}</span></td><td>${action}</td></tr>`;
    }
    if(role==="doctor"){
      return `<tr data-stage="${st.key}" data-q="${esc(q)}"><td class="small">${esc(r.id.slice(-10))}</td><td>${esc(fmtDT(r.createdAt))}</td><td>${esc(p?.name||"-")}</td><td>${esc(r.testName)}</td>
        <td><span class="badge ${st.cls}">${st.label}</span></td><td>${r.result&&st.key==="completed"?"Available":"Pending"}</td><td>${action}</td></tr>`;
    }
    return `<tr data-stage="${st.key}" data-q="${esc(q)}"><td class="small">${esc(r.id.slice(-10))}</td><td>${esc(fmtDT(r.createdAt))}</td><td>${esc(r.testName)}</td>
      <td><span class="badge ${st.cls}">${st.label}</span></td><td>${r.result&&st.key==="completed"?"Available":"Pending"}</td><td>${action}</td></tr>`;
  }).join("");
  return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody id="labBody">${rows || `<tr><td colspan="${cols}"><div class="empty">No laboratory requests.</div></td></tr>`}</tbody></table></div>`;
}

window.v8LabFilter = function(key){ V8.labFilter = key; applyLabFilter(); document.querySelectorAll(".v8-chip").forEach(c=>c.classList.toggle("active", c.dataset.k===key)); };
window.v8LabSearch = function(v){ V8.labQuery = (v||"").toLowerCase(); applyLabFilter(); };
function applyLabFilter(){
  document.querySelectorAll("#labBody tr[data-stage]").forEach(tr=>{
    const okStage = V8.labFilter==="all" || tr.dataset.stage===V8.labFilter;
    const okQ = !V8.labQuery || (tr.dataset.q||"").includes(V8.labQuery);
    tr.style.display = okStage && okQ ? "" : "none";
  });
}

window.renderLaboratory = function(){
  const role = currentUser.role;
  const requests = labRequestsFor(currentUser);
  const counts = {all:requests.length, unpaid:0, ready:0, progress:0, completed:0};
  requests.forEach(r=>counts[labStage(r).key]++);
  const staff = role===ROLE_LAB || role==="admin";
  const intro =
    role===ROLE_LAB ? `<div class="alert alert-info">You can see <strong>all</strong> laboratory requests. Tests can be processed once the patient has paid.</div>` :
    role==="doctor" ? `<div class="alert alert-info">Request tests for your patients. The laboratory technician is notified immediately and you are notified when the result is ready.</div>` :
    role==="patient" ? `<div class="alert alert-info">Laboratory tests are requested by your doctor. Pay the laboratory invoice under Payments; results appear here once ready.</div>` : "";
  $("content").innerHTML = `
    <h1 class="page-title">Laboratory ${role==="doctor" ? `<button class="btn btn-primary" onclick="showLabForm()">+ Request Laboratory Test</button>` : ""}</h1>
    ${intro}
    <div class="card">
      ${staff ? `<div class="flex" style="margin-bottom:12px">
        ${[["all","All"],["ready","Ready to process"],["progress","In progress"],["unpaid","Awaiting payment"],["completed","Completed"]].map(([k,l])=>`<button type="button" class="v8-chip ${V8.labFilter===k?"active":""}" data-k="${k}" onclick="v8LabFilter('${k}')">${l} (${counts[k]})</button>`).join("")}
        <input class="form-control" style="max-width:260px;margin-left:auto" placeholder="Search patient, test, doctor…" value="${esc(V8.labQuery)}" oninput="v8LabSearch(this.value)">
      </div>` : ""}
      ${labTableHTML(requests, role)}
    </div>`;
  applyLabFilter();
};

/* Doctor requests a test FOR a patient (the old form wrongly billed the doctor). */
window.showLabForm = function(){
  if(currentUser.role!=="doctor"){ alert("Only doctors can request laboratory tests."); return; }
  const patients = db.users.filter(u=>u.role==="patient" && u.enabled);
  const mine = new Set(db.appointments.filter(a=>a.doctorId===currentUser.id).map(a=>a.patientId));
  const opt = p=>`<option value="${p.id}">${esc(p.name)} — ${esc(p.phone||"")}</option>`;
  $("modalContent").innerHTML = `
    <h2>Request Laboratory Test</h2>
    <form onsubmit="createLabRequest(event)">
      <div class="form-group"><label>Patient</label>
        <select id="labPatient" class="form-control" required>
          <option value="">Select patient</option>
          ${patients.some(p=>mine.has(p.id)) ? `<optgroup label="My patients">${patients.filter(p=>mine.has(p.id)).map(opt).join("")}</optgroup>` : ""}
          <optgroup label="${mine.size?"Other patients":"All patients"}">${patients.filter(p=>!mine.has(p.id)).map(opt).join("")}</optgroup>
        </select></div>
      <div class="grid grid-2">
        <div class="form-group"><label>Laboratory Test</label>
          <select id="labTest" class="form-control" required><option value="">Select test</option>${LAB_TESTS.map(t=>`<option value="${esc(t.name)}">${esc(t.name)} — ${money(t.price)}</option>`).join("")}</select></div>
        <div class="form-group"><label>Priority</label>
          <select id="labUrgency" class="form-control"><option>Routine</option><option>Urgent</option></select></div>
      </div>
      <div class="form-group"><label>Clinical indication / notes for the lab</label><textarea id="labNotes" class="form-control" rows="4" placeholder="e.g. fever for 3 days, suspected malaria"></textarea></div>
      <div class="alert alert-info">The patient receives a laboratory invoice to pay. The laboratory technician sees the request immediately and processes it after payment.</div>
      <button class="btn btn-primary">Submit Request</button><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    </form>`;
  openModal();
};

window.createLabRequest = function(e){
  e.preventDefault();
  if(currentUser.role!=="doctor") return;
  const patientId = $("labPatient").value, testName = $("labTest").value;
  const patient = getUser(patientId), test = LAB_TESTS.find(t=>t.name===testName);
  if(!patient || !test){ alert("Please select a patient and a test."); return; }
  const urgency = $("labUrgency").value;
  const request = {id:uid("lab"), patientId, requestedBy:currentUser.id, testName, notes:$("labNotes").value, urgency, status:"Requested", result:null, createdAt:new Date().toISOString()};
  db.labRequests.push(request);
  const invoice = {id:uid("invoice"), invoiceNumber:invoiceNumber("LAB"), type:"Laboratory", patientId, labRequestId:request.id,
    items:[{description:testName, quantity:1, unitPrice:test.price}], total:test.price, status:"Pending", createdAt:new Date().toISOString()};
  db.invoices.push(invoice); request.invoiceId = invoice.id;
  db.users.filter(u=>u.role===ROLE_LAB && u.enabled).forEach(t=>notify(t.id, `${urgency==="Urgent"?"URGENT ":""}NEW LAB REQUEST: ${testName} for ${patient.name}, requested by ${currentUser.name}. Payment is pending.`, "lab"));
  notify(patientId, `${currentUser.name} requested a laboratory test (${testName}). Please pay invoice ${invoice.invoiceNumber} so the lab can process it.`, "lab");
  notifyAllAdmins(`New laboratory request ${request.id}: ${testName} for ${patient.name}.`);
  saveDB(); closeModal();
  alert("Laboratory request sent to the laboratory technician. The patient has been asked to pay the invoice.");
  renderLaboratory();
  pushActionToast("Lab request sent.", "🖨 Print request form", ()=>v8PrintLab(request.id));
};

window.processLab = function(requestId){
  if(currentUser.role!==ROLE_LAB){ alert("Only the laboratory technician can process laboratory requests."); return; }
  const r = db.labRequests.find(x=>x.id===requestId); if(!r) return;
  if(!labPaid(r)){ alert("This request has not been paid for yet. It can be processed once the patient pays."); return; }
  const p = getUser(r.patientId), d = getUser(r.requestedBy);
  $("modalContent").innerHTML = `
    <h2>Process Laboratory Request</h2>
    <div class="card" style="margin-bottom:14px">
      <p><strong>Test:</strong> ${esc(r.testName)} ${r.urgency==="Urgent"?`<span class="badge badge-danger">URGENT</span>`:""}</p>
      <p><strong>Patient:</strong> ${esc(p?.name||"-")} (${esc(p?.phone||"-")})</p>
      <p><strong>Requested by:</strong> ${esc(d?.name||"-")}</p>
      <p style="margin:0"><strong>Clinical notes:</strong> ${esc(r.notes||"-")}</p>
    </div>
    <div class="form-group"><label>Status</label>
      <select id="labStatus" class="form-control"><option ${r.status==="Processing"?"selected":""}>Processing</option><option>Completed</option></select></div>
    <div class="form-group"><label>Result</label><textarea id="labResult" class="form-control" rows="7" placeholder="Enter findings, values and units…">${esc(r.result||"")}</textarea></div>
    <button class="btn btn-primary" onclick="saveLab('${r.id}')">Save</button>
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>`;
  openModal();
};

window.saveLab = function(requestId){
  if(currentUser.role!==ROLE_LAB) return;
  const r = db.labRequests.find(x=>x.id===requestId); if(!r) return;
  const status = $("labStatus").value, result = $("labResult").value.trim();
  if(status==="Completed" && !result){ alert("Please enter the result before marking the test as completed."); return; }
  r.status = status; r.result = result || null; r.resultDate = new Date().toISOString();
  r.processedBy = currentUser.id; r.processedByName = currentUser.name;
  const p = getUser(r.patientId);
  if(status==="Completed"){
    notify(r.patientId, `Your laboratory result for ${r.testName} is ready. Open Laboratory Results to view it.`, "result");
    if(r.requestedBy) notify(r.requestedBy, `LAB RESULT READY: ${r.testName} for ${p?.name||"your patient"}.`, "result");
  }else if(r.requestedBy){
    notify(r.requestedBy, `Lab update: ${r.testName} for ${p?.name||"your patient"} is now being processed.`, "lab");
  }
  saveDB(); closeModal(); renderLaboratory();
};

window.viewLabResult = function(requestId){
  const r = db.labRequests.find(x=>x.id===requestId); if(!r) return;
  const p = getUser(r.patientId), d = getUser(r.requestedBy);
  $("modalContent").innerHTML = `
    <h2>Laboratory Result</h2>
    <p><strong>${esc(r.testName)}</strong></p>
    <p class="small text-muted">Patient: ${esc(p?.name||"-")} · Requested by: ${esc(d?.name||"-")}<br>
      ${r.resultDate?`Resulted: ${esc(fmtDT(r.resultDate))}`:""} ${r.processedByName?` · Lab: ${esc(r.processedByName)}`:""}</p>
    <div class="card" style="white-space:pre-wrap">${esc(r.result||"No result available.")}</div>
    <button class="btn btn-primary" onclick="v8PrintLab('${r.id}')">🖨 Print</button>
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>`;
  openModal();
};

/* =========================================================
   RANDOM, OVERLAP-FREE ASSIGNMENT
   Patients no longer pick a provider. The system picks one at random from
   the providers who are genuinely free for the whole slot.
========================================================= */
function apptRange(a){
  const s = timeToMinutes(a.time);
  return [s, a.endTime ? timeToMinutes(a.endTime) : s+APPT_MINUTES];
}
function doctorIsFree(doc, date, time){
  if(!doc || !doc.enabled) return false;
  if(isDoctorOff(doc.id, date)) return false;                              /* doctor marked this day off */
  if(doctorProviderBusy(doc.id, date, time)) return false;                 /* 45-min overlap check */
  return getDoctorAppointments(doc.id, date).length < getDoctorMaxBookings(doc.id, date);   /* daily cap */
}
function freeDoctors(date, time){
  return db.users.filter(u=>u.role==="doctor" && u.enabled && doctorIsFree(u, date, time));
}
function patientIsBusy(patientId, date, time, excludeId){
  const s = timeToMinutes(time), e = s+APPT_MINUTES;
  return db.appointments.some(a=>a.id!==excludeId && a.patientId===patientId && a.date===date && a.status!=="Cancelled" && overlap(s,e,...apptRange(a)));
}
function isPast(date, time){ return new Date(`${date}T${time}`) < new Date(); }

/* Nearby times (same day) with at least one doctor free and the patient free. */
function suggestSlots(date, time, patientId, excludeId, max){
  const out = [];
  const start = timeToMinutes(time);
  for(let m=HOSPITAL_BOOKING_OPEN_MINUTES; m<=HOSPITAL_BOOKING_CLOSE_MINUTES - 0; m+=15){
    const t = minutesToTime(m);
    if(m===start || isPast(date,t)) continue;
    if(patientId && patientIsBusy(patientId,date,t,excludeId)) continue;
    if(freeDoctors(date,t).length) out.push({t, d:Math.abs(m-start)});
  }
  return out.sort((a,b)=>a.d-b.d).slice(0,max||4).map(x=>x.t).sort();
}

window.v8CheckSlot = function(){
  const box = $("bookAvail"); if(!box) return;
  const date = $("bookDate")?.value, time = $("bookTime")?.value;
  if(!date || !time){ box.className="alert alert-info"; box.textContent="Choose a date and start time to check availability."; return; }
  if(new Date(`${date}T00:00:00`).getDay()===0){ box.className="alert alert-warning"; box.textContent="No services on Sunday. Please choose Monday to Saturday."; return; }
  const m = timeToMinutes(time);
  if(m<HOSPITAL_BOOKING_OPEN_MINUTES || m>HOSPITAL_BOOKING_CLOSE_MINUTES){ box.className="alert alert-warning"; box.textContent="Services run 8:00 AM to 5:00 PM."; return; }
  if(isPast(date,time)){ box.className="alert alert-warning"; box.textContent="That time has already passed. Please choose a future time."; return; }
  syncBookings();
  const n = freeDoctors(date,time).length;
  if(n){
    box.className = "alert alert-success";
    box.innerHTML = `✅ A clinical provider is available for ${esc(time)}–${esc(addMinutesToTime(time,APPT_MINUTES))}. One will be assigned to you automatically.`;
  }else{
    const alt = suggestSlots(date,time,currentUser?.id,"",4);
    box.className = "alert alert-warning";
    box.innerHTML = `No provider is free at ${esc(time)}. ` + (alt.length
      ? `Nearest available times: ${alt.map(t=>`<button type="button" class="v8-chip" onclick="v8UseTime('${t}')">${t}</button>`).join(" ")}`
      : `Please try another date.`);
  }
};
window.v8UseTime = function(t){ const i = $("bookTime"); if(i){ i.value = t; v8CheckSlot(); } };

window.showBookingForm = function(){
  const services = getActiveServices("Telemedicine / Consultation");
  $("modalContent").innerHTML = `
    <h2>Book an Appointment</h2>
    <div class="alert alert-info"><strong>Consultation & follow-up fees</strong><br>Select the service you need. The fee is shown before you confirm.</div>
    <div class="alert alert-warning"><strong>Automatic provider assignment:</strong> a clinical provider who is free for the full 45-minute slot is assigned to you at random, so appointments never overlap.<br><strong>Pay within 2 hours:</strong> unpaid bookings are released automatically so the slot can go to someone else.</div>
    <form onsubmit="createAppointment(event)">
      <div class="form-group"><label>Appointment Type</label><select id="bookType" class="form-control" required><option>Video Consultation</option><option>Audio Consultation</option><option>Physical Hospital Visit</option></select></div>
      <div class="form-group"><label>Consultation / Follow-up Service</label>
        <select id="bookConsultationService" class="form-control" onchange="updateConsultationFeeDisplay()" required>
          <option value="">Select service</option>
          ${services.map((x,i)=>`<option value="${i}">${esc(x.name)} — ${esc(x.priceLabel||money(x.price))}</option>`).join("")}
        </select></div>
      <div id="consultationFeeDisplay" class="alert alert-info" style="display:none"></div>
      <div class="grid grid-2">
        <div class="form-group"><label>Date</label><input id="bookDate" type="date" min="${today()}" class="form-control" onchange="v8CheckSlot()" required></div>
        <div class="form-group"><label>Start Time</label><input id="bookTime" type="time" step="900" min="08:00" max="17:00" class="form-control" onchange="v8CheckSlot()" required></div>
      </div>
      <div id="bookAvail" class="alert alert-info">Choose a date and start time to check availability.</div>
      <div class="form-group"><label>Reason / Notes (optional)</label><textarea id="bookReason" class="form-control" rows="3" placeholder="Brief reason for the visit"></textarea></div>
      <button class="btn btn-primary">Book Appointment</button><button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    </form>`;
  openModal();
  applyHospitalBookingWindow("bookDate","bookTime");
};

window.updateConsultationFeeDisplay = function(){
  const sel = $("bookConsultationService"), box = $("consultationFeeDisplay"); if(!sel||!box) return;
  const item = getActiveServices("Telemedicine / Consultation")[Number(sel.value)];
  if(!item){ box.style.display="none"; return; }
  box.style.display = "block";
  box.innerHTML = `<strong>Selected service:</strong> ${esc(item.name)}<br><strong>Fee:</strong> ${esc(item.priceLabel||money(item.price))}`;
};

window.createAppointment = function(e){
  e.preventDefault();
  if(currentUser.role!=="patient"){ alert("Only patients can book appointments."); return; }
  const type = $("bookType").value, date = $("bookDate").value, time = $("bookTime").value;
  const svc = getActiveServices("Telemedicine / Consultation")[Number($("bookConsultationService")?.value)];
  if(!date || !time || !svc){ alert("Please select the consultation/follow-up service, date and time."); return; }
  if(!validateHospitalBookingWindow(date,time,"appointment")) return;
  if(isPast(date,time)){ alert("Please choose a future date and time."); return; }
  syncBookings();
  if(patientIsBusy(currentUser.id,date,time)){ alert("You already have another appointment during this time."); return; }
  const candidates = freeDoctors(date,time);
  if(!candidates.length){
    const alt = suggestSlots(date,time,currentUser.id,"",4);
    alert(`No clinical provider is free at ${time} on ${date}.` + (alt.length ? ` Nearest available times: ${alt.join(", ")}.` : " Please try another date."));
    v8CheckSlot(); return;
  }
  const doctor = pickRandom(candidates);                       /* ← random assignment */
  const appointment = {id:uid("appointment"), patientId:currentUser.id, doctorId:doctor.id, autoAssigned:true,
    specialty:doctor.specialty||"Clinical Provider", date, time, endTime:addMinutesToTime(time,APPT_MINUTES), durationMinutes:APPT_MINUTES,
    type, consultationService:svc.name, consultationFee:svc.price, reason:$("bookReason")?.value||"", status:"Pending Payment", createdAt:new Date().toISOString()};
  db.appointments.push(appointment);
  const invoice = {id:uid("invoice"), invoiceNumber:invoiceNumber(type==="Physical Hospital Visit"?"PHYS":"CONS"), type:"Consultation", appointmentId:appointment.id, patientId:currentUser.id,
    items:[{description:`${svc.name} — ${doctor.specialty||"Clinical Provider"}`, quantity:1, unitPrice:Number(svc.price)}], total:Number(svc.price), status:"Pending", paymentMethod:null, transactionReference:null, createdAt:new Date().toISOString()};
  db.invoices.push(invoice);
  /* Everybody concerned is alerted immediately – the provider does not need to be logged in. */
  notify(doctor.id, `NEW APPOINTMENT ASSIGNED TO YOU: ${currentUser.name} – ${type} on ${date} at ${time} (${svc.name}). Awaiting patient payment.`, "booking");
  notify(currentUser.id, `${type} booked for ${date} at ${time} with ${doctor.name}. Please pay invoice ${invoice.invoiceNumber} to confirm.`, "booking");
  notifyAllAdmins(`NEW BOOKING: ${currentUser.name} booked ${type} for ${date} at ${time}. Auto-assigned to ${doctor.name}.`);
  saveDB(); closeModal();
  alert(`Appointment booked for ${date} at ${time}.\nYour clinical provider: ${doctor.name}.\nPlease pay within 2 hours to confirm, or the slot is released.`);
  navigate("invoices");
};

window.rescheduleAppointment = function(e,id){
  e.preventDefault();
  const a = db.appointments.find(x=>x.id===id); if(!a) return;
  const d = $("resDate").value, t = $("resTime").value;
  if(!validateHospitalBookingWindow(d,t,"rescheduled appointment")) return;
  if(new Date(`${d}T${t}`) <= new Date(`${a.date}T${a.time}`)){ alert("Please choose a later date/time than the current appointment."); return; }
  syncBookings();
  if(patientIsBusy(a.patientId,d,t,a.id)){ alert("You already have another appointment during this time."); return; }
  const free = db.users.filter(u=>u.role==="doctor" && u.enabled && !isDoctorOff(u.id,d) && !doctorProviderBusy(u.id,d,t,a.id) &&
    db.appointments.filter(x=>x.id!==a.id && x.doctorId===u.id && x.date===d && x.status!=="Cancelled").length < getDoctorMaxBookings(u.id,d));
  if(!free.length){ alert("No clinical provider is free at that time. Please choose another time."); return; }
  const keep = free.find(u=>u.id===a.doctorId);               /* keep the same doctor if they are free, else random */
  const doc = keep || pickRandom(free);
  const oldDoc = a.doctorId, oldStamp = `${a.date} at ${a.time}`;
  a.doctorId = doc.id; a.specialty = doc.specialty||a.specialty;
  a.date = d; a.time = t; a.endTime = addMinutesToTime(t,APPT_MINUTES); a.rescheduledAt = new Date().toISOString();
  a.rem24P = a.rem24D = a.rem1P = a.rem1D = null;           /* reminders restart for the new time */
  a.status = a.status==="Confirmed" ? "Confirmed" : "Pending Payment";
  if(oldDoc!==doc.id) notify(oldDoc, `Appointment on ${oldStamp} was rescheduled and reassigned to another provider.`, "booking");
  notify(doc.id, `APPOINTMENT ${oldDoc!==doc.id?"ASSIGNED TO YOU (RESCHEDULED)":"RESCHEDULED"}: ${getUser(a.patientId)?.name||"Patient"} – now ${d} at ${t}.`, "booking");
  notify(a.patientId, `Your appointment is now ${d} at ${t} with ${doc.name}.`, "booking");
  notifyAllAdmins(`APPOINTMENT RESCHEDULED: ${getUser(a.patientId)?.name||"Patient"} is now ${d} at ${t} with ${doc.name}.`);
  saveDB(); closeModal(); alert(`Appointment rescheduled to ${d} at ${t} with ${doc.name}.`); navigate("appointments");
};

/* ---------- Nursing officers (home services & assessments) ---------- */
window.isHomeProviderBusy = function(providerId,date,time,excludeId){
  if(!providerId || !date || !time) return false;
  const s = timeToMinutes(time), e = s+HOME_VISIT_MINUTES;
  return db.homeServices.some(h=>{
    if(h.id===excludeId || h.providerId!==providerId || h.date!==date) return false;
    if(["Cancelled","Completed","Not Suitable"].includes(h.status)) return false;
    const hs = timeToMinutes(h.time);
    return overlap(s,e,hs,hs+HOME_VISIT_MINUTES);
  });
};
function freeNurses(date,time){
  return db.users.filter(u=>u.role==="nurse" && u.enabled && u.homeServiceProvider && !isHomeProviderBusy(u.id,date,time));
}
function assignNurse(date,time){ syncBookings(); const f = freeNurses(date,time); return f.length ? pickRandom(f) : null; }

/* Replace the "choose a nursing officer" dropdown by an automatic-assignment notice. */
function autoNurseUI(selectId,dateId,timeId){
  const sel = $(selectId); if(!sel) return;
  sel.required = false;
  const group = sel.closest(".form-group"); if(group) group.style.display = "none";
  const info = document.createElement("div");
  info.className = "alert alert-info"; info.id = selectId+"_auto";
  info.innerHTML = `🩺 A nursing officer is assigned to you automatically. <span id="${selectId}_availText"></span>`;
  (group||sel).after(info);
  const upd = ()=>{
    const d = $(dateId)?.value, t = $(timeId)?.value, span = $(selectId+"_availText"); if(!span) return;
    if(!d || !t){ span.textContent = ""; return; }
    syncBookings();
    const n = freeNurses(d,t).length;
    span.innerHTML = n ? `<strong style="color:#166534">✅ A nursing officer is available at that time.</strong>`
                       : `<strong style="color:#92400E">No nursing officer is free then (visits take about ${HOME_VISIT_MINUTES} minutes). Please choose another time.</strong>`;
  };
  [$(dateId),$(timeId)].forEach(el=>{ if(el){ el.addEventListener("change",upd); el.addEventListener("input",upd); } });
  upd();
}
function setAutoNurse(selectId,nurse){
  const sel = $(selectId); if(!sel) return;
  sel.innerHTML = `<option value="${nurse.id}" selected>${esc(nurse.name)}</option>`;
  sel.value = nurse.id;
}

const prevShowHomeServiceForm = window.showHomeServiceForm;
window.showHomeServiceForm = function(){ prevShowHomeServiceForm.apply(this, arguments); autoNurseUI("homeProvider","homeDate","homeTime"); };
const prevShowHomeAssessmentForm = window.showHomeAssessmentForm;
window.showHomeAssessmentForm = function(){ prevShowHomeAssessmentForm.apply(this, arguments); autoNurseUI("assessmentProvider","assessmentDate","assessmentTime"); };

const prevCreateHomeService = window.createHomeService;
window.createHomeService = function(e){
  const date = $("homeDate")?.value, time = $("homeTime")?.value;
  if(date && time){
    if(!validateHospitalBookingWindow(date,time,"home service")){ e.preventDefault(); return; }
    const nurse = assignNurse(date,time);
    if(!nurse){ e.preventDefault(); alert("No nursing officer is free at that time. Please choose another time."); return; }
    setAutoNurse("homeProvider",nurse);
  }
  const before = db.homeServices.length;
  prevCreateHomeService(e);
  if(db.homeServices.length>before){
    const h = db.homeServices[db.homeServices.length-1];
    const p = getUser(h.patientId);
    notify(h.providerId, `NEW HOME SERVICE ASSIGNED TO YOU: ${h.service} for ${p?.name||"patient"} on ${h.date} at ${h.time}. Location: ${h.address||p?.address||"-"}. Awaiting payment.`, "home");
    notify(h.patientId, `Your home service is booked for ${h.date} at ${h.time}. Nursing officer: ${getUser(h.providerId)?.name||"-"}.`, "home");
  }
};

const prevCreateHomeAssessment = window.createHomeAssessment;
window.createHomeAssessment = function(e){
  const date = $("assessmentDate")?.value, time = $("assessmentTime")?.value;
  if(date && time){
    if(!validateHospitalBookingWindow(date,time,"home assessment")){ e.preventDefault(); return; }
    const nurse = assignNurse(date,time);
    if(!nurse){ e.preventDefault(); alert("No nursing officer is free at that time. Please choose another time."); return; }
    setAutoNurse("assessmentProvider",nurse);
  }
  prevCreateHomeAssessment(e);     /* the original already notifies the assigned nurse */
};

/* =========================================================
   CLINICAL NOTES + PATIENT HISTORY
========================================================= */
function consultByAppt(apptId){ return db.consultations.find(c=>c.appointmentId===apptId); }
function getOrCreateConsult(a){
  let c = consultByAppt(a.id);
  if(!c){
    c = {id:uid("consultation"), appointmentId:a.id, patientId:a.patientId, doctorId:a.doctorId, type:a.type, date:a.date, createdAt:new Date().toISOString(), durationMinutes:0, clinicalNotes:"", diagnosis:"", notesHistory:[], transcript:[]};
    db.consultations.push(c);
  }
  return c;
}
function stamp(c){ return c.endedAt || c.updatedAt || c.createdAt || ""; }
function patientHistory(patientId, excludeApptId){
  return db.consultations
    .filter(c=>c.patientId===patientId && c.appointmentId!==excludeApptId &&
      ((c.clinicalNotes||"").trim() || (c.diagnosis||"").trim() || (c.transcript&&c.transcript.length)))
    .sort((a,b)=>String(stamp(b)).localeCompare(String(stamp(a))));
}
function historyHTML(items){
  if(!items.length) return `<div class="empty">No previous clinical notes for this patient.</div>`;
  return items.map(c=>{
    const a = db.appointments.find(x=>x.id===c.appointmentId), d = getUser(c.doctorId);
    const lines = c.transcript||[];
    return `<div class="v8-hist">
      <div class="flex space-between"><strong>${esc(a?.date || (c.createdAt||"").slice(0,10))}${a?.time?" · "+esc(a.time):""}</strong>
        <span class="badge badge-dark">${esc(c.type||a?.type||"Consultation")}</span></div>
      <div class="small text-muted">Seen by ${esc(d?.name||"-")}${c.endedAt?` · ended ${esc(fmtDT(c.endedAt))}`:" · notes saved, visit not ended"}</div>
      ${c.diagnosis?`<div style="margin-top:6px"><strong>Diagnosis / impression:</strong> ${esc(c.diagnosis)}</div>`:""}
      <div style="white-space:pre-wrap;margin-top:6px">${esc(c.clinicalNotes||"(no written notes)")}</div>
      ${lines.length?`<details style="margin-top:8px"><summary class="small"><strong>Consultation transcript (${lines.length} lines)</strong></summary>
        <div class="v8-hist-tr">${lines.map(l=>`<div><span class="small text-muted">${esc(fmtClock(l.at))} · ${esc(l.speakerName)}:</span> ${esc(l.text)}${l.translated?`<div class="small" style="color:#0A5DB0">↳ ${esc(l.translated)}</div>`:""}</div>`).join("")}</div></details>`:""}
    </div>`;
  }).join("");
}
function labHistoryHTML(patientId){
  const done = db.labRequests.filter(r=>r.patientId===patientId && r.status==="Completed").sort((a,b)=>String(b.resultDate).localeCompare(String(a.resultDate))).slice(0,5);
  if(!done.length) return "";
  return `<h4 style="margin-top:14px">Recent laboratory results</h4>` + done.map(r=>`<div class="v8-hist"><strong>${esc(r.testName)}</strong> <span class="small text-muted">${esc(fmtDT(r.resultDate))}</span><div style="white-space:pre-wrap">${esc(r.result||"")}</div></div>`).join("");
}

/* ---------- Patient Records (doctor) ---------- */
window.v8OpenRecord = function(patientId){
  const p = getUser(patientId); if(!p) return;
  const hist = patientHistory(patientId,"");
  $("modalContent").innerHTML = `
    <h2>📋 ${esc(p.name)} — Patient Record</h2>
    <p class="text-muted">${esc(p.phone||"")} ${p.address?" · "+esc(p.address):""} · ${esc(getPatientStatus(patientId))}</p>
    <h4>Clinical notes history (${hist.length})</h4>
    ${historyHTML(hist)}
    ${labHistoryHTML(patientId)}
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>`;
  openModal();
};
window.v8RecordSearch = function(v){
  v = (v||"").toLowerCase();
  document.querySelectorAll("#recBody tr[data-q]").forEach(tr=>{ tr.style.display = (tr.dataset.q||"").includes(v) ? "" : "none"; });
};
function renderPatientRecords(){
  const myIds = new Set([...db.appointments.filter(a=>a.doctorId===currentUser.id).map(a=>a.patientId), ...db.consultations.filter(c=>c.doctorId===currentUser.id).map(c=>c.patientId)]);
  const patients = db.users.filter(u=>u.role==="patient" && (V8.recAll || myIds.has(u.id)));
  const rows = patients.map(p=>{
    const hist = patientHistory(p.id,"");
    const last = hist[0];
    return `<tr data-q="${esc((p.name+" "+(p.phone||"")).toLowerCase())}"><td><strong>${esc(p.name)}</strong><div class="small text-muted">${esc(p.phone||"")}</div></td>
      <td>${hist.length}</td><td>${last?esc(fmtDT(stamp(last))):"—"}</td><td>${patientStatusBadge(p.id)}</td>
      <td><button class="btn btn-primary" onclick="v8OpenRecord('${p.id}')">Open record</button></td></tr>`;
  }).join("");
  $("content").innerHTML = `
    <h1 class="page-title">Patient Records</h1>
    <div class="alert alert-info">Clinical notes you write are saved to the patient's record. Next time you see the patient you can review the full history here or inside the consultation room.</div>
    <div class="card">
      <div class="flex" style="margin-bottom:10px">
        <input class="form-control" style="max-width:300px" placeholder="Search patient…" oninput="v8RecordSearch(this.value)">
        <label style="margin:0;font-weight:normal"><input type="checkbox" ${V8.recAll?"checked":""} onchange="V8.recAll=this.checked;navigate('patient-records')"> Show all patients</label>
      </div>
      <div class="table-wrap"><table><thead><tr><th>Patient</th><th>Saved visits</th><th>Last visit</th><th>Status</th><th></th></tr></thead>
      <tbody id="recBody">${rows || `<tr><td colspan="5"><div class="empty">No patients yet. Tick “Show all patients” to browse everyone.</div></td></tr>`}</tbody></table></div>
    </div>`;
}

/* =========================================================
   TRANSLATION  (original → viewer's language)
========================================================= */
const LANGS = [
  {code:"en", label:"English",   rec:"en-KE"},
  {code:"sw", label:"Kiswahili", rec:"sw-KE"},
  {code:"fr", label:"French",    rec:"fr-FR"},
  {code:"ar", label:"Arabic",    rec:"ar-SA"},
  {code:"hi", label:"Hindi",     rec:"hi-IN"}
];
const langLabel = c=>(LANGS.find(l=>l.code===c)||{label:c}).label;

/* Offline fallback: common clinic phrases English <-> Kiswahili (approximate). */
const PHRASEBOOK = [
  ["hello","habari"],["good morning","habari za asubuhi"],["thank you","asante"],["goodbye","kwaheri"],["yes","ndiyo"],["no","hapana"],
  ["how are you feeling today","unajisikiaje leo"],["where does it hurt","unaumwa wapi"],
  ["how long have you had the pain","umekuwa na maumivu haya kwa muda gani"],["do you have a fever","una homa"],["do you have a cough","una kikohozi"],
  ["are you taking any medicine","unatumia dawa yoyote"],["have you taken your medicine","umetumia dawa yako"],["do you have any allergies","una mzio wowote"],
  ["take this medicine twice a day","tumia dawa hii mara mbili kwa siku"],["take it after food","ichukue baada ya kula"],["drink plenty of water","kunywa maji mengi"],
  ["you need to rest","unahitaji kupumzika"],["i will request a laboratory test","nitaomba kipimo cha maabara"],["come back for a review in one week","rudi kwa uchunguzi baada ya wiki moja"],
  ["do you understand","unaelewa"],["please repeat","tafadhali rudia"],["can you hear me","unanisikia"],["i can hear you","nakusikia"],
  ["what is your name","jina lako ni nani"],["how old are you","una umri gani"],["are you pregnant","una mimba"],
  ["i have a headache","ninaumwa na kichwa"],["i have chest pain","ninaumwa na kifua"],["i have a stomach ache","ninaumwa na tumbo"],
  ["i feel dizzy","ninasikia kizunguzungu"],["i cannot sleep","siwezi kulala"],["i have been vomiting","nimekuwa nikitapika"],
  ["i have diarrhoea","ninaharisha"],["i have difficulty breathing","nina shida ya kupumua"],["my blood pressure is high","shinikizo langu la damu ni juu"],
  ["since yesterday","tangu jana"],["for three days","kwa siku tatu"]
];
function norm(s){ return String(s||"").toLowerCase().replace(/[^\p{L}\p{N}\s']/gu," ").replace(/\s+/g," ").trim(); }
function phrasebook(text,from,to){
  if(!((from==="en"&&to==="sw")||(from==="sw"&&to==="en"))) return null;
  const i = from==="en"?0:1, o = from==="en"?1:0, t = norm(text); if(!t) return null;
  let best = null, exact = false;
  for(const p of PHRASEBOOK){
    const k = norm(p[i]);
    if(t===k){ best = p; exact = true; break; }
    if(t.includes(k) && k.length>=t.length*0.6 && (!best || k.length>norm(best[i]).length)) best = p;
  }
  return best ? {text:best[o].charAt(0).toUpperCase()+best[o].slice(1), exact} : null;
}
/* Order: hospital translation service (if configured) → exact phrasebook match → on-device browser
   translator (with a timeout so it can never freeze captions) → approximate phrasebook match.
   Patient speech is not sent to any public third-party service by default. */
function getDeviceTranslator(from,to){
  const key = from+">"+to;
  if(!V8.translators[key]){
    V8.translators[key] = (async()=>{
      try{
        if(!("Translator" in self)) return null;
        const av = await self.Translator.availability({sourceLanguage:from,targetLanguage:to});
        if(av==="unavailable") return null;
        return await self.Translator.create({sourceLanguage:from,targetLanguage:to});
      }catch(e){ return null; }
    })();
  }
  return V8.translators[key];
}
async function translateText(text,from,to){
  if(!text || from===to) return {text:null, method:"same"};
  if(window.V8_TRANSLATE_URL){
    try{
      const r = await fetch(window.V8_TRANSLATE_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({q:text,source:from,target:to,format:"text"})});
      const j = await r.json(); if(j && j.translatedText) return {text:j.translatedText, method:"hospital translation service"};
    }catch(e){}
  }
  const pb = phrasebook(text,from,to);
  if(pb && pb.exact) return {text:pb.text, method:"phrasebook"};
  try{
    const tr = await Promise.race([getDeviceTranslator(from,to), new Promise(r=>setTimeout(()=>r(null),3500))]);
    if(tr){ const out = await Promise.race([tr.translate(text), new Promise(r=>setTimeout(()=>r(null),5000))]); if(out) return {text:out, method:"on-device translation"}; }
  }catch(e){}
  if(pb) return {text:pb.text, method:"phrasebook (approximate)"};
  return {text:null, method:"unavailable"};
}

/* =========================================================
   CONSULTATION PAGE + ROOM
========================================================= */
window.renderConsultation = function(){
  const mine = db.appointments.filter(a=>(a.patientId===currentUser.id||a.doctorId===currentUser.id) && a.status==="Confirmed");
  const isDoc = currentUser.role==="doctor";
  $("content").innerHTML = `
    <h1 class="page-title">Consultation</h1>
    <div class="alert alert-info">Maximum consultation duration: <strong>45 minutes</strong>. Live captions, transcription and translation are available during every consultation. Patients cannot join unpaid consultations.</div>
    ${mine.length ? mine.map(a=>{
      const p = getUser(a.patientId), d = getUser(a.doctorId);
      const prev = isDoc ? patientHistory(a.patientId,a.id).length : 0;
      return `<div class="card"><div class="flex space-between">
        <div><h3>${esc(isDoc ? p?.name : d?.name)}</h3>
          <p class="text-muted">${esc(a.date)} ${esc(a.time)} – ${esc(a.endTime)}<br>${esc(a.specialty||d?.specialty||"Clinical Provider")}<br>${esc(a.type)}</p>
          ${isDoc ? `<span class="badge ${prev?"badge-info":"badge-dark"}">${prev} previous visit${prev===1?"":"s"} with notes</span>` : ""}</div>
        <div>${isDoc?`<button class="btn btn-secondary" onclick="v8OpenRecord('${a.patientId}')">📋 History</button>`:""}<button class="btn btn-primary" onclick="joinConsultation('${a.id}')">🎥 Join</button></div>
      </div></div>`;
    }).join("") : `<div class="card"><div class="empty">No confirmed consultations.</div></div>`}`;
};

function stopSession(){
  const S = V8.session; if(!S) return;
  V8.session = null;
  try{ if(S.isDoctor){ flushNotes(S); flushTranscript(S); } }catch(e){}
  S.captionsOn = false;
  try{ S.rec && (S.rec.onend=null, S.rec.stop()); }catch(e){}
  [S.camStream,S.micStream].forEach(s=>{ try{ s && s.getTracks().forEach(t=>t.stop()); }catch(e){} });
  clearInterval(S.timer); clearInterval(S.presence); clearTimeout(S.noteTimer); clearTimeout(S.trTimer);
  if(consultIntervals && consultIntervals[S.apptId]){ clearInterval(consultIntervals[S.apptId]); delete consultIntervals[S.apptId]; }
}

function busSend(S,type,payload){
  try{ localStorage.setItem("beaconConsultBus", JSON.stringify({appt:S.apptId, from:currentUser.id, type, payload, n:Math.random()})); }catch(e){}
}
window.addEventListener("storage", function(ev){
  const S = V8.session;
  if(ev.key!=="beaconConsultBus" || !ev.newValue || !S || !currentUser) return;
  let m; try{ m = JSON.parse(ev.newValue); }catch(e){ return; }
  if(m.appt!==S.apptId || m.from===currentUser.id) return;
  if(m.type==="caption"){ if(!S.lines.some(l=>l.id===m.payload.id)) addLine(S,m.payload,false); }
  else if(m.type==="presence"){ S.otherSeen = Date.now(); updatePresence(S); if(!m.payload.reply) busSend(S,"presence",{reply:true}); }
  else if(m.type==="end"){
    const b = $("v8Status"); if(b) b.innerHTML = `<div class="alert alert-success">The doctor has ended the consultation. This window will close shortly.</div>`;
    setTimeout(()=>{ if(V8.session===S) closeModal(); }, 2500);
  }
});
function updatePresence(S){
  const el = $("v8Presence"); if(!el) return;
  const on = Date.now()-(S.otherSeen||0) < 9000;
  el.innerHTML = on ? `<span class="v8-dot on"></span> ${esc(S.otherName)} is in the consultation` : `<span class="v8-dot"></span> Waiting for ${esc(S.otherName)} to join…`;
}

window.joinConsultation = function(appointmentId){
  const a = db.appointments.find(x=>x.id===appointmentId);
  if(!a || a.status!=="Confirmed"){ alert("This consultation has not been confirmed."); return; }
  if(a.patientId!==currentUser.id && a.doctorId!==currentUser.id){ alert("You are not a participant in this consultation."); return; }
  stopSession();
  const isDoctor = currentUser.role==="doctor";
  const other = getUser(isDoctor ? a.patientId : a.doctorId);
  const c = isDoctor ? getOrCreateConsult(a) : consultByAppt(a.id);
  if(isDoctor) saveDB();
  const S = V8.session = {apptId:a.id, a, isDoctor, otherName:other?.name||"the other participant", otherSeen:0, lines:[], speakLang:"en", viewLang:"orig",
    captionsOn:false, startedAt:Date.now(), translators:{}, lastSaved:0};
  /* A returning transcript (e.g. doctor re-joins) is restored. */
  if(c && c.transcript && c.transcript.length) S.lines = c.transcript.map(l=>({...l}));
  const hist = isDoctor ? patientHistory(a.patientId,a.id) : [];
  const physical = a.type==="Physical Hospital Visit";
  const langOpts = (sel)=>LANGS.map(l=>`<option value="${l.code}" ${l.code===sel?"selected":""}>${l.label}</option>`).join("");

  $("modalContent").innerHTML = `
  <div class="flex space-between"><h2 style="margin:0">${physical?"In-person Visit":"Telemedicine Consultation"}</h2><div id="v8Presence" class="small"></div></div>
  <div class="small text-muted" style="margin:4px 0 12px">${esc(a.date)} ${esc(a.time)}–${esc(a.endTime)} · ${esc(a.type)} · ${isDoctor?"Patient":"Doctor"}: <strong>${esc(other?.name||"-")}</strong></div>
  <div id="v8Status"></div>
  <div class="v8-room">
    <div>
      <div class="v8-video" id="v8Video">
        <div class="v8-remote"><div class="v8-avatar">${esc((other?.name||"?").charAt(0).toUpperCase())}</div><div>${esc(other?.name||"")}</div>
          <div class="small" style="opacity:.8">${physical?"In-person consultation":"Video / audio connects through the hospital's signalling service in production"}</div></div>
        <video id="v8LocalVideo" class="v8-local hidden" autoplay muted playsinline></video>
        <div id="v8CapOverlay" class="v8-overlay hidden"></div>
      </div>
      <div class="flex" style="margin-top:8px">
        ${physical?"":`<button id="v8CamBtn" class="btn btn-primary" onclick="v8ToggleCam()">📹 Camera: off</button>
        <button id="v8MicBtn" class="btn btn-secondary" onclick="v8ToggleMic()">🎤 Mic: off</button>`}
        <button id="v8CapBtn" class="btn btn-dark" onclick="v8ToggleCaptions()">🔤 Captions: off</button>
      </div>
      <div class="card v8-cap-card">
        <div class="grid grid-2" style="gap:10px">
          <div class="form-group" style="margin:0"><label class="small">I speak</label><select id="v8Speak" class="form-control" onchange="v8SetSpeak(this.value)">${langOpts("en")}</select></div>
          <div class="form-group" style="margin:0"><label class="small">Show captions in</label><select id="v8View" class="form-control" onchange="v8SetView(this.value)"><option value="orig">Original (no translation)</option>${langOpts("")}</select></div>
        </div>
        <div id="v8CapNote" class="small text-muted" style="margin-top:6px"></div>
        <div id="v8Transcript" class="v8-transcript"></div>
        <div id="v8Interim" class="v8-interim small"></div>
        <div class="flex" style="margin-top:8px;flex-wrap:nowrap">
          <input id="v8Typed" class="form-control" placeholder="Type a message (also captioned & translated)…" onkeydown="if(event.key==='Enter'){event.preventDefault();v8SendTyped();}">
          <button class="btn btn-primary" onclick="v8SendTyped()">Send</button>
        </div>
        <div class="flex" style="margin-top:6px"><button class="btn btn-secondary" onclick="v8DownloadTranscript()">⬇ Download transcript</button>
          <span class="small text-muted">${isDoctor?"The transcript is saved to the patient's record.":"Captions are shared with your doctor; the transcript is kept in your medical record."}</span></div>
      </div>
    </div>
    <div>
      <div class="card" style="text-align:center"><div class="small text-muted">Time remaining</div><div id="consultTimer" style="font-size:34px;font-weight:bold;color:#0A5DB0">45:00</div></div>
      ${isDoctor ? `
      <div class="v8-tabs"><button id="v8TabNotes" class="v8-tab active" onclick="v8Tab('notes')">📝 Clinical Notes</button><button id="v8TabHist" class="v8-tab" onclick="v8Tab('hist')">🗂 Patient History (${hist.length})</button></div>
      <div id="v8PanelNotes" class="card">
        <div class="form-group"><label>Diagnosis / impression</label><input id="clinicalDx" class="form-control" value="${esc(c?.diagnosis||"")}" placeholder="e.g. Uncomplicated malaria" oninput="v8NotesChanged()"></div>
        <div class="form-group"><label>Clinical notes</label><textarea id="clinicalNotes" class="form-control" rows="9" placeholder="History, examination, assessment, plan…" oninput="v8NotesChanged()">${esc(c?.clinicalNotes||"")}</textarea></div>
        <div id="v8Saved" class="small text-muted" style="margin-bottom:8px">${c?.updatedAt?`Last saved ${esc(fmtClock(c.updatedAt))}`:"Notes auto-save as you type."}</div>
        <button class="btn btn-secondary" onclick="saveClinicalNotes('${a.id}')">💾 Save Clinical Notes</button>
        <button class="btn btn-success" onclick="endConsultation('${a.id}')">End Consultation & Prescribe</button>
      </div>
      <div id="v8PanelHist" class="card hidden" style="max-height:480px;overflow:auto">
        <h4 style="margin-top:0">${esc(other?.name||"Patient")} — previous visits</h4>
        ${historyHTML(hist)}${labHistoryHTML(a.patientId)}
      </div>` : `
      <div class="card"><h3>Your consultation</h3><p class="text-muted">Speak naturally. Your words appear as captions for your doctor and theirs for you, in the language you choose. You can also type a message.</p>
        <button class="btn btn-secondary" onclick="closeModal()">Leave consultation</button></div>`}
    </div>
  </div>`;
  V8.wideNext = true; openModal();
  S.timerRemaining = 45*60;

  /* countdown – the doctor's session ends the consultation automatically */
  S.timer = setInterval(()=>{
    const el = $("consultTimer"); if(!el){ stopSession(); return; }
    S.timerRemaining--;
    el.textContent = `${String(Math.floor(S.timerRemaining/60)).padStart(2,"0")}:${String(S.timerRemaining%60).padStart(2,"0")}`;
    if(S.timerRemaining<=0){ clearInterval(S.timer); if(isDoctor) endConsultation(a.id,true); }
  },1000);
  consultIntervals[a.id] = S.timer;

  /* presence heartbeat between the two participants */
  busSend(S,"presence",{}); updatePresence(S);
  S.presence = setInterval(()=>{ if(!$("v8Transcript")){ stopSession(); return; } busSend(S,"presence",{}); updatePresence(S); },3000);

  S.lines.forEach(l=>renderLine(S,l));
  capNote(S);
  /* start live captions straight away where the browser supports speech recognition */
  if(window.SpeechRecognition||window.webkitSpeechRecognition) v8ToggleCaptions(true);
};

function capNote(S,extra){
  const el = $("v8CapNote"); if(!el) return;
  const SR = window.SpeechRecognition||window.webkitSpeechRecognition;
  el.innerHTML = (SR ? "Live speech captions use your microphone (Chrome/Edge)." : "Live speech captions are not supported in this browser (use Chrome or Edge) — you can still type messages.") +
    (extra?` <strong>${extra}</strong>`:"");
}

window.v8Tab = function(name){
  $("v8PanelNotes")?.classList.toggle("hidden", name!=="notes");
  $("v8PanelHist")?.classList.toggle("hidden", name!=="hist");
  $("v8TabNotes")?.classList.toggle("active", name==="notes");
  $("v8TabHist")?.classList.toggle("active", name==="hist");
};

/* ---------- camera & microphone ---------- */
window.v8ToggleCam = async function(){
  const S = V8.session; if(!S) return;
  const btn = $("v8CamBtn"), vid = $("v8LocalVideo");
  if(S.camStream){
    S.camStream.getTracks().forEach(t=>t.stop()); S.camStream = null;
    vid.srcObject = null; vid.classList.add("hidden"); btn.textContent = "📹 Camera: off"; return;
  }
  try{
    S.camStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false});
    vid.srcObject = S.camStream; vid.classList.remove("hidden"); btn.textContent = "📹 Camera: on";
  }catch(e){ capNote(S,"Camera permission was not granted."); }
};
window.v8ToggleMic = async function(){
  const S = V8.session; if(!S) return;
  const btn = $("v8MicBtn");
  if(S.micStream){ S.micStream.getTracks().forEach(t=>t.stop()); S.micStream = null; btn.textContent = "🎤 Mic: off"; return; }
  try{ S.micStream = await navigator.mediaDevices.getUserMedia({audio:true}); btn.textContent = "🎤 Mic: on"; }
  catch(e){ capNote(S,"Microphone permission was not granted."); }
};
window.startCamera = ()=>window.v8ToggleCam();
window.startMicrophone = ()=>window.v8ToggleMic();

/* ---------- captions: speech → text ---------- */
window.v8SetSpeak = function(code){
  const S = V8.session; if(!S) return; S.speakLang = code;
  if(S.captionsOn){ stopRecognition(S); startRecognition(S); }
};
window.v8SetView = function(code){
  const S = V8.session; if(!S) return; S.viewLang = code;
  S.lines.forEach(l=>{ l.translated = null; l.tLang = null; });
  const box = $("v8Transcript"); if(box) box.innerHTML = "";
  S.lines.forEach(l=>renderLine(S,l));
};
window.v8ToggleCaptions = function(force){
  const S = V8.session; if(!S) return;
  const on = typeof force==="boolean" ? force : !S.captionsOn;
  const btn = $("v8CapBtn");
  if(on){
    const SR = window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){ capNote(S); return; }
    S.captionsOn = true; startRecognition(S);
    if(btn){ btn.textContent = "🔤 Captions: on"; btn.className = "btn btn-success"; }
  }else{
    S.captionsOn = false; stopRecognition(S);
    if(btn){ btn.textContent = "🔤 Captions: off"; btn.className = "btn btn-dark"; }
    const i = $("v8Interim"); if(i) i.textContent = "";
  }
};
function startRecognition(S){
  const SR = window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR) return;
  try{
    const rec = new SR();
    rec.continuous = true; rec.interimResults = true;
    rec.lang = (LANGS.find(l=>l.code===S.speakLang)||LANGS[0]).rec;
    rec.onresult = ev=>{
      let interim = "";
      for(let i=ev.resultIndex;i<ev.results.length;i++){
        const r = ev.results[i], text = (r[0].transcript||"").trim();
        if(!text) continue;
        if(r.isFinal) commitLine(S,text); else interim += text+" ";
      }
      const el = $("v8Interim"); if(el) el.textContent = interim ? "… "+interim : "";
    };
    rec.onerror = ev=>{
      if(ev.error==="not-allowed"||ev.error==="service-not-allowed"){ S.captionsOn=false; v8ToggleCaptions(false); capNote(S,"Microphone permission denied — captions are off. You can still type."); }
      else if(ev.error==="network"){ capNote(S,"The browser's speech service could not be reached (it needs internet). You can still type."); }
    };
    rec.onend = ()=>{ if(V8.session===S && S.captionsOn){ setTimeout(()=>{ try{ rec.start(); }catch(e){} },300); } };
    S.rec = rec; rec.start();
  }catch(e){ capNote(S,"Could not start speech recognition."); }
}
function stopRecognition(S){ try{ if(S.rec){ S.rec.onend = null; S.rec.stop(); } }catch(e){} S.rec = null; }

function commitLine(S,text){
  const line = {id:uid("line"), at:new Date().toISOString(), speakerId:currentUser.id, speakerName:currentUser.name, role:currentUser.role, lang:S.speakLang, text};
  addLine(S,line,true);
}
window.v8SendTyped = function(){
  const S = V8.session, inp = $("v8Typed"); if(!S||!inp) return;
  const t = inp.value.trim(); if(!t) return;
  inp.value = ""; commitLine(S,t);
};

/* A line is shown locally, translated into this viewer's language, shared with the other
   participant, and (on the doctor's side) saved to the patient's record. */
function addLine(S,line,local){
  S.lines.push(line);
  renderLine(S,line);
  if(local) busSend(S,"caption",line);
  if(S.isDoctor) scheduleTranscriptSave(S);
}
function renderLine(S,line){
  const box = $("v8Transcript"); if(!box) return;
  let el = $("v8l_"+line.id);
  if(!el){ el = document.createElement("div"); el.id = "v8l_"+line.id; el.className = "v8-line "+(line.speakerId===currentUser.id?"mine":"theirs"); box.appendChild(el); }
  const showTr = S.viewLang!=="orig" && S.viewLang!==line.lang;
  el.innerHTML = `<div class="v8-line-head"><strong>${esc(line.speakerName)}</strong> <span class="small text-muted">${esc(fmtClock(line.at))}</span> <span class="badge badge-dark">${esc(line.lang.toUpperCase())}</span></div>
    <div>${esc(line.text)}</div>
    ${showTr ? `<div class="v8-tr">${line.translated ? "↳ "+esc(line.translated)+` <span class="small text-muted">(${esc(line.tMethod||"")})</span>` : (line.tFailed ? `<span class="small text-muted">↳ translation unavailable for this phrase</span>` : `<span class="small text-muted">↳ translating…</span>`)}</div>` : ""}`;
  box.scrollTop = box.scrollHeight;
  showOverlay(S,line);
  if(showTr && !line.translated && !line.tFailed && line.tLang!==S.viewLang){
    line.tLang = S.viewLang;
    translateText(line.text,line.lang,S.viewLang).then(res=>{
      if(V8.session!==S) return;
      if(res.text){ line.translated = res.text; line.tMethod = res.method; } else { line.tFailed = true; }
      renderLine(S,line);
      if(S.isDoctor) scheduleTranscriptSave(S);
    });
  }
}
function showOverlay(S,line){
  const ov = $("v8CapOverlay"); if(!ov) return;
  const showTr = S.viewLang!=="orig" && S.viewLang!==line.lang && line.translated;
  ov.innerHTML = `<strong>${esc(line.speakerName)}:</strong> ${esc(showTr ? line.translated : line.text)}`;
  ov.classList.remove("hidden");
  clearTimeout(S.ovTimer); S.ovTimer = setTimeout(()=>ov.classList.add("hidden"), 9000);
}

window.v8DownloadTranscript = function(){
  const S = V8.session; if(!S) return;
  const a = S.a, p = getUser(a.patientId), d = getUser(a.doctorId);
  const txt = [`Beacon of Hope Hospital — Consultation transcript`, `Patient: ${p?.name||"-"}  |  Doctor: ${d?.name||"-"}`, `Date: ${a.date} ${a.time}`, ``]
    .concat(S.lines.map(l=>`[${fmtClock(l.at)}] ${l.speakerName} (${l.lang}): ${l.text}${l.translated?`\n      → ${l.translated}`:""}`)).join("\n");
  const url = URL.createObjectURL(new Blob([txt],{type:"text/plain"}));
  const link = document.createElement("a"); link.href = url; link.download = `transcript_${a.date}_${(p?.name||"patient").replace(/\s+/g,"_")}.txt`;
  document.body.appendChild(link); link.click(); link.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
};

/* ---------- notes: autosave + manual save + history ---------- */
function flushTranscript(S){
  const c = consultByAppt(S.apptId); if(!c) return;
  c.transcript = S.lines.map(l=>({...l})); saveDB();
}
function scheduleTranscriptSave(S){
  clearTimeout(S.trTimer);
  S.trTimer = setTimeout(()=>{ if(V8.session===S) flushTranscript(S); }, 1500);
}
function flushNotes(S,manual){
  const c = consultByAppt(S.apptId); if(!c) return false;
  const nEl = $("clinicalNotes"), dEl = $("clinicalDx"); if(!nEl) return false;
  const notes = nEl.value, dx = dEl ? dEl.value : (c.diagnosis||"");
  const changed = notes!==(c.clinicalNotes||"") || dx!==(c.diagnosis||"");
  c.clinicalNotes = notes; c.diagnosis = dx; c.doctorId = S.a.doctorId;
  if(changed || manual) c.updatedAt = new Date().toISOString();
  if(manual){
    c.notesHistory = c.notesHistory || [];
    const last = c.notesHistory[c.notesHistory.length-1];
    if(!last || last.text!==notes || last.diagnosis!==dx) c.notesHistory.push({at:c.updatedAt, by:currentUser.id, text:notes, diagnosis:dx});
  }
  if(changed || manual) saveDB();
  return changed || !!manual;
}
window.v8NotesChanged = function(){
  const S = V8.session; if(!S||!S.isDoctor) return;
  const el = $("v8Saved"); if(el) el.textContent = "Typing…";
  clearTimeout(S.noteTimer);
  S.noteTimer = setTimeout(()=>{
    if(V8.session!==S) return;
    flushNotes(S,false);
    const e = $("v8Saved"); if(e) e.textContent = "Auto-saved at "+fmtClock(new Date().toISOString());
  },1200);
};
window.saveClinicalNotes = function(appointmentId){
  const S = V8.session;
  if(currentUser.role!=="doctor" || !S || S.apptId!==appointmentId) return;
  flushNotes(S,true);
  const e = $("v8Saved"); if(e) e.textContent = "Saved at "+fmtClock(new Date().toISOString())+" — added to the patient's record.";
};

window.endConsultation = function(appointmentId, autoEnd){
  const a = db.appointments.find(x=>x.id===appointmentId); if(!a) return;
  const S = V8.session;
  if(currentUser.role!=="doctor"){ closeModal(); return; }
  let minutes = 45;
  if(S && S.apptId===appointmentId){
    flushNotes(S,true); flushTranscript(S);
    busSend(S,"end",{});
    minutes = Math.min(45, Math.max(1, Math.ceil((Date.now()-S.startedAt)/60000)));
  }
  const c = getOrCreateConsult(a);
  c.status = "Completed"; c.endedAt = new Date().toISOString(); c.durationMinutes = minutes; c.updatedAt = c.endedAt;
  a.status = "Completed";
  saveDB();
  closeModal();
  notify(a.patientId, "Your consultation has ended. A prescription may now be processed by the pharmacy.", "consult");
  showPrescriptionForm(a.patientId, a.id);
};

/* =========================================================
   V9: DAYS OFF · AUTO-RELEASE · REMINDERS · PRINTING
========================================================= */
const UNPAID_HOLD_MINUTES = 120;
const HOSPITAL = {name:"Beacon of Hope Hospital", addr:"Ongata Rongai, Beacon of Hope Centre, Off Magadi Rd, Along Gataka Rd", phone:"0720876123", email:"hospital@beaconafrica.org"};

/* ---------- Doctor days off ---------- */
function isDoctorOff(doctorId, date){ return db.doctorDaysOff.some(d=>d.doctorId===doctorId && date>=d.from && date<=d.to); }

function renderDaysOff(){
  const mine = db.doctorDaysOff.filter(d=>d.doctorId===currentUser.id && d.to>=today()).sort((a,b)=>a.from.localeCompare(b.from));
  $("content").innerHTML = `
    <h1 class="page-title">Days Off</h1>
    <div class="alert alert-info">Mark the days you are away. The system will not assign you any new appointments on those days. Appointments you already have on them are moved to another free doctor automatically (the patient and the new doctor are notified).</div>
    <div class="card"><h3>Add days off</h3>
      <form onsubmit="v8AddDaysOff(event)">
        <div class="grid grid-2">
          <div class="form-group"><label>From</label><input id="dofFrom" type="date" min="${today()}" class="form-control" required></div>
          <div class="form-group"><label>To (same day for a single day)</label><input id="dofTo" type="date" min="${today()}" class="form-control" required></div>
        </div>
        <div class="form-group"><label>Reason (optional)</label><input id="dofReason" class="form-control" placeholder="e.g. Annual leave, conference"></div>
        <button class="btn btn-primary">Mark as days off</button>
      </form></div>
    <div class="card"><h3>My upcoming days off</h3>
      ${mine.length ? `<div class="table-wrap"><table><thead><tr><th>From</th><th>To</th><th>Reason</th><th></th></tr></thead><tbody>${
        mine.map(d=>`<tr><td>${esc(d.from)}</td><td>${esc(d.to)}</td><td>${esc(d.reason||"-")}</td><td><button class="btn btn-danger" onclick="v8RemoveDaysOff('${d.id}')">Remove</button></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty">No upcoming days off.</div>`}
    </div>`;
}
window.v8AddDaysOff = function(e){
  e.preventDefault();
  const from = $("dofFrom").value, to = $("dofTo").value, reason = $("dofReason").value.trim();
  if(!from || !to || to<from){ alert("Please choose a valid date range."); return; }
  db.doctorDaysOff.push({id:uid("dayoff"), doctorId:currentUser.id, from, to, reason, createdAt:new Date().toISOString()});
  /* move this doctor's existing appointments in the range to other free doctors */
  syncBookings();
  const affected = db.appointments.filter(a=>a.doctorId===currentUser.id && a.date>=from && a.date<=to && ["Pending Payment","Confirmed"].includes(a.status));
  let moved = 0, stuck = 0;
  affected.forEach(a=>{
    const free = db.users.filter(u=>u.role==="doctor" && u.enabled && u.id!==currentUser.id && doctorIsFree(u,a.date,a.time));
    const p = getUser(a.patientId);
    if(free.length){
      const nd = pickRandom(free);
      a.doctorId = nd.id; a.specialty = nd.specialty||a.specialty; a.reassignedFrom = currentUser.id;
      notify(nd.id, `APPOINTMENT ASSIGNED TO YOU: ${p?.name||"Patient"} – ${a.type} on ${a.date} at ${a.time} (${currentUser.name} is away).`, "booking");
      notify(a.patientId, `Your appointment on ${a.date} at ${a.time} is now with ${nd.name} because ${currentUser.name} will be away.`, "booking");
      moved++;
    }else{
      stuck++;
      notifyAllAdmins(`ACTION NEEDED: ${currentUser.name} is off on ${a.date} but ${p?.name||"a patient"}'s appointment at ${a.time} has no free replacement doctor.`);
      notify(a.patientId, `${currentUser.name} will be away on ${a.date}. The hospital will contact you to rebook your ${a.time} appointment.`, "booking");
    }
  });
  saveDB();
  alert(`Days off saved.` + (affected.length ? `\n${moved} appointment(s) moved to another doctor.` + (stuck ? `\n${stuck} could not be moved – the administrator has been alerted.` : "") : ""));
  renderDaysOff();
};
window.v8RemoveDaysOff = function(id){
  const i = db.doctorDaysOff.findIndex(d=>d.id===id && d.doctorId===currentUser.id);
  if(i>=0){ db.doctorDaysOff.splice(i,1); saveDB(); }
  renderDaysOff();
};

/* ---------- Auto-release of unpaid appointments ---------- */
function releaseStaleBookings(){
  const now = Date.now(); let changed = false;
  db.appointments.forEach(a=>{
    if(a.status!=="Pending Payment") return;
    const created = new Date(a.createdAt||0).getTime(); if(!created) return;
    const inv = db.invoices.find(i=>i.appointmentId===a.id && i.type==="Consultation");
    if(inv && inv.status==="Paid") return;
    const age = (now-created)/60000;
    const p = getUser(a.patientId);
    if(age>=UNPAID_HOLD_MINUTES){
      a.status = "Cancelled"; a.cancelReason = "Not paid within 2 hours – slot released"; a.cancelledAt = new Date().toISOString();
      if(inv && inv.status==="Pending"){ inv.status = "Cancelled"; inv.cancelledAt = a.cancelledAt; }
      changed = true;
      notify(a.patientId, `Your ${a.type} booking for ${a.date} at ${a.time} was cancelled because it was not paid within 2 hours. You can book again at any time.`, "payment");
      notify(a.doctorId, `Unpaid booking released: ${p?.name||"Patient"} – ${a.date} at ${a.time}. The slot is free again.`, "booking");
    }else if(age>=UNPAID_HOLD_MINUTES-30 && !a.expiryWarned){
      a.expiryWarned = true; changed = true;
      notify(a.patientId, `Please pay now: your ${a.type} booking for ${a.date} at ${a.time} will be released in about ${Math.max(1,Math.ceil(UNPAID_HOLD_MINUTES-age))} minutes if the invoice stays unpaid.`, "payment");
    }
  });
  if(changed) saveDB();
}

/* ---------- Reminders (24 h and 1 h before) to patient and doctor ---------- */
function runReminders(){
  const now = Date.now();
  db.appointments.forEach(a=>{
    if(a.status!=="Confirmed") return;
    const T = new Date(`${a.date}T${a.time}`).getTime(); if(isNaN(T)) return;
    const mins = (T-now)/60000; if(mins<=0 || mins>24*60) return;
    const confirmedAt = Math.max(new Date(a.paidAt||a.createdAt||0).getTime(), new Date(a.rescheduledAt||0).getTime());
    const p = getUser(a.patientId), d = getUser(a.doctorId); if(!p || !d) return;
    const key = mins<=60 ? "1" : "24";
    if(confirmedAt > T-(key==="1"?60:24*60)*60000){        /* booked too late for this reminder */
      if(key==="1"){ a.rem1P = true; a.rem1D = a.doctorId; } else { a.rem24P = true; a.rem24D = a.doctorId; }
      return;
    }
    const when = key==="1" ? `in about ${Math.max(1,Math.round(mins))} minutes` : `in about ${Math.round(mins/60)} hours`;
    const flagP = "rem"+key+"P", flagD = "rem"+key+"D";
    if(!a[flagP]){ a[flagP] = true; saveDB(); notify(p.id, `⏰ REMINDER: your ${a.type} with ${d.name} starts ${when} (${a.date} at ${a.time}).`, "reminder"); }
    if(a[flagD]!==a.doctorId){ a[flagD] = a.doctorId; saveDB(); notify(d.id, `⏰ REMINDER: ${a.type} with ${p.name} starts ${when} (${a.date} at ${a.time}).`, "reminder"); }
  });
}

let tickTimer = null;
function v8Tick(){
  if(!currentUser) return;
  try{ rawSyncBookings(); releaseStaleBookings(); runReminders(); }catch(e){ console.error(e); }
  refreshBell();
}
function startTick(){ if(!tickTimer){ tickTimer = setInterval(v8Tick, 30000); } v8Tick(); }

/* ---------- Action toast (e.g. "Print") ---------- */
function pushActionToast(message, label, fn){
  const h = toastHost(), el = document.createElement("div");
  el.className = "v8-toast";
  el.innerHTML = `<div class="v8-toast-title">✅ Done</div><div>${esc(message)}</div><div style="margin-top:8px"><button class="btn btn-primary" type="button">${esc(label)}</button></div>`;
  el.querySelector("button").onclick = ()=>{ el.remove(); fn(); };
  h.appendChild(el); setTimeout(()=>el.remove(), 15000);
}

/* ---------- Printing ---------- */
function printDocument(title, body){
  document.getElementById("v8PrintFrame")?.remove();
  const f = document.createElement("iframe");
  f.id = "v8PrintFrame"; f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
  document.body.appendChild(f);
  const d = f.contentWindow.document;
  d.open();
  d.write(`<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>
    @page{size:A4;margin:16mm}
    body{font-family:Arial,Helvetica,sans-serif;color:#111;font-size:13px;line-height:1.45}
    .lh{border-bottom:3px solid #0A5DB0;padding-bottom:8px;margin-bottom:14px}
    .lh h1{margin:0;font-size:22px;color:#0A5DB0}.lh p{margin:2px 0;font-size:12px;color:#444}
    h2{text-align:center;letter-spacing:1px;margin:10px 0 14px;font-size:17px}
    table{width:100%;border-collapse:collapse;margin:8px 0}
    th,td{border:1px solid #888;padding:6px 8px;text-align:left;vertical-align:top}
    th{background:#EAF2FB}
    .kv td{border:0;padding:3px 6px}.kv td:first-child{width:150px;font-weight:bold}
    .box{border:1px solid #888;padding:10px;min-height:60px;white-space:pre-wrap;margin:6px 0}
    .sig{margin-top:46px;display:flex;justify-content:space-between}
    .sig div{width:44%;border-top:1px solid #000;padding-top:4px;font-size:12px}
    .foot{margin-top:26px;font-size:11px;color:#555;border-top:1px solid #ccc;padding-top:6px}
    .tag{display:inline-block;border:1px solid #b00;color:#b00;padding:1px 8px;font-weight:bold;border-radius:4px}
  </style></head><body>
    <div class="lh"><h1>${HOSPITAL.name}</h1><p>${HOSPITAL.addr}</p><p>Tel: ${HOSPITAL.phone} · ${HOSPITAL.email}</p></div>
    ${body}
    <div class="foot">Printed ${esc(new Date().toLocaleString())} by ${esc(currentUser?.name||"")}. Computer-generated document.</div>
  </body></html>`);
  d.close();
  setTimeout(()=>{ try{ f.contentWindow.focus(); f.contentWindow.print(); }catch(e){ alert("Printing is not available in this browser."); } }, 300);
}
function patientBlock(p){
  return `<table class="kv"><tr><td>Patient</td><td>${esc(p?.name||"-")}</td></tr><tr><td>Phone</td><td>${esc(p?.phone||"-")}</td></tr>${p?.address?`<tr><td>Address</td><td>${esc(p.address)}</td></tr>`:""}</table>`;
}

window.v8PrintLab = function(id){
  const r = db.labRequests.find(x=>x.id===id); if(!r) return;
  const role = currentUser.role;
  const ok = role==="admin" || role===ROLE_LAB || (role==="doctor" && (r.requestedBy===currentUser.id || !r.requestedBy)) || (role==="patient" && r.patientId===currentUser.id);
  if(!ok){ alert("You do not have access to print this request."); return; }
  const p = getUser(r.patientId), d = getUser(r.requestedBy), done = r.status==="Completed" && r.result;
  const paid = labPaid(r);
  printDocument(done?"Laboratory Report":"Laboratory Request Form", `
    <h2>${done?"LABORATORY REPORT":"LABORATORY REQUEST FORM"}</h2>
    <table class="kv"><tr><td>Request no.</td><td>${esc(r.id)}</td></tr><tr><td>Date requested</td><td>${esc(fmtDT(r.createdAt))}</td></tr>
      <tr><td>Priority</td><td>${r.urgency==="Urgent"?`<span class="tag">URGENT</span>`:"Routine"}</td></tr>
      <tr><td>Payment</td><td>${paid?"Paid":"Not yet paid"}</td></tr></table>
    <h3>Patient</h3>${patientBlock(p)}
    <h3>Test requested</h3><table><tr><th>Test</th></tr><tr><td>${esc(r.testName)}</td></tr></table>
    <h3>Clinical indication / notes</h3><div class="box">${esc(r.notes||"-")}</div>
    ${done?`<h3>Result</h3><div class="box">${esc(r.result)}</div><table class="kv"><tr><td>Resulted</td><td>${esc(fmtDT(r.resultDate))}</td></tr><tr><td>Processed by</td><td>${esc(r.processedByName||"-")}</td></tr></table>`:""}
    <div class="sig"><div>Requested by: ${esc(d?.name||"-")}${d?.specialty?" ("+esc(d.specialty)+")":""}<br>Signature / stamp</div><div>${done?"Laboratory technician: "+esc(r.processedByName||""):"Received by laboratory"}<br>Signature / stamp</div></div>`);
};

window.v8PrintRx = function(id){
  const rx = db.prescriptions.find(x=>x.id===id); if(!rx) return;
  const role = currentUser.role;
  const ok = role==="admin" || role==="pharmacist" || (role==="doctor" && rx.doctorId===currentUser.id) || (role==="patient" && rx.patientId===currentUser.id);
  if(!ok){ alert("You do not have access to print this prescription."); return; }
  const p = getUser(rx.patientId), d = getUser(rx.doctorId);
  const c = rx.appointmentId ? consultByAppt(rx.appointmentId) : null;
  printDocument("Prescription", `
    <h2>PRESCRIPTION</h2>
    <table class="kv"><tr><td>Prescription no.</td><td>${esc(rx.id)}</td></tr><tr><td>Date</td><td>${esc(fmtDT(rx.createdAt))}</td></tr>
      ${c?.diagnosis?`<tr><td>Diagnosis</td><td>${esc(c.diagnosis)}</td></tr>`:""}</table>
    <h3>Patient</h3>${patientBlock(p)}
    <h3>Rx</h3>
    <table><thead><tr><th>#</th><th>Medicine</th><th>Qty</th><th>Dosage</th><th>Frequency</th><th>Duration</th></tr></thead><tbody>
      ${(rx.items||[]).map((it,i)=>`<tr><td>${i+1}</td><td>${esc(it.medicineName)}</td><td>${esc(it.quantity)}</td><td>${esc(it.dosage||"-")}</td><td>${esc(it.frequency||"-")}</td><td>${esc(it.duration||"-")}</td></tr>`).join("")}
    </tbody></table>
    <div class="sig"><div>Prescriber: ${esc(d?.name||"-")}${d?.specialty?" ("+esc(d.specialty)+")":""}<br>Signature / stamp</div><div>Dispensed by<br>Signature / stamp</div></div>
    <p class="small" style="font-size:11px;margin-top:14px">Valid only with the prescriber's signature or stamp. Take medicines exactly as directed.</p>`);
};

/* Doctor / admin prescriptions list, now with a Print button */
window.renderPrescriptions = function(){
  if(currentUser.role==="patient"){ navigate("pharmacy"); return; }
  const list = db.prescriptions.filter(p=>currentUser.role==="doctor" ? p.doctorId===currentUser.id : true).slice().reverse();
  $("content").innerHTML = `
    <h1 class="page-title">Prescriptions</h1>
    <div class="card"><div class="table-wrap"><table>
      <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Medicine</th><th>Pharmacy status</th><th></th></tr></thead>
      <tbody>${list.length ? list.map(p=>{
        const order = db.pharmacyOrders.find(o=>o.prescriptionId===p.id);
        return `<tr><td>${esc(getUser(p.patientId)?.name||"-")}</td><td>${esc(getUser(p.doctorId)?.name||"-")}</td><td>${esc(fmtDT(p.createdAt))}</td>
          <td>${(p.items||[]).map(i=>esc(i.medicineName)).join(", ")}</td><td><span class="badge badge-dark">${esc(order?.status||"-")}</span></td>
          <td><button class="btn btn-secondary" onclick="v8PrintRx('${p.id}')">🖨 Print</button></td></tr>`;
      }).join("") : `<tr><td colspan="6"><div class="empty">No prescriptions.</div></td></tr>`}</tbody></table></div></div>`;
};

/* Patients & pharmacists get a printable list under the pharmacy table */
const prevRenderPharmacy = window.renderPharmacy;
window.renderPharmacy = function(){
  prevRenderPharmacy();
  if(currentUser.role!=="patient" && currentUser.role!=="pharmacist") return;
  const list = db.prescriptions.filter(p=>currentUser.role==="pharmacist" || p.patientId===currentUser.id).slice().reverse();
  if(!list.length) return;
  $("content").insertAdjacentHTML("beforeend", `<div class="card"><h3>Prescriptions</h3><div class="table-wrap"><table>
    <thead><tr><th>Date</th>${currentUser.role==="pharmacist"?"<th>Patient</th>":""}<th>Doctor</th><th>Medicines</th><th></th></tr></thead><tbody>
    ${list.map(p=>`<tr><td>${esc(fmtDT(p.createdAt))}</td>${currentUser.role==="pharmacist"?`<td>${esc(getUser(p.patientId)?.name||"-")}</td>`:""}<td>${esc(getUser(p.doctorId)?.name||"-")}</td>
      <td>${(p.items||[]).map(i=>esc(i.medicineName)).join(", ")}</td><td><button class="btn btn-secondary" onclick="v8PrintRx('${p.id}')">🖨 Print</button></td></tr>`).join("")}
    </tbody></table></div></div>`);
};

/* Offer printing right after a doctor sends a prescription */
const prevCreatePrescription = window.createPrescription;
window.createPrescription = function(e){
  const before = db.prescriptions.length;
  prevCreatePrescription(e);
  if(db.prescriptions.length>before){
    const rx = db.prescriptions[db.prescriptions.length-1];
    pushActionToast("Prescription sent to the pharmacy.", "🖨 Print prescription", ()=>v8PrintRx(rx.id));
  }
};

/* =========================================================
   INIT
========================================================= */
ensureDB();
saveDB();
/* If a session was restored before this layer loaded, rebuild the UI with the new features. */
if(currentUser){ currentUser = getUser(currentUser.id) || currentUser; openApp(); }

})();
