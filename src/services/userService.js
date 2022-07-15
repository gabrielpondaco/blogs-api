const Joi = require('joi');
const models = require('../database/models');
const { throwConflictError } = require('./utils');

const userService = {
  async validadeBody(body) {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      image: Joi.string(),
    });
    const result = await schema.validateAsync(body);
    return result;
  },

  async getUser(body) {
    const user = await models.User.findOne({
      where: { email: body.email },
    });
    if (user) throwConflictError('User already registered');
    return user;
  },

  async getAll() {
    const user = await models.User.findAll({
      raw: true,
      attributes: { exclude: ['password'] },
    });
    return user;
  },

  async addUser(body) {
    const user = await models.User.create(body, { raw: true });
    return user;
  },
};

module.exports = userService;