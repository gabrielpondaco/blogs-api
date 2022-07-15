const categoriesService = require('../services/categoriesService');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');
const { throwTokenError } = require('../services/utils');

const userController = {
  async add(req, res) {
      const token = req.headers.authorization;
      if (!token) throwTokenError('Token not found');
      await validateTokenMiddleware.verifyToken(token);
      console.log(req.body);
      await categoriesService.validadeBody(req.body);
      const category = await categoriesService.add(req.body);
      res.status(201).json(category);
  },

};

module.exports = userController; 