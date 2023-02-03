const admService = require('../services/admService');

const createUsers = async (req, res) => {
  try {
    await admService.admCreateUser(req.body);
    return res.status(201).json({ message: 'Created' });
  } catch (error) {
    return res.status(409).json({ message: 'Conflict' });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    await admService.deleteUser(id);
    return res.status(201).json({ message: 'Deleted' });
  } catch (error) {
    return res.status(409).json({ message: 'Not Found' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await admService.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(409).json({ message: 'Not Found' });
  }
};
module.exports = {
  createUsers,
  deleteUsers,
  getAllUsers,
};