# Mobile Device Management (MDM) System – Moveinsync Case Study

A backend system that centrally controls mobile app updates, prevents unsafe upgrades/downgrades, and maintains a complete audit trail of device update lifecycle.

---

## 🚀 How to Run

```bash
npm install
npm run dev
```

Create `.env` file:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/mdm_system
```

---

## 📌 Features

* Device registry & heartbeat tracking
* Version repository & compatibility graph (BFS validation)
* Targeted rollout scheduling
* Downgrade prevention
* Update lifecycle state machine
* Failure handling & retry support
* Device update audit timeline
* Fleet analytics (active devices, version distribution, success rate)

---

## 🧠 Core Idea

The system stores version transitions as a directed graph and validates upgrade eligibility using graph traversal to ensure controlled and safe updates.

---

## 🔄 Demo Flow

1. Register device
2. Create versions
3. Define allowed transitions
4. Schedule rollout
5. Device checks update
6. Device reports update lifecycle
7. View update history
8. View analytics

---

## 🛠 Tech Stack

Node.js • Express • MongoDB • Mongoose

---

## 📍 Outcome

Ensures controlled rollout, prevents downgrade risks, guarantees reliable update execution, and provides full auditability of device updates.
