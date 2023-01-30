const express = require('express');
const admController = require('../controllers/admController');
const verifyToken = require('../middlewares/verifyToken');

const admRoute = express.Router();

admRoute.post('/manager', verifyToken, admController.createUsers);

admRoute.delete('/manager/:id', verifyToken, admController.deleteUsers);

admRoute.get('/',verifyToken ,admController.getAllUsers);

module.exports = admRoute;