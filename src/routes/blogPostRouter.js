const { Router } = require('express');
const blogPostController = require('../controllers/blogPostController');

const blogPostRouter = Router();

blogPostRouter.get('/:id', blogPostController.getById);
blogPostRouter.put('/:id', blogPostController.update);
blogPostRouter.post('/', blogPostController.add);
blogPostRouter.get('/', blogPostController.getAll);
module.exports = blogPostRouter; 