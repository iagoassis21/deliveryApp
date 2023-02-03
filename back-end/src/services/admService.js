const md5 = require('md5');
const { User } = require('../database/models');
const createToken = require('../utils/createToken');
const validateRegister = require('../utils/validateRegister');

const admCreateUser = async (obj) => {
  validateRegister(obj);
  const passCrypt = md5(obj.password);
  const user = await User.findOne({ where: { email: obj.email } });

  if (user !== null) {
    throw new Error('Conflict');
  }

  await User.create({
    name: obj.name,
    email: obj.email,
    password: passCrypt,
    role: obj.role,
  });

  return createToken({ ...obj, password: '_' });
};

const deleteUser = async (id) => {
  const user = await User.destroy({ where: { id } });

  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

module.exports = {
  admCreateUser,
  deleteUser,
  getAllUsers,
};