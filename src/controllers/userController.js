const userService = require('../services/userService');
const loginService = require('../services/loginService');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');

const userController = {
  async add(req, res) {
    await userService.validadeBody(req.body);
    await userService.getByEmail(req.body);
    const user = userService.addUser(req.body);
    const token = await loginService.createToken(user);
    res.status(201).json({ token });
  },

  async get(req, res) {
    await validateTokenMiddleware.verifyToken(req.headers);
    const userList = await userService.getAll();
    res.status(200).json(userList);
  },

  async getById(req, res) {
    await validateTokenMiddleware.verifyToken(req.headers);
    const { id } = req.params;
    const user = await userService.getById(id);
    res.status(200).json(user);
  },

  async delete(req, res) {
      const { id } = await validateTokenMiddleware.verifyToken(req.headers);
      await userService.delete(id);
      res.sendStatus(204);
  },
};

module.exports = userController; 