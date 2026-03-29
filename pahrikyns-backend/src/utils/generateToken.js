const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(payload, expiresIn = '1d') {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

module.exports = generateToken;