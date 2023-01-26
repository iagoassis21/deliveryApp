const express = require('express');
const admController = require('../controllers/admController');

// const verifyToken = require('../middlewares/verifyToken');

const admRoute = express.Router();

admRoute.post('/manager', admController.createUsers);

admRoute.delete('/manager/:id', admController.deleteUsers);

module.exports = admRoute;