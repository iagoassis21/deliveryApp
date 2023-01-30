const sellerService = require('../services/sellerService');

const getAllSellers = async (req, res) => {
  try {
    const result = await sellerService.getAllSellers();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: 'Not found' });
  }
};

module.exports = {
  getAllSellers,
};