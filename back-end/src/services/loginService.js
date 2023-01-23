const md5 = require('md5');
const { User } = require('../database/models');
const createToken = require('../utils/createToken');

const getUser = async ({ email, password }) => {
  const passCrypt = md5(password);
  const user = await User.findOne({ where: { email } });
  
  if (!user || user.password !== passCrypt) throw new Error('Not found');
  
  const { password: _, ...userWithPass } = user.dataValues;
  const token = createToken(userWithPass);
  delete userWithPass.id;   
  return { ...userWithPass, token };
};

module.exports = {
  getUser,
};