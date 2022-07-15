const authService = require('../services/authService');
// const jwtService = require('../services/jwtService');

const authController = {
  login: async (req, res) => {
    authService.validateLogin(req.body);
    const token = await authService.login(req.body);

    res.status(200).json({ token });
  },

  /* validateToken: (req, _res, next) => {
    const { authorization } = req.headers;
   
    jwtService.validateToken(authorization);

    next();
  }, */
};

module.exports = authController;
