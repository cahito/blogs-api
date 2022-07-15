const usersService = require('../services/usersService');
const authService = require('../services/authService');

const usersController = {
  create: async (req, res) => {
      usersService.validateNewUser(req.body);
      await usersService.create(req.body);
      const token = await authService.login(req.body);
      
      res.status(201).json({ token });
  },
};

module.exports = usersController;
