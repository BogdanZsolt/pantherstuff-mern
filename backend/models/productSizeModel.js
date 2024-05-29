import mongoose from 'mongoose';

const productSizeSchema = new mongoose.Schema({
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
  info: { type: String },
});

productSizeSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'sizes',
});

const ProductSize = mongoose.model('ProductSize', productSizeSchema);

export default ProductSize;
