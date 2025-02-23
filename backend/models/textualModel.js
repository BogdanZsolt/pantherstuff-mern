import mongoose from 'mongoose';

const options = { discriminatorKey: 'lessonType' };

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
    section: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
  },
  options,
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Textual = mongoose.model('Textual', textualSchema);
export default Textual;
