const express = require("express");
const router = express.Router();
const controller = require("../controllers/device.controller");

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// Only ADMIN can register devices
router.post("/register", auth, role(["ADMIN"]), controller.register);

// Any authenticated user can send heartbeat
router.post("/heartbeat/:imei", auth, controller.heartbeat);

// Any authenticated user can check updates
router.get("/check-update/:imei", auth, controller.checkUpdate);

module.exports = router;