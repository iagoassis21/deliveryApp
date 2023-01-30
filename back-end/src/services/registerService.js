const md5 = require('md5');
const { User } = require('../database/models');
const createToken = require('../utils/createToken');
// const validateRegister = require('../utils/validateRegister');

const createUser = async (obj) => {
  // validateRegister(obj);
  const passCrypt = md5(obj.password);
  const user = await User.findOne({ where: { email: obj.email } });

  if (user !== null) {
    throw new Error('Conflict');
  }
  
  const { dataValues } = await User.create({
    name: obj.name,
    email: obj.email,
    password: passCrypt,
    role: 'customer',
  });

  const { id, name, email, role } = dataValues;

  const token = createToken({ id, name, email, role });
  
  return { id, name, email, role, token };
};

module.exports = {
  createUser,
};