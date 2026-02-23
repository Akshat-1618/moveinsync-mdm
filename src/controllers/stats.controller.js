const service = require("../services/stats.service");

exports.activeDevices = async (req, res) => {
  res.json(await service.activeDevices());
};

exports.versionDistribution = async (req, res) => {
  res.json(await service.versionDistribution());
};

exports.successRate = async (req, res) => {
  res.json(await service.successRate());
};