const express = require("express");
const router = express.Router();
const controller = require("../controllers/version.controller");

router.post("/create", controller.createVersion);
router.post("/transition", controller.addTransition);

module.exports = router;