const express = require('express');
const GenericError = require('../middlewares/GenericError')
const userRoutes = require('../Routes/userRoutes');
const verifyToken = require('../middlewares/verifyToken');
require('express-async-errors');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', userRoutes)

 
module.exports = app;
