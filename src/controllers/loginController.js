const loginService = require('../services/loginService');

const loginController = {
  async login(req, res) {
    await loginService.validadeBody(req.body);
    const user = await loginService.getByEmail(req.body);
    const token = await loginService.createToken(user);
    res.json({ token });
  },
};

module.exports = loginController; 