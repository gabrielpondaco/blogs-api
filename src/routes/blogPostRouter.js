const { Router } = require('express');
const blogPostController = require('../controllers/blogPostController');

const blogPostRouter = Router();

blogPostRouter.post('/', blogPostController.add);
blogPostRouter.get('/', blogPostController.getAll);
module.exports = blogPostRouter; 