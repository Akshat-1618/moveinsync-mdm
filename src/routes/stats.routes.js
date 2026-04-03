const express = require("express");
const router = express.Router();
const controller = require("../controllers/stats.controller");

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// Analytics endpoints → ADMIN + ANALYST
router.get("/active-devices", auth, role(["ADMIN", "ANALYST"]), controller.activeDevices);

router.get("/version-distribution", auth, role(["ADMIN", "ANALYST"]), controller.versionDistribution);

router.get("/update-success-rate", auth, role(["ADMIN", "ANALYST"]), controller.successRate);

module.exports = router;