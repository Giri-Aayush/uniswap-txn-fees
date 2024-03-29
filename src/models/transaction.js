const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  hash: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  value: { type: String, required: true },
  gasPrice: { type: String, required: true },
  gasUsed: { type: String, required: true },
  fee: { type: Number, required: true },
  feeInUsdt: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;