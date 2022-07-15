const { Router } = require('express');
const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/', userController.add);
userRouter.get('/', userController.get);

module.exports = userRouter; 