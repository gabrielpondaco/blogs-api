const blogPostService = require('../services/blogPostService');
const categoriesService = require('../services/categoriesService');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');
const { throwTokenError, throwInvalidFieldsError } = require('../services/utils');

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
    const object = { id: blogPostCreated.id,
        title: req.body.title,
        content: req.body.content,
        userId: id,
        published: blogPostCreated.published,
        updated: blogPostCreated.updated,
      };
    res.status(201).json(object);
  },
};

module.exports = blogPostController;