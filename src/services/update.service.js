const UpdateJob = require("../models/updateJob.model");
const AppVersion = require("../models/version.model");

async function scheduleUpdate(data) {
  // ensure version exists
  const version = await AppVersion.findOne({ version_code: data.target_version });
  if (!version) throw new Error("Target version does not exist");

  const job = await UpdateJob.create({
    target_version: data.target_version,
    region: data.region
  });

  return job;
}

module.exports = { scheduleUpdate };