import mongoose from 'mongoose';

const textualSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String },
    text: { type: String },
    translations: {
      hu: {
        title: { type: String },
        text: { type: String },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Textual = mongoose.model('Textual', textualSchema);
export default Textual;
