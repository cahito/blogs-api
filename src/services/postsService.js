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
    const postsList = db.BlogPost.findAll({
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'category', through: {
          attributes: [],
          where: { () =>  }
        } },
      ],
    });

    return postsList;
  }, */

  getById: async (id) => {
    const post = await db.BlogPost.findByPk(id, {
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
      ],
    });
    if (!post) {
      const error = new Error('Post does not exist');
      error.status = 404;
      throw error;
    }

    return post;
  },
};

module.exports = postsService;
