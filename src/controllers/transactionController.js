const Transaction = require('../models/transaction');

const getTransactionFee = async (req, res) => {
  const { hash } = req.params;

  try {
    const transaction = await Transaction.findOne({ hash });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    return res.json({ fee: transaction.fee, feeInUsdt: transaction.feeInUsdt });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getTransactionFee,
};