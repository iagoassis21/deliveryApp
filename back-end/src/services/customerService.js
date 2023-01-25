const { Sale, SalesProduct } = require('../database/models');

const createOrder = async (obj) => {
  const order = await Sale.create({
    userId: obj.userId,
    sellerId: obj.sellerId,
    totalPrice: obj.totalPrice,
    deliveryAddress: obj.deliveryAddress,
    deliveryNumber: obj.deliveryNumber,
    saleDate: new Date(),
    status: obj.status || 'Pendente',
  });
   obj.products.map(async ({ productId, quantity }) => {
    await SalesProduct.create({
      saleId: order.id,
      productId,
      quantity,
    });
  });

  return order.id;
};

const getOrder = async (id) => {
  const order = await Sale.findByPk(id);

  if (!order) throw new Error('Not found');

  return order;
};

module.exports = {
  createOrder,
  getOrder,
};
