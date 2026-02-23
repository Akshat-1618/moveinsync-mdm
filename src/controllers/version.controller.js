const service = require("../services/version.service");

exports.createVersion = async (req, res) => {
  try {
    const version = await service.createVersion(req.body);
    res.json({ message: "Version created", version });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.addTransition = async (req, res) => {
  try {
    const { from_version, to_version } = req.body;
    const rule = await service.addTransition(from_version, to_version);
    res.json({ message: "Transition added", rule });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};