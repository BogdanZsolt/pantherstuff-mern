import mongoose from 'mongoose';

const supplyCategorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String, required: true },
    description: { type: String },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SupplyCategory',
      default: null,
    },
    translations: {
      hu: {
        title: { type: String },
        description: { type: String },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

supplyCategorySchema.virtual('supplies', {
  ref: 'Supply',
  localField: '_id',
  foreignField: 'category',
});

supplyCategorySchema.virtual('children', {
  ref: 'SupplyCategory',
  localField: '_id',
  foreignField: 'parent',
});

const SupplyCategory = mongoose.model('SupplyCategory', supplyCategorySchema);

export default SupplyCategory;
