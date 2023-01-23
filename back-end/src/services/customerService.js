const { Sale } = require('../database/models');

const createOrder = async (obj) => {
  // console.log(obj);
  const order = await Sale.create({
  userId: obj.userId,
  sellerId: obj.sellerId,
  totalPrice: obj.totalPrice,
  deliveryAddress: obj.deliveryAddress,
  deliveryNumber: obj.deliveryNumber,
  saleDate: obj.saleDate,
  status: obj.status,
  });
  console.log(order);

  return order;
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