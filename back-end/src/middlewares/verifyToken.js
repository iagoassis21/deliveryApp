const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await loginService.getUser(decoded.data.userId);
   
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