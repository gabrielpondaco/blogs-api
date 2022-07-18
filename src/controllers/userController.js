const userService = require('../services/userService');
const loginService = require('../services/loginService');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');
const { throwTokenError } = require('../services/utils');

const userController = {
  async add(req, res) {
    await userService.validadeBody(req.body);
    await userService.getByEmail(req.body);
    const user = userService.addUser(req.body);
    const token = await loginService.createToken(user);
    res.status(201).json({ token });
  },

  async get(req, res) {
    const token = req.headers.authorization;
    if (!token) throwTokenError('Token not found');
    await validateTokenMiddleware.verifyToken(token);
    const userList = await userService.getAll();
    res.status(200).json(userList);
  },

  async getById(req, res) {
    const token = req.headers.authorization;
    if (!token) throwTokenError('Token not found');
    await validateTokenMiddleware.verifyToken(token);
    const { id } = req.params;
    const user = await userService.getById(id);
    res.status(200).json(user);
  },

  async delete(req, res) {
      const token = req.headers.authorization;
      if (!token) throwTokenError('Token not found');
      const { id } = await validateTokenMiddleware.verifyToken(token);
      await userService.delete(id);
      res.sendStatus(204);
  },
};

module.exports = userController; 