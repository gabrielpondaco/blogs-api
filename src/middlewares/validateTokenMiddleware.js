const jwt = require('jsonwebtoken');
const { throwTokenError } = require('../services/utils');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateTokenMiddleware = {
  async verifyToken(headers) {
    const token = headers.authorization;
    if (!token) throwTokenError('Token not found');
    try {
      const { data } = jwt.verify(token, secret);
      return data;
    } catch (error) {
      throwTokenError('Expired or invalid token');
    }
  },
};

module.exports = validateTokenMiddleware;