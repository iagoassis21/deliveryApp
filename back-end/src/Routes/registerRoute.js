const express = require('express');
const registerController = require('../controllers/registerController');

const registerRoute = express.Router();

registerRoute.post('/', registerController.createUser);

module.exports = registerRoute;