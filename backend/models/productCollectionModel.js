import mongoose from 'mongoose';

const productCollectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
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

productCollectionSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'collections',
});

const ProductCollection = mongoose.model(
  'ProductCollection',
  productCollectionSchema
);

export default ProductCollection;
