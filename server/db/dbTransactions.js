import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
  accountID: String,
  transactions: [
    {
      name: String,
      id: Number,
      price: Number,
      quantity: Number,
      overall: Number,
      date: String,
    },
  ],
});

export default mongoose.model('Transactions', transactionSchema);
