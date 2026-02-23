const UpdateJob = require("../models/updateJob.model");
const AppVersion = require("../models/version.model");
const { isUpgradeAllowed } = require("./version.service");
const Device = require("../models/device.model");

async function scheduleUpdate(data) {
  
  const version = await AppVersion.findOne({ version_code: data.target_version });
  if (!version) throw new Error("Target version does not exist");

  const devices = await Device.find(data.region ? { region: data.region } : {});

  if (devices.length === 0) {
    throw new Error("No devices match the rollout target");
  }

  let valid = false;
  for (const d of devices) {
    if (await isUpgradeAllowed(d.app_version, data.target_version)) {
      valid = true;
      break;
    }
  }

  if (!valid) {
    throw new Error("Target version not reachable (downgrade or invalid path)");
  }

  return await UpdateJob.create({
    target_version: data.target_version,
    region: data.region,
    status: "scheduled"
  });
}

module.exports = { scheduleUpdate };