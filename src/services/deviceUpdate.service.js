const DeviceUpdate = require("../models/deviceUpdate.model");
const Device = require("../models/device.model");
const UpdateJob = require("../models/updateJob.model");

const allowedTransitions = {
  notified: ["downloading"],
  downloading: ["installing", "failed"],
  installing: ["success", "failed"],
  success: [],
  failed: ["downloading"]
};

async function logUpdateEvent(data) {
  const lastEvent = await DeviceUpdate
    .findOne({ device_imei: data.imei, job_id: data.jobId })
    .sort({ timestamp: -1 });

  if (!lastEvent && data.state !== "notified") {
    throw new Error("First state must be 'notified'");
  }

  if (lastEvent) {
    const allowed = allowedTransitions[lastEvent.state] || [];
    if (!allowed.includes(data.state)) {
      throw new Error(`Invalid state transition from ${lastEvent.state} to ${data.state}`);
    }
  }

  if (data.state === "failed" && !data.reason) {
    throw new Error("Failure reason required when state is failed");
  }

  const event = await DeviceUpdate.create({
    device_imei: data.imei,
    job_id: data.jobId,
    state: data.state,
    reason: data.reason || null
  });

  if (data.state === "success") {
    const job = await UpdateJob.findById(data.jobId);
    if (job) {
      await Device.updateOne(
        { imei: data.imei },
        { app_version: job.target_version }
      );
    }
  }

  return event;
}

async function getDeviceHistory(imei) {
  return await DeviceUpdate
    .find({ device_imei: imei })
    .sort({ timestamp: 1 });
}

module.exports = { logUpdateEvent, getDeviceHistory };