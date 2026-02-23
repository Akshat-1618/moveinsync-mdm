const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema({
  version_code: { type: String, required: true, unique: true },
  release_date: { type: Date, default: Date.now },
  mandatory: { type: Boolean, default: false },
  supported_os: [String]
});

module.exports = mongoose.model("AppVersion", versionSchema);