const express = require("express");
const router = express.Router();
const controller = require("../controllers/stats.controller");

router.get("/active-devices", controller.activeDevices);
router.get("/version-distribution", controller.versionDistribution);
router.get("/update-success-rate", controller.successRate);

module.exports = router;