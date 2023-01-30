const express = require('express');
const sellerController = require('../controllers/sellerController');

const sellerRouter = express.Router();

sellerRouter.get('/', sellerController.getAllSellers);

module.exports = sellerRouter;