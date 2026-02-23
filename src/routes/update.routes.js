const express = require("express");
const router = express.Router();
const controller = require("../controllers/update.controller");

router.post("/schedule", controller.schedule);

module.exports = router;