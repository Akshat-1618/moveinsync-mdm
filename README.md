# Mobile Device Management (MDM) System – Moveinsync Case Study

A scalable backend system designed to centrally manage application updates across devices, enforce safe upgrade paths, and maintain a complete audit trail of the update lifecycle.

The system focuses on controlled rollouts, rule-based validation, and real-time analytics, demonstrating strong backend architecture and business logic implementation.

---

## 🚀 How to Run

npm install  
npm run dev  

Create a `.env` file:

PORT=3000  
MONGO_URI=mongodb://127.0.0.1:27017/mdm_system  
JWT_SECRET=your_secret_key  

---

## 📌 Features

### 🔹 Device & Lifecycle Management
- Device registration and heartbeat tracking  
- Real-time status updates  
- Device-specific update handling  

### 🔹 Version Control & Validation
- Version repository with metadata  
- Directed graph-based version transitions  
- Upgrade validation using Breadth-First Search (BFS)  
- Downgrade prevention through controlled transitions  

### 🔹 Workflow Engine
- State machine implementation for update lifecycle:  
  notified → downloading → installing → success/failed  
- Strict validation of allowed transitions  
- Retry handling for failure states  

### 🔹 Update Scheduling
- Targeted rollout scheduling  
- Region-based filtering  
- Controlled deployment strategies  

### 🔹 Audit & Event Tracking
- Complete timeline of update events  
- Persistent history for each device  
- Structured logging for debugging and traceability  

### 🔹 Analytics & Insights
- Active devices tracking (last 24 hours)  
- Version distribution across fleet  
- Update success rate calculation  
- Aggregated metrics for dashboard consumption  

### 🔹 Access Control (RBAC)
- JWT-based authentication  
- Role-based authorization:  
  Admin → full system control  
  Analyst → analytics & read access  
  Viewer → limited access  
- Middleware-driven request validation  

---

## 🧠 Core Concepts & Design

### 🔸 Layered Architecture
Clear separation of concerns:  
Routes → Controllers → Services → Models  

- Controllers handle request/response  
- Services encapsulate business logic  
- Models define data structure  
- Routes define API endpoints  

---

### 🔸 Graph-Based Validation
Version transitions are modeled as a directed graph.

- Each version acts as a node  
- Allowed upgrades are edges  
- BFS is used to validate reachability  

This ensures safe upgrades and prevents invalid transitions.

---

### 🔸 Finite State Machine (FSM)
Update lifecycle is managed using a state machine:

- Enforces valid state transitions  
- Prevents inconsistent system states  
- Supports retry logic  

---

### 🔸 Event-Driven Design
- Each update step is logged as an event  
- Enables audit trails and debugging  
- Supports historical analysis  

---

### 🔸 Analytics-Ready System
- Uses aggregation queries for insights  
- Designed to support dashboard APIs  
- Efficient computation of metrics  

---

## 🔄 Demo Flow

1. Register device  
2. Create application versions  
3. Define allowed transitions between versions  
4. Schedule update rollout  
5. Device checks for available updates  
6. Device reports update lifecycle events  
7. View update history (timeline)  
8. Access analytics and system insights  

---

## 🛠 Tech Stack

Node.js  
Express.js  
MongoDB  
Mongoose  
JWT Authentication  
bcrypt (password hashing)  

---

## 📁 Project Structure

src/  
  controllers/  
  services/  
  models/  
  routes/  
  middlewares/  
  config/  

- Controllers → request handling  
- Services → business logic  
- Models → database schemas  
- Routes → API definitions  
- Middlewares → authentication & authorization  

---

## 🔐 Access Control

- Authentication handled using JWT tokens  
- Authorization enforced via role-based middleware  

Flow:  
Request → Auth Middleware → Role Check → Controller → Service  

---

## ⚙️ Key Design Highlights

- Clean and modular architecture  
- Strong separation of concerns  
- Rule-based processing instead of simple CRUD  
- Scalable and extensible backend design  
- Real-world workflow handling (FSM + graph validation)  
- Efficient analytics using aggregation  

---

## 📍 Outcome

This system ensures:

- Controlled and safe update rollouts  
- Prevention of invalid or unsafe version transitions  
- Reliable execution of update workflows  
- Complete auditability of device update lifecycle  
- Actionable insights through analytics  

---

## 🔮 Future Enhancements

- Input validation (Joi / Zod)  
- Pagination and advanced filtering  
- API documentation (Swagger/OpenAPI)  
- Unit and integration testing  
- Rate limiting and security improvements  