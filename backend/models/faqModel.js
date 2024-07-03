import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    question: {
      type: String,
      required: true,
      default: 'Question',
    },
    answer: {
      type: String,
      required: true,
      default: '<p>Answer</p>',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FaqCategory',
      default: null,
    },
    translations: {
      hu: {
        question: {
          type: String,
          default: 'Kérdés',
        },
        answer: {
          type: String,
          default: '<p>Válasz</p>',
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Faq = mongoose.model('Faq', faqSchema);

export default Faq;
