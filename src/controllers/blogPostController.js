const blogPostService = require('../services/blogPostService');
const categoriesService = require('../services/categoriesService');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');
const { throwTokenError, 
  throwInvalidFieldsError, throwNotFoundError } = require('../services/utils');

const blogPostController = {
  async add(req, res) {
    const { id } = await validateTokenMiddleware.verifyToken(req.headers);
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
    await validateTokenMiddleware.verifyToken(req.headers);
    const blogPosts = await blogPostService.getAll();
    res.json(blogPosts);
  },

  async getById(req, res) {
    await validateTokenMiddleware.verifyToken(req.headers);
    const { id } = req.params;
    const blogPost = await blogPostService.getById(id);
    if (!blogPost) throwNotFoundError('Post does not exist');
    res.json(blogPost);
  },

  async update(req, res) {
    const { id } = await validateTokenMiddleware.verifyToken(req.headers);
    await blogPostService.validateBodyUpdate(req.body);
    const blogPost = await blogPostService.getById(req.params.id);
    if (blogPost.userId !== id) throwTokenError('Unauthorized user');
    await blogPostService.update(req.body, req.params.id);
    const updatedBlogPost = await blogPostService.getById(req.params.id);
    res.json(updatedBlogPost);
  },

  async delete(req, res) {
    const { id } = await validateTokenMiddleware.verifyToken(req.headers);
    const blogPost = await blogPostService.getById(req.params.id);
    if (!blogPost) throwNotFoundError('Post does not exist');
    if (blogPost.userId !== id) throwTokenError('Unauthorized user');
    await blogPostService.delete(req.params.id);
    res.send(204);
  },

  async search(req, res) {
    const { q } = req.query;
    await validateTokenMiddleware.verifyToken(req.headers);
    const blogPost = await blogPostService.search(q);
    res.json(blogPost);
  },
};

module.exports = blogPostController;