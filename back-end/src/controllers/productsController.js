const productsService = require('../services/productsService');

const getAllProducts = async (req, res) => {
  const products = await productsService.findAllProducts();
  return res.status(200).json({ products });
};

module.exports = {
  getAllProducts,
};