const Joi = require('joi');
const models = require('../database/models');
const { throwConflictError, throwNotFoundError } = require('./utils');

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

  async getByEmail(body) {
    const user = await models.User.findOne({
      where: { email: body.email },
    });
    if (user) throwConflictError('User already registered');
    return user;
  },

  async getById(id) {
    const user = await models.User.findByPk(id, {
      raw: true,
      attributes: { exclude: ['password'] },
    });
    if (!user) throwNotFoundError('User does not exist');
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

  async delete(id) {
    await models.User.destroy({
      where: {
        id,
      },
    });
  },
};

module.exports = userService;