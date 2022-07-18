const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');

const postsController = require('../controllers/postsController');

const router = Router();

router.post('/', validateToken, postsController.create);
// router.get('/', validateToken, postsController.list);
// router.get('/:id', validateToken, postsController.getById);

module.exports = router;