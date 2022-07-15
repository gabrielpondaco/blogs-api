const Joi = require('joi');
const jwt = require('jsonwebtoken');
const models = require('../database/models');
const { throwInvalidFieldsError } = require('./utils');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const loginService = {
  // https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
async validadeBody(body) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
  });
  const result = await schema.validateAsync(body);
  return result;
},

async createToken(payload) {
  const token = jwt.sign({ data: payload }, secret);
  return token;
},

async verifyToken(token) {
  const { data } = jwt.verify(token, secret);
  return data;
},

async getByEmail(body) {
  const { email, password } = body;
    const user = await models.User.findOne({
      where: { email },
      raw: true,
    });
    if (!user || user.password !== password) throwInvalidFieldsError('Invalid fields');
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
},
};

module.exports = loginService; 