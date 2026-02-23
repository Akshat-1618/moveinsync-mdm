const Device = require("../models/device.model");
const UpdateJob = require("../models/updateJob.model");
const { isUpgradeAllowed } = require("./version.service");

async function registerDevice(data) {
  let device = await Device.findOne({ imei: data.imei });

  if (device) {
    device.app_version = data.app_version;
    device.os = data.os;
    device.region = data.region;
    device.last_seen = new Date();
    await device.save();
    return device;
  }

  device = await Device.create({
    imei: data.imei,
    app_version: data.app_version,
    os: data.os,
    region: data.region
  });

  return device;
}

async function heartbeat(imei) {
  const device = await Device.findOne({ imei });
  if (!device) throw new Error("Device not registered");

  device.last_seen = new Date();
  await device.save();
  return device;
}

async function checkForUpdate(imei) {
  const device = await Device.findOne({ imei });
  if (!device) throw new Error("Device not registered");

  const jobs = await UpdateJob.find({ status: "scheduled" });

  for (const job of jobs) {
    if (job.region && job.region !== device.region) continue;

    const allowed = await isUpgradeAllowed(device.app_version, job.target_version);

    if (allowed && device.app_version !== job.target_version) {
      return {
        update: true,
        from: device.app_version,
        to: job.target_version,
        jobId: job._id
      };
    }
  }

  return { update: false, current: device.app_version };
}

module.exports = { registerDevice, heartbeat, checkForUpdate };