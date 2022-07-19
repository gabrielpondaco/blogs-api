const categoriesService = require('../services/categoriesService');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');

const userController = {
  async add(req, res) {
      await validateTokenMiddleware.verifyToken(req.headers);
      await categoriesService.validadeBody(req.body);
      const category = await categoriesService.add(req.body);
      res.status(201).json(category);
  },

  async getAll(req, res) {
    await validateTokenMiddleware.verifyToken(req.headers);
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  },
};

module.exports = userController; 