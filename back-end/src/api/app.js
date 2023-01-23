const express = require('express');
require('express-async-errors');

// const GenericError = require('../middlewares/GenericError')
const loginRouter = require('../Routes/loginRoute');
const productsRouter = require('../Routes/productsRouts');
const registerRoute = require('../Routes/registerRoute');
const customerRoute = require('../Routes/customerRoute');
// const verifyToken = require('../middlewares/verifyToken');

const app = express();
app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRoute);
app.use('/products', productsRouter);
app.use('/customer', customerRoute);

module.exports = app;
