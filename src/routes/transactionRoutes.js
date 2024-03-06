const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.get('/:hash', transactionController.getTransactionFee);

module.exports = router;