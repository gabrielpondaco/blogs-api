const Joi = require('joi');
const models = require('../database/models');

const categoriesService = {
  async validadeBody(body) {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const result = await schema.validateAsync(body);
    return result;
  },
  async add(body) {
    const user = await models.Category.create(body, { raw: true });
    return user;
  },
};

module.exports = categoriesService;