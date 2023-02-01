const customerService = require('../services/customerService');

const createOrder = async (req, res) => {
  try {
    const newSale = await customerService.createOrder(req.body);

    return res.status(201).json(newSale);
  } catch (error) {
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

const getAllOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await customerService.getAllOrderDetails(id);

    return res.status(200).json(order);
  } catch (error) {
    return res.status(404).json({ message: 'Not found' });
  }
};

const getOrderBySeller = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await customerService.getOrderBySeller(id);

    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Not found' });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await customerService.getOrderByUser(id);

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(404).json({ message: 'Not found' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const sales = await customerService.getAllOrders();

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(404).json({ message: 'Not found' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const update = await customerService.updateStatus(id, status);

    return res.status(201).json(update);
  } catch (error) {
    return res.status(404).json({ message: 'Conflict' });
  }
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