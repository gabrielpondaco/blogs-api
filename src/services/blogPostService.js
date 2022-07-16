const Joi = require('joi');
const models = require('../database/models');

const blogPostService = {
  async validateBody(body) {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().items(Joi.number()).required(),
    }).messages({
      'string.empty': 'Some required fields are missing',
      'any.required': 'Some required fields are missing',
    });
    const result = await schema.validateAsync(body);
    return result;
  },
  async add({ title, content }, id) {
    const published = new Date();
    const updated = new Date();
    const user = await models.BlogPost
    .create({ title, content, userId: id, published, updated }, { raw: true });
    return user;
  },

  async addPostCategory(postId, categoryId) {
    const postCategory = await models.PostCategory.create({ postId, categoryId });
    return postCategory;
  },
};

module.exports = blogPostService;