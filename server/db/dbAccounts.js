import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 20,
  },
  password: { type: String, required: true, minLength: 6 },
  firstName: { type: String, required: true, maxLength: 50 },
  lastName: { type: String, required: true, maxLength: 75 },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 12,
    maxLength: 40,
  },
  recoveryQuestion: {
    type: String,
    required: true,
    maxLength: 300,
  },
  recoveryAnswer: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  signUpDate: { type: Date, required: true },
});

export default mongoose.model('Account', accountSchema);
