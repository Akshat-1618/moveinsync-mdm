const express = require("express");
const router = express.Router();
const controller = require("../controllers/deviceUpdate.controller");

router.post("/report", controller.reportStatus);
router.get("/history/:imei", controller.getHistory);

module.exports = router;