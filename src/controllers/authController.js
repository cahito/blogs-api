const authService = require('../services/authService');

const authController = {
  login: async (req, res) => {
    authService.validateLogin(req.body);
    const token = await authService.login(req.body);

    res.status(200).json({ token });
  },
};

module.exports = authController;
