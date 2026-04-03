const express = require("express");
const router = express.Router();
const controller = require("../controllers/update.controller");

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// Only ADMIN can schedule updates
router.post("/schedule", auth, role(["ADMIN"]), controller.schedule);

module.exports = router;