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

module.exports = {
  createOrder,
  getOrder,
};