import mongoose from 'mongoose';

const planSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    thumbnail: {
      type: String,
      required: true,
      default: '/images/member.png',
    },
    features: [String],
    timeLimitMeasure: { type: String },
    timeLimitQty: { type: Number, default: 0 },
    currentPrice: { type: Number, required: true, default: 0 },
    recommended: { type: Boolean, default: false },
    toBeDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    translations: {
      hu: {
        name: String,
        features: [String],
        currentPrice: Number,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Plan = mongoose.model('Plan', planSchema);

export default Plan;
