import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
  name: String,
  id: Number,
  price: Number,
  quantity: Number,
  overall: Number,
  date: Date,
});

export default mongoose.model('Transactions', transactionSchema);
