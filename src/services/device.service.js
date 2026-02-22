const Device = require("../models/device.model");

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

module.exports = { registerDevice, heartbeat };