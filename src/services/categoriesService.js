const Joi = require('joi');
const db = require('../database/models');

const postsService = {
  validateNewCategory: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      throw err;
    }
    
    return value;
  },

  create: ({ name }) => {
    const newCategory = db.Category.create({
      name,
    });

    return newCategory;
  },

  /* list: () => {
    const categories = db.Category.findAll();

    return categories;
  }, */
};

module.exports = postsService;
