const express = require('express');
require('express-async-errors');
// const GenericError = require('../middlewares/GenericError')
const loginRouter = require('../Routes/loginRoute');
// const verifyToken = require('../middlewares/verifyToken');

const app = express();
app.use(express.json());

app.use('/login', loginRouter);

module.exports = app;
