import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
    },
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCollection',
      },
    ],
    beforePrice: Number,
    currentPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      reuired: true,
      default: 0,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    colors: {
      type: [String],
      required: true,
      default: [],
    },
    sizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSize',
      },
    ],
    toBeDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    translations: {
      hu: {
        name: { type: String },
        description: { type: String },
        beforePrice: { type: Number },
        currentPrice: { type: Number },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
