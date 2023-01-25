const express = require('express');

const verifyToken = require('../middlewares/verifyToken');

const admRoute = express.Router();

admRoute.post('/manage', admController.createUsers);

admRoute.delete('/manage', admController.deleteUsers);

module.exports = admRoute;