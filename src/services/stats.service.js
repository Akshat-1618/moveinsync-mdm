const Device = require("../models/device.model");
const DeviceUpdate = require("../models/deviceUpdate.model");

async function activeDevices() {
  const threshold = new Date(Date.now() - 24 * 60 * 60 * 1000); // last 24h

  const count = await Device.countDocuments({
    last_seen: { $gte: threshold }
  });

  return { active_devices_last_24h: count };
}

async function versionDistribution() {
  const result = await Device.aggregate([
    { $group: { _id: "$app_version", count: { $sum: 1 } } }
  ]);

  return result.map(v => ({
    version: v._id,
    devices: v.count
  }));
}

async function successRate() {
  const total = await DeviceUpdate.countDocuments({
    state: { $in: ["success", "failed"] }
  });

  const success = await DeviceUpdate.countDocuments({ state: "success" });

  return {
    total_completed_updates: total,
    success_updates: success,
    success_rate: total ? ((success / total) * 100).toFixed(2) + "%" : "0%"
  };
}

module.exports = { activeDevices, versionDistribution, successRate };