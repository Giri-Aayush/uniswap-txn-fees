const express = require('express');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

app.use(express.json());

app.use('/api/transactions', transactionRoutes);

module.exports = app;