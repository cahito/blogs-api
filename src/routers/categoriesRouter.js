const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');

const categoriesController = require('../controllers/categoriesController');

const router = Router();

router.post('/', validateToken, categoriesController.create);
// router.get('/', validateToken, usersController.list);
// router.get('/:id', validateToken, usersController.getById);

module.exports = router;
