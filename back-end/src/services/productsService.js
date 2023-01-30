const { Product, SalesProduct } = require('../database/models');

const getAllProducts = async () => {
  const products = await Product.findAll();

  return products;
};

const getProductsBySaleId = async (mySaleId) => {
  const products = await SalesProduct.findAll({
    where: {
      saleId: mySaleId, 
    },
  });
  console.log(products);
  return products;
};

const getProductsById = async (id) => {
  const product = await Product.findByPk(id);

  return product;
}

module.exports = {
  getAllProducts,
  getProductsById,
  getProductsBySaleId,
};