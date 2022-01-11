import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  signUpDate: { type: Date, required: true },
});

export default mongoose.model('Account', accountSchema);
