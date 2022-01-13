import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 20,
  },
  password: { type: String, required: true, minLength: 5 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 12,
    maxLength: 40,
  },
  signUpDate: { type: Date, required: true },
});

export default mongoose.model('Account', accountSchema);
