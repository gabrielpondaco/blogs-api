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

  async getAll() {
      const blogPosts = await models.BlogPost.findAll({
        attributes: { exclude: ['UserId'] },
        include: [{
          model: models.User, 
          as: 'user',
          attributes: { exclude: ['password'] },
        },
      {
        model: models.Category,
        as: 'categories',
        through: { attributes: { exclude: ['postId', 'categoryId'] } },
      }],
      });
      return blogPosts;
  },

  async getById(id) {
    const blogPost = await models.BlogPost.findOne({
      where: { id },
      attributes: { exclude: ['UserId'] },
      include: [{
        model: models.User, 
        as: 'user',
        attributes: { exclude: ['password'] },
      },
    {
      model: models.Category,
      as: 'categories',
      through: { attributes: { exclude: ['postId', 'categoryId'] } },
    }],
    });
    return blogPost;
},
};

module.exports = blogPostService;