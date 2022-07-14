const db = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
  validateLogin: ({ email, password }) => {
    if (!email || !password || email.length === 0 || password.length === 0) {
      const error = new Error('Some required fields are missing');
      error.status = 400;
      throw error;
    }
  },

  login: async ({ email, password }) => {
    const user = await db.User.findOne({
      attributes: { exclude: ['id', 'image', 'createdAt', 'updatedAt'] },
      where: { email },
    });
    if (!user || user.password !== password) {
      const error = new Error('Invalid fields');
      error.status = 400;
      throw error;
    }
    const { _password, ...userWithoutPassword } = user.dataValues;
    const token = jwtService.createToken(userWithoutPassword);

    return token;
  },
};

module.exports = authService;
