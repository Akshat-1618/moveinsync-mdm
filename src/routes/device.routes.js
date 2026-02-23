const express = require("express");
const router = express.Router();
const controller = require("../controllers/device.controller");

router.post("/register", controller.register);
router.post("/heartbeat/:imei", controller.heartbeat);
router.get("/check-update/:imei", controller.checkUpdate);

module.exports = router;