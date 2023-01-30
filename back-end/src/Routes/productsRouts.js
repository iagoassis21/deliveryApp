const express = require('express');
const productsController = require('../controllers/productsController');
const verifyToken = require('../middlewares/verifyToken');

const productsRouter = express.Router();

productsRouter.get('/:id', verifyToken, productsController.getProductsById);
productsRouter.get('/', verifyToken, productsController.getAllProducts);

module.exports = productsRouter;