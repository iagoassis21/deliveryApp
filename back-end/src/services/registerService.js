const md5 = require('md5');
const { User } = require('../database/models');
const createToken = require('../utils/createToken');
// const validateRegister = require('../utils/validateRegister');

const createUser = async (obj) => {
  // validateRegister(obj);
  const passCrypt = md5(obj.password);
  const user = await User.findOne({ where: { email: obj.email } });
  // console.log(user);

  if (user !== null) {
    throw new Error('Conflict');
  }
  
  const { dataValues } = await User.create({
    name: obj.name,
    email: obj.email,
    password: passCrypt,
    role: 'customer',
  });

  const { id, password, email, role, name } = dataValues;

  const token = createToken({ id, name, email, role });
  console.log(token);
  
  return { id, name, email, role }
};

module.exports = {
  createUser,
};