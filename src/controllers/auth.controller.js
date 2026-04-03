const service = require("../services/auth.service");

exports.register = async (req, res) => {
  const user = await service.register(req.body);
  res.json(user);
};

exports.login = async (req, res) => {
  const token = await service.login(req.body.email, req.body.password);
  res.json({ token });
};