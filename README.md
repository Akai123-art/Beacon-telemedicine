# Beacon of Hope Hospital

Flask-based telemedicine application with a browser frontend and SQLite-backed API.

## Deploy to Render

This repository includes a Render Blueprint in `render.yaml`.

1. Push the project to a GitHub repository.
2. In Render, create a new **Blueprint** and select that repository.
3. Set `BEACON_ADMIN_PASSWORD` when prompted. Use a unique password of at least
   eight characters; the initial administrator must change it after signing in.
4. Apply the Blueprint. Render generates `BEACON_SECRET_KEY` and configures the
   web service to use a persistent disk for the SQLite database.

The Blueprint uses a Starter web service because SQLite requires persistent
storage, which is provided by the attached disk. The service is configured with
one Gunicorn worker; do not scale it to multiple instances while it uses SQLite.
The disk is mounted at `/var/data`, and the app's database is stored at
`/var/data/beacon_hospital.db`.

The existing `beacon_hospital.db` file in the repository is not copied to the
persistent disk. The hosted app initializes a new database and seeds its initial
administrator and inventory. If existing records need to be retained, migrate
them to the hosted disk using a secure, verified process before directing users
to the hosted app. Do not put real patient records or credentials in source
control.

## Telemedicine audio/video consultations

The consultation room uses browser WebRTC for audio/video; audio-only calls work
with the camera left off. Flask authenticates the two appointment participants
and exchanges WebRTC offers, answers, ICE candidates, and live caption text; the
audio/video media itself is sent directly between their browsers. Signaling and
caption messages are held in server memory and expire after one hour, so keep
the service on one process/worker (the Render command above already uses one
worker). A process restart interrupts any active call.

Render serves the app over HTTPS, which browsers require for camera and
microphone access. The doctor must join a confirmed appointment first to start
it. The patient can then open Consultation and join. Both participants should
turn on the microphone in the consultation controls; the camera is optional.
Live speech captions use the browser's speech-recognition feature (Chrome/Edge
recommended): each participant's browser transcribes their own microphone and
shares the resulting text with the other participant. Caption support and
accuracy depend on the browser, language, microphone permissions, and network.
From the Consultation page, the clinician selects **Join Audio** or **Join
Video** to start a confirmed appointment, then the patient selects the same
appointment's audio or video option to join. The selected mode turns on the
microphone (and, for video, requests camera access); participants can mute or
turn the camera off with the in-call controls. Use **In-call Chat & Live
Captions** to exchange typed messages or captions while connected.
The doctor-side transcript is saved in that browser's local storage; do not use
this feature with real patient information until storage, consent, and
applicable healthcare requirements have been reviewed.

The app includes a public STUN server for basic connectivity. Some mobile,
corporate, or restrictive networks require a TURN relay. Configure a TURN
service with these Render environment variables if participants cannot connect:

- `BEACON_TURN_URLS`: comma-separated TURN URLs, such as `turn:turn.example.com:3478?transport=udp,turns:turn.example.com:5349?transport=tcp`
- `BEACON_TURN_USERNAME`: TURN username
- `BEACON_TURN_CREDENTIAL`: TURN credential

Use credentials from a trusted TURN provider and rotate them. The configured
TURN username and credential are delivered to authorized appointment
participants so their browsers can connect; use provider-issued short-lived
credentials where available. The app does not record audio or video. Do not use
real patient consultations until you have verified access controls, privacy,
consent, and the applicable healthcare requirements.

## Medicine delivery workflow

After the patient pays both the medicine and delivery invoices, the pharmacist
assigns an enabled rider from Pharmacy Orders. The rider signs in and opens
**My Deliveries** or the dashboard to see deliveries assigned to their account,
including the order, medicine items, receiver contact, and confirmed directions.
The rider then records pickup, confirms the receiver's location by phone, starts
transit, and completes delivery with the patient's delivery code.

For a one-time administrator password recovery, set
`BEACON_RESET_ADMIN_PASSWORD=1` and `BEACON_ADMIN_PASSWORD` in Render, restart
the service, then remove `BEACON_RESET_ADMIN_PASSWORD` so it cannot reset the
password on later deployments.

## Run locally

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
$env:BEACON_ADMIN_PASSWORD = "choose-a-unique-password"
python app.py
```

Open <http://127.0.0.1:5000/>.
