const Joi = require('joi');
const db = require('../database/models');

const usersService = {
  validateNewUser: (data) => {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      image: Joi.string(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      throw err;
    }
    
    return value;
  },

  create: async ({ displayName, email, password, image }) => {
    const oldUser = await db.User.findOne({
      attributes: { exclude: ['id', 'image', 'createdAt', 'updatedAt'] },
      where: { email },
    });

    if (oldUser) {
      const error = new Error('User already registered');
      error.status = 409;
      throw error;
    }

    const newUser = await db.User.create({
      displayName,
      email,
      password,
      image,
    });

    return newUser;
  },

  list: async () => {
    const usersList = await db.User.findAll({
      attributes: { exclude: ['password'] },
    });

    return usersList;
  },
};

module.exports = usersService;
