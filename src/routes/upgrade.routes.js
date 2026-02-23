const express = require("express");
const router = express.Router();
const controller = require("../controllers/upgrade.controller");

router.post("/check", controller.checkUpgrade);

module.exports = router;