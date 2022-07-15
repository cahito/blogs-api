const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');

const categoriesController = require('../controllers/categoriesController');

const router = Router();

router.post('/', validateToken, categoriesController.create);
router.get('/', validateToken, categoriesController.list);
// router.get('/:id', validateToken, categoriesController.getById);

module.exports = router;
