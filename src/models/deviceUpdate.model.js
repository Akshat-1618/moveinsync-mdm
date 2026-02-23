const mongoose = require("mongoose");

const deviceUpdateSchema = new mongoose.Schema({
  device_imei: String,
  job_id: String,
  state: {
    type: String,
    enum: ["notified", "downloading", "installing", "success", "failed"],
    required: true
  },
  timestamp: { type: Date, default: Date.now },
  reason: String
});

module.exports = mongoose.model("DeviceUpdate", deviceUpdateSchema);