const { Sale, SalesProduct, Product, User } = require('../database/models');

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


const getAllOrderDetails = async (id) => {
  const orderById = await Sale.findByPk(id);
  const order = await Sale.findAll({
    where: { id },
    include: [
      { model: Product, as: "products", through: { attributes: { exclude: 'ProductId'} } },
      { model: User, as: "sellers", attributes: ["id", "name"], foreignKey: "sellerId" }
      ],

})
  if(!order) return new Error('Not Found');

  const products = order[0].products = order[0].products.map(product => {
    return {
    id: product.id,
    name: product.name,
    price: product.price,
    urlImage: product.urlImage,
    saleId: product.SalesProduct.saleId,
    productId: product.SalesProduct.productId,
    quantity: product.SalesProduct.quantity,
    }
    });

    return { ...orderById.dataValues, products: products, seller: order[0].sellers };
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
  getAllOrderDetails,
  getOrderBySeller,
  getOrderByUser,
  updateStatus,
  getAllOrders,
};
