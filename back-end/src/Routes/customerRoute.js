const express = require('express');
const customerController = require('../controllers/customerController');

const customerRoute = express.Router();

customerRoute.post('/', customerController.createOrder);
customerRoute.get('/:id', customerController.getOrder);
customerRoute.get('/seller/:id', customerController.getOrderBySeller);
customerRoute.get('/user/:id', customerController.getOrderByUser);
customerRoute.patch('/update/:id', customerController.updateStatus);

module.exports = customerRoute;
