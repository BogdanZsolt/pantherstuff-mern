import mongoose from 'mongoose';

const planSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    features: [String],
    limitation: [String],
    price: { type: Number, required: true, default: 0 },
    recommended: { type: Boolean, default: false },
    translations: {
      hu: {
        name: String,
        features: [String],
        price: Number,
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
