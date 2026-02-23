const service = require("../services/update.service");

exports.schedule = async (req, res) => {
  try {
    const job = await service.scheduleUpdate(req.body);
    res.json({ message: "Update scheduled", job });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};