require('dotenv');
const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const secretKey = process.env.JWT_SECRET || 'secret_key';
  const token = jwt.sign({ data }, secretKey, {
    expiresIn: '15d',
    algorithm: 'HS256',
  });

  return token;
};

module.exports = createToken;
