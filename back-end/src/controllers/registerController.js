const registerService = require('../services/registerService');

const createUser = async (req, res) => {
  try {
    await registerService.createUser(req.body);
    return res.status(201).json({ message: 'Created' });
  } catch (error) {
    return res.status(409).json({ message: 'Conflict' });
  }
};

module.exports = {
  createUser,
};