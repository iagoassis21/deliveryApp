const express = require('express');
require('express-async-errors');
const cors = require('cors');

// const GenericError = require('../middlewares/GenericError')
const loginRouter = require('../Routes/loginRoute');
const sellerRouter = require('../Routes/sellerRoute');
const productsRouter = require('../Routes/productsRouts');
const registerRoute = require('../Routes/registerRoute');
const customerRoute = require('../Routes/customerRoute');
const admRoute = require('../Routes/admRoute');
// const verifyToken = require('../middlewares/verifyToken');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.use('/login', loginRouter);
app.use('/seller', sellerRouter);
app.use('/register', registerRoute);
app.use('/products', productsRouter);
app.use('/customer', customerRoute);
app.use('/admin', admRoute);

module.exports = app;
