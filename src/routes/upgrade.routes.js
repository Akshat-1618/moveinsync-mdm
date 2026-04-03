const express = require("express");
const router = express.Router();
const controller = require("../controllers/upgrade.controller");

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// ADMIN + ANALYST can check upgrade paths
router.post("/check", auth, role(["ADMIN", "ANALYST"]), controller.checkUpgrade);

module.exports = router;