const express = require('express');
const productsController = require('../controllers/productsController');
const verifyToken = require('../middlewares/verifyToken');

const productsRouter = express.Router();

productsRouter.get('/', verifyToken, productsController.getAllProducts);

module.exports = productsRouter;