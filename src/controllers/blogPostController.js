const blogPostService = require('../services/blogPostService');
const categoriesService = require('../services/categoriesService');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');
const { throwTokenError, 
  throwInvalidFieldsError, throwNotFoundError } = require('../services/utils');

const blogPostController = {
  async add(req, res) {
    const token = req.headers.authorization;
    if (!token) throwTokenError('Token not found');
    const { id } = await validateTokenMiddleware.verifyToken(token);
    await blogPostService.validateBody(req.body);
    const exist = await Promise.all(req.body.categoryIds
      .map((category) => categoriesService.getById(category)));
    if (exist.includes(null)) throwInvalidFieldsError('"categoryIds" not found');
    const blogPostCreated = await blogPostService.add(req.body, id);
    await Promise.all(req.body.categoryIds
      .map((categoryId) => blogPostService.addPostCategory(blogPostCreated.id, categoryId)));
    res.status(201).json(blogPostCreated);
  },

  async getAll(req, res) {
    const token = req.headers.authorization;
    if (!token) throwTokenError('Token not found');
    await validateTokenMiddleware.verifyToken(token);
    const blogPosts = await blogPostService.getAll();
    res.json(blogPosts);
  },

  async getById(req, res) {
    const token = req.headers.authorization;
    if (!token) throwTokenError('Token not found');
    await validateTokenMiddleware.verifyToken(token);
    const { id } = req.params;
    const blogPost = await blogPostService.getById(id);
    if (!blogPost) throwNotFoundError('Post does not exist');
    res.json(blogPost);
  },

  async update(req, res) {
    const token = req.headers.authorization;
    if (!token) throwTokenError('Token not found');
    const { id } = await validateTokenMiddleware.verifyToken(token);
    await blogPostService.validateBodyUpdate(req.body);
    const blogPost = await blogPostService.getById(req.params.id);
    if (blogPost.userId !== id) throwTokenError('Unauthorized user');
    await blogPostService.update(req.body, req.params.id);
    const updatedBlogPost = await blogPostService.getById(req.params.id);
    res.json(updatedBlogPost);
  },

};

module.exports = blogPostController;