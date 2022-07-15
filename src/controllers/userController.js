const userService = require('../services/userService');
const loginService = require('../services/loginService');

const userController = {
  async add(req, res) {
    await userService.validadeBody(req.body);
    await userService.getUser(req.body);
    const user = userService.addUser(req.body);
    const token = await loginService.createToken(user);
    res.status(201).json({ token });
  },
};

module.exports = userController; 