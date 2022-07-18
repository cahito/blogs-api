const postsService = require('../services/postsService');
const getUserIdFromToken = require('../middlewares/getUserIdFromToken');

const postsController = {
  create: async (req, res) => {
    const data = await postsService.validateNewPost(req.body);
    await postsService.validateCategories(req.body);
    console.log('data no postsController', data);
    const userId = await getUserIdFromToken(req.headers.authorization);
    const newPost = await postsService.create(data, userId);
    console.log('newPost no postController.create: ', newPost.dataValues.id);
    await postsService.newPostCategory(newPost.dataValues.id, data.categoryIds);
    res.status(201).json(newPost);
  },

  /* list: async (_req, res) => {
    const categories = await categoriesService.list();

    res.status(200).json(categories);
  }, */
};

module.exports = postsController;
