const axios = require('axios');
const { ethers } = require('ethers');
const Transaction = require('../models/transaction');
const logger = require('../utils/logger');

const contractAddress = '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640';
const apiKey = process.env.ETHERSCAN_API_KEY;
const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/' + process.env.INFURA_PROJECT_ID);

const fetchTransactions = async () => {
  try {
    const response = await axios.get(apiUrl);
    const transactions = response.data.result;

    // Process transactions
    for (const txn of transactions) {
      const tx = await provider.getTransaction(txn.hash);
      const fee = ethers.utils.formatEther(tx.gasPrice.mul(tx.gasUsed));
      const timestamp = new Date(parseInt(tx.timeStamp, 16) * 1000);

      // Save transaction to database
      await Transaction.create({
        hash: txn.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value.toString(),
        gasPrice: tx.gasPrice.toString(),
        gasUsed: tx.gasUsed.toString(),
        fee: parseFloat(fee),
        feeInUsdt: null, // Will be updated later
        timestamp,
      });

      logger.info(`Transaction Hash: ${txn.hash}, Fee: ${fee} ETH`);
    }
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  fetchTransactions,
};