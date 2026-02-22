const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  imei: { type: String, required: true, unique: true },
  app_version: { type: String, required: true },
  os: String,
  region: String,
  last_seen: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Device", deviceSchema);