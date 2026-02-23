const service = require("../services/deviceUpdate.service");

exports.reportStatus = async (req, res) => {
  try {
    const event = await service.logUpdateEvent(req.body);
    res.json({ message: "Update state recorded", event });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await service.getDeviceHistory(req.params.imei);

    const timeline = history.map(h => ({
      time: new Date(h.timestamp).toLocaleString(),
      state: h.state,
      reason: h.reason
    }));

    res.json({
      device: req.params.imei,
      timeline
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};