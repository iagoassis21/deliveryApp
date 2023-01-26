const jwt = require('jsonwebtoken');

const readingToken = (token) => {
  const secret = process.env.JWT_SECRET;
  const userData = jwt.verify(token, secret);
  return userData.userNotPassWord;
};

module.exports = { readingToken };