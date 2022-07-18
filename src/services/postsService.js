const Joi = require('joi');
const db = require('../database/models');

const postsService = {
  validateNewPost: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().required().min(1),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      const err = new Error('Some required fields are missing');
      err.status = 400;
      throw err;
    }
    
    return value;
  },

  validateCategories: async ({ categoryIds }) => {
    const data = await db.Category.findAll({
      attributes: { exclude: ['name'] },
    });
    const existingCategories = data.map((Category) => Category.dataValues.id);
    console.log('existingCategories no validateCategories', existingCategories);
    console.log('categoryIds no validateCategories', categoryIds);

    if (!categoryIds.every((id) => existingCategories
      .includes(id))) {
      const error = new Error('"categoryIds" not found');
      error.status = 400;
      throw error;
    }
  },

  create: async (data, userId) => {
    const { title, categoryIds, content } = data;
    const newPost = await db.BlogPost.create({
      title, categoryIds, content, userId,
    });
    
    return newPost;
  },

  newPostCategory: async (postId, categoryIds) => {
    await Promise
      .all(categoryIds
        .map((categoryId) => db.PostCategory.create({ postId, categoryId }))); 
  },

  /* list: () => {
    const categories = db.Category.findAll();
error.details[0].message
    return categories;
  }, */
};

module.exports = postsService;
