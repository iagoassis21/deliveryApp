const productsService = require('../services/productsService');

const getAllProducts = async (req, res) => {
  const products = await productsService.getAllProducts();
  return res.status(200).json(products);
};

const getProductsBySaleId = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productsService.getProductsBySaleId(id);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json({ message: 'Not found' });
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductsById(id);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  getProductsBySaleId,
};