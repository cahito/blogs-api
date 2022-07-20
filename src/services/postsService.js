const Joi = require('joi');
const { Op } = require('sequelize');
const db = require('../database/models');
const getUserIdFromToken = require('../middlewares/getUserIdFromToken');

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

  validateEditionValues: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      const err = new Error('Some required fields are missing');
      err.status = 400;
      throw err;
    }

    return value;
  },

  create: async (data, userId) => {
    const { title, content } = data;
    const newPost = await db.BlogPost.create({
      title, content, userId,
    });

    return newPost;
  },

  newPostCategory: async (postId, categoryIds) => {
    await Promise
      .all(categoryIds
        .map((categoryId) => db.PostCategory.create({ postId, categoryId })));
  },

  list: async () => {
    const postsList = await db.BlogPost.findAll({
      include:
      [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return postsList;
  },

  getById: async (id) => {
    const post = await db.BlogPost.findByPk(id, {
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!post) {
      const error = new Error('Post does not exist');
      error.status = 404;
      throw error;
    }

    return post;
  },

  validateUserThruLogin: async (token, postId) => {
    const userId = await getUserIdFromToken(token);
    const originalPost = await db.BlogPost.findByPk(postId);
    const userInPost = originalPost.dataValues.userId;

    if (userId !== userInPost) {
      const error = new Error('Unauthorized user');
      error.status = 401;
      throw error;
    }

    return true;
  },

  edit: async (data, postId) => {
    const { title, content } = data;
    await db.BlogPost.update({
      title,
      content,
    }, {
      where: {
        id: postId,
      },
    });
    const editedPost = await db.BlogPost.findByPk(postId, {
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return editedPost;
  },

  postExists: async (postId) => {
    const postExists = await db.BlogPost.findByPk(postId);
    if (!postExists) {
      const error = new Error('Post does not exist');
      error.status = 404;
      throw error;
    }
  },

  delete: async (postId) => {
    const result = await db.BlogPost.destroy({
      where: {
        id: postId,
      },
    });

    return result;
  },

  search: async (q) => {
    const postList = await postsService.list();
    if (!q || q.length === 0) return postList;
    const result = await db.BlogPost.findAll({
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}%` } },
        ],
      },
    });

    return result;
  },
};

module.exports = postsService;
