const { Router } = require('express');
const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/', userController.add);
userRouter.get('/', userController.get);
userRouter.get('/:id', userController.getById);

module.exports = userRouter; 