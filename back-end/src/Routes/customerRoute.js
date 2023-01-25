const express = require('express');
const customerController = require('../controllers/customerController');
const verifyToken = require('../middlewares/verifyToken');

const customerRoute = express.Router();

customerRoute.post('/', verifyToken, customerController.createOrder);
customerRoute.get('/:id', verifyToken, customerController.getOrder);
customerRoute.get('/seller/:id', verifyToken, customerController.getOrderBySeller);
customerRoute.get('/user/:id', verifyToken, customerController.getOrderByUser);
customerRoute.get('/', verifyToken, customerController.getAllOrders);
customerRoute.patch('/update/:id', verifyToken, customerController.updateStatus);

module.exports = customerRoute;
