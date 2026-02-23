const AppVersion = require("../models/version.model");
const VersionTransition = require("../models/versionTransition.model");

// create a new version
async function createVersion(data) {
  const exists = await AppVersion.findOne({ version_code: data.version_code });
  if (exists) throw new Error("Version already exists");

  const version = await AppVersion.create(data);
  return version;
}

// add allowed upgrade path
async function addTransition(from_version, to_version) {
  // prevent self upgrade
  if (from_version === to_version)
    throw new Error("Invalid transition");

  // ensure versions exist
  const fromExists = await AppVersion.findOne({ version_code: from_version });
  const toExists = await AppVersion.findOne({ version_code: to_version });

  if (!fromExists || !toExists)
    throw new Error("Version not found");

  // prevent duplicate rule
  const already = await VersionTransition.findOne({ from_version, to_version });
  if (already) throw new Error("Transition already exists");

  return await VersionTransition.create({ from_version, to_version });
}

// check if upgrade path exists using BFS
async function isUpgradeAllowed(current, target) {
  if (current === target) return true;

  const transitions = await VersionTransition.find({});
  
  // build adjacency list
  const graph = {};
  transitions.forEach(t => {
    if (!graph[t.from_version]) graph[t.from_version] = [];
    graph[t.from_version].push(t.to_version);
  });

  // BFS
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