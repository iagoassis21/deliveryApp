const registerService = require('../services/registerService');

const createUser = async (req, res) => {
  try {
    const result = await registerService.createUser(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(409).json({ message: 'Conflict' });
  }
};

module.exports = {
  createUser,
};