const customerService = require('../services/customerService');

const createOrder = async (req, res) => {
  try {
    const newSale = await customerService.createOrder(req.body);
    // console.log(order);

    return res.status(201).json(newSale);
  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: 'Conflict customer' });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await customerService.getOrder(id);

    return res.status(201).json(order);
  } catch (error) {
    return res.status(404).json({ message: 'Not found' });
  }
};

const getOrderBySeller = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await customerService.getOrderBySeller(id);

    return res.status(201).json(sales);
  } catch (error) {
    return res.status(404).json({ message: 'Not found' });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await customerService.getOrderByUser(id);

    return res.status(201).json(sales);
  } catch (error) {
    return res.status(404).json({ message: 'Not found' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const sales = await customerService.getAllOrders();

    return res.status(201).json(sales);
  } catch (error) {
    return res.status(404).json({ message: 'Not found' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status);
    const update = await customerService.updateStatus(id, status);

    return res.status(201).json(update);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Conflict' });
  }
};

module.exports = {
  createOrder,
  getOrder,
  getOrderBySeller,
  getOrderByUser,
  updateStatus,
  getAllOrders,
};