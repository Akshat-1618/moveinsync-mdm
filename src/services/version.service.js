const AppVersion = require("../models/version.model");
const VersionTransition = require("../models/versionTransition.model");

async function createVersion(data) {
  const exists = await AppVersion.findOne({ version_code: data.version_code });
  if (exists) throw new Error("Version already exists");

  const version = await AppVersion.create(data);
  return version;
}

async function addTransition(from_version, to_version) {
  
  if (from_version === to_version)
    throw new Error("Invalid transition");

  const fromExists = await AppVersion.findOne({ version_code: from_version });
  const toExists = await AppVersion.findOne({ version_code: to_version });

  if (!fromExists || !toExists)
    throw new Error("Version not found");

  const already = await VersionTransition.findOne({ from_version, to_version });
  if (already) throw new Error("Transition already exists");

  return await VersionTransition.create({ from_version, to_version });
}

async function isUpgradeAllowed(current, target) {
  if (current === target) return true;

  const transitions = await VersionTransition.find({});
  
  const graph = {};
  transitions.forEach(t => {
    if (!graph[t.from_version]) graph[t.from_version] = [];
    graph[t.from_version].push(t.to_version);
  });

  const queue = [current];
  const visited = new Set();

  while (queue.length) {
    const v = queue.shift();
    if (v === target) return true;

    visited.add(v);

    const neighbors = graph[v] || [];
    for (const next of neighbors) {
      if (!visited.has(next)) queue.push(next);
    }
  }

  return false;
}

module.exports = { createVersion, addTransition, isUpgradeAllowed };