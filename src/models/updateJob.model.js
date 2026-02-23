const mongoose = require("mongoose");

const updateJobSchema = new mongoose.Schema({
  target_version: { type: String, required: true },
  region: String,              
  created_at: { type: Date, default: Date.now },
  status: { type: String, default: "scheduled" }
});

module.exports = mongoose.model("UpdateJob", updateJobSchema);