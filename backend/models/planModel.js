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
    limitation: [String],
    currentPrice: { type: Number, required: true, default: 0 },
    recommended: { type: Boolean, default: false },
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
