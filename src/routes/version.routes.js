const express = require("express");
const router = express.Router();
const controller = require("../controllers/version.controller");

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// Only ADMIN can create versions
router.post("/create", auth, role(["ADMIN"]), controller.createVersion);

// Only ADMIN can define transitions (graph rules)
router.post("/transition", auth, role(["ADMIN"]), controller.addTransition);

module.exports = router;