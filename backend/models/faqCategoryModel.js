import mongoose from 'mongoose';

const faqCategorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      default: 'FAQ category title',
    },
    description: {
      type: 'String',
      required: true,
      default: 'FAQ category ',
    },
    translations: {
      hu: {
        title: {
          type: String,
          default: 'GYIK kategória cím',
        },
        description: {
          type: String,
          default: 'GYIK kategória leírás',
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

faqCategorySchema.virtual('faqs', {
  ref: 'Faq',
  localField: '_id',
  foreignField: 'category',
});

const FaqCategory = mongoose.model('FaqCategory', faqCategorySchema);

export default FaqCategory;
