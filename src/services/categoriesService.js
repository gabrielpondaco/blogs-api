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

  async getAll() {
    const categories = await models.Category.findAll();
    return categories;
  },

  async getById(id) {
    const category = await models.Category.findByPk(id);
    return category;
  },
};

module.exports = categoriesService;