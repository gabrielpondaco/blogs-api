const categoriesService = require('../services/categoriesService');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');
const { throwTokenError } = require('../services/utils');

const userController = {
  async add(req, res) {
      const token = req.headers.authorization;
      if (!token) throwTokenError('Token not found');
      await validateTokenMiddleware.verifyToken(token);
      await categoriesService.validadeBody(req.body);
      const category = await categoriesService.add(req.body);
      res.status(201).json(category);
  },

  async getAll(req, res) {
    const token = req.headers.authorization;
    if (!token) throwTokenError('Token not found');
    await validateTokenMiddleware.verifyToken(token);
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  },
};

module.exports = userController; 