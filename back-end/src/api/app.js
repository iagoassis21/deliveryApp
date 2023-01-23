const express = require('express');
require('express-async-errors');
// const GenericError = require('../middlewares/GenericError')
const loginRouter = require('../Routes/loginRoute');
const productsRouter = require('../Routes/productsRouts');
const registerRoute = require('../Routes/registerRoute');
// const verifyToken = require('../middlewares/verifyToken');

const app = express();
app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRoute);
app.use('/products', productsRouter);

module.exports = app;
