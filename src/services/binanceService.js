const axios = require('axios');
const Transaction = require('../models/transaction');
const logger = require('../utils/logger');

const binanceApiUrl = 'https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT';

const fetchEthUsdtPrice = async () => {
  try {
    const response = await axios.get(binanceApiUrl);
    const { price } = response.data;
    return parseFloat(price);
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const updateFeeInUsdt = async () => {
  const ethUsdtPrice = await fetchEthUsdtPrice();

  if (ethUsdtPrice === null) {
    logger.error('Failed to fetch ETH/USDT price');
    return;
  }

  const transactions = await Transaction.find({ feeInUsdt: null });

  for (const transaction of transactions) {
    const feeInUsdt = transaction.fee * ethUsdtPrice;
    await Transaction.updateOne({ _id: transaction._id }, { feeInUsdt });
  }

  logger.info(`Updated ${transactions.length} transactions with ETH/USDT price: ${ethUsdtPrice}`);
};

module.exports = {
  updateFeeInUsdt,
};