const postsService = require('../services/postsService');
const getUserIdFromToken = require('../middlewares/getUserIdFromToken');

const postsController = {
  create: async (req, res) => {
    const data = await postsService.validateNewPost(req.body);
    await postsService.validateCategories(req.body);
    const userId = await getUserIdFromToken(req.headers.authorization);
    const newPost = await postsService.create(data, userId);
    await postsService.newPostCategory(newPost.dataValues.id, data.categoryIds);

    res.status(201).json(newPost);
  },

  list: async (_req, res) => {
    const postsList = await postsService.list();

    res.status(200).json(postsList);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const post = await postsService.getById(id);

    res.status(200).json(post);
  },
};

module.exports = postsController;
