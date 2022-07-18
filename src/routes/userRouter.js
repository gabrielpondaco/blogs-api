const { Router } = require('express');
const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/:id', userController.getById);
userRouter.delete('/me', userController.delete);
userRouter.post('/', userController.add);
userRouter.get('/', userController.get);

module.exports = userRouter; 