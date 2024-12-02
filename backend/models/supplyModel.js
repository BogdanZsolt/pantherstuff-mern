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

const supplySchema = new mongoose.Schema(
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
      ref: 'SupplyCategory',
    },
    toBeDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
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
    sizes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SupplySize',
      },
    ],
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

const Supply = mongoose.model('Supply', supplySchema);

export default Supply;
