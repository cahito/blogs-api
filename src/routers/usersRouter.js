const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');

const usersController = require('../controllers/usersController');

const router = Router();

router.post('/', usersController.create);
router.get('/', validateToken, usersController.list);
router.get('/:id', validateToken, usersController.getById);
router.delete('/me', validateToken, usersController.delete);

module.exports = router;
