const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (id, email, rol) => {
  if (!id || !email || !rol) {
    throw new Error('Email or id are missing');
  }
  return jwt.sign({ id, email, rol }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token is missing');
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };