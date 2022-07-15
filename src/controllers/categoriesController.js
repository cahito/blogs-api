const categoriesService = require('../services/categoriesService');

const categoriesController = {
  create: async (req, res) => {
      categoriesService.validateNewCategory(req.body);
      const newCategory = await categoriesService.create(req.body);
      
      res.status(201).json(newCategory);
  },
};

module.exports = categoriesController;