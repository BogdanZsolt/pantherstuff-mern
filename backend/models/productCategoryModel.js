import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema(
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
      ref: 'ProductCategory',
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productCategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
});

productCategorySchema.virtual('children', {
  ref: 'ProductCategory',
  localField: '_id',
  foreignField: 'parent',
});

const ProductCategory = mongoose.model(
  'ProductCategory',
  productCategorySchema
);

export default ProductCategory;
