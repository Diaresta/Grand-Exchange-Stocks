import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  signUpDate: Date,
  id: Number,
});

export default mongoose.model('Account', accountSchema);
