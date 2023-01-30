const jwt = require('jsonwebtoken');
const jwtKey = require('fs')
  .readFileSync('../back-end/jwt.evaluation.key', { encoding: 'utf-8' });
const loginService = require('../services/loginService');

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, jwtKey);
    const user = await loginService.getUserbyId(decoded.data.id);

    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = verifyToken;