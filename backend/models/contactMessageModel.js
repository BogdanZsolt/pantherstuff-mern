import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    telephone: { type: String, required: false, default: null },
    message: { type: String, required: true },
    read: { type: Boolean, required: false, default: false },
    readerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    readAt: { type: Date, required: false, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ContactMessage = mongoose.model('contactMessage', contactMessageSchema);

export default ContactMessage;
