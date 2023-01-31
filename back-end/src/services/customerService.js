const { Sale, SalesProduct, Product } = require('../database/models');

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
  const order = await Sale.findAll({ where: { id: id }, include: 'products' });

  if (!order) throw new Error('Not found');

  return order;
};

const getOrderBySeller = async (id) => {
  const sales = await Sale.findAll({ where: { sellerId: id }, include: 'products' });

  return sales;
};

const getOrderByUser = async (id) => {
  const sales = await Sale.findAll({ where: { userId: id } });

  return sales;
};

const getAllOrders = async () => {
  const sales = await Sale.findAll();

  return sales;
};

const updateStatus = async (id, newStatus) => {
  const sale = await Sale.findByPk(id);

  if (!sale) return new Error('Conflict');
  // console.log(newStatus, typeof (newStatus));
  const upStatus = await Sale.update({ status: newStatus }, { where: { id } });
  // console.log(upStatus);
  return upStatus;
};

module.exports = {
  createOrder,
  getOrder,
  getOrderBySeller,
  getOrderByUser,
  updateStatus,
  getAllOrders,
};
