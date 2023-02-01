const loginService = require('../services/loginService');

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginService.getUser({ email, password });
    return res.status(200).json(token);
  } catch (error) {
    return res.status(404).json({ message: 'Not found' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await loginService.getUserbyId(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: 'Not found' });
  }
};

module.exports = {
  getUser,
  getUserById,
};