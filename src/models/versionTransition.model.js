const mongoose = require("mongoose");

const transitionSchema = new mongoose.Schema({
  from_version: { type: String, required: true },
  to_version: { type: String, required: true }
});

module.exports = mongoose.model("VersionTransition", transitionSchema);