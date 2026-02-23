const DeviceUpdate = require("../models/deviceUpdate.model");

async function logUpdateEvent(data) {
  const event = await DeviceUpdate.create({
    device_imei: data.imei,
    job_id: data.jobId,
    state: data.state,
    reason: data.reason || null
  });

  return event;
}

async function getDeviceHistory(imei) {
  const history = await DeviceUpdate
    .find({ device_imei: imei })
    .sort({ timestamp: 1 });

  return history;
}

module.exports = { logUpdateEvent, getDeviceHistory };