const { isUpgradeAllowed } = require("../services/version.service");

exports.checkUpgrade = async (req, res) => {
  try {
    const { current, target } = req.body;

    const allowed = await isUpgradeAllowed(current, target);

    res.json({
      current_version: current,
      target_version: target,
      allowed
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};