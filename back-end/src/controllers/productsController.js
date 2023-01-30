const productsService = require('../services/productsService');

const getAllProducts = async (req, res) => {
  const products = await productsService.getAllProducts();
  return res.status(200).json(products);
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductsById(id);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error });
  }
  

}

module.exports = {
  getAllProducts,
  getProductsById,
};