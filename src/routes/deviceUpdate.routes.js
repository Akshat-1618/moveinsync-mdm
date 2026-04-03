const express = require("express");
const router = express.Router();
const controller = require("../controllers/deviceUpdate.controller");

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// Only ADMIN can report/update states
router.post("/report", auth, role(["ADMIN"]), controller.reportStatus);

// ADMIN + ANALYST can view history
router.get("/history/:imei", auth, role(["ADMIN", "ANALYST"]), controller.getHistory);

module.exports = router;