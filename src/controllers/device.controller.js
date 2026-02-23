const service = require("../services/device.service");

exports.register = async (req, res) => {
  try {
    const device = await service.registerDevice(req.body);
    res.json({ message: "Device registered", device });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.heartbeat = async (req, res) => {
  try {
    const device = await service.heartbeat(req.params.imei);
    res.json({ message: "Heartbeat updated", device });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.checkUpdate = async (req, res) => {
  try {
    const result = await service.checkForUpdate(req.params.imei);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};