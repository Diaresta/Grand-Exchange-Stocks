import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },

  email: {
    type: String,
    required: true,
    minLength: 12,
    maxLength: 40,
  },
  message: { type: String, minLength: 5, required: true },
  contactDate: { type: Date, required: true },
});

export default mongoose.model('Contact', contactSchema);
