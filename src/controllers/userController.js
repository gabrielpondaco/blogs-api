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
};

module.exports = userController; 