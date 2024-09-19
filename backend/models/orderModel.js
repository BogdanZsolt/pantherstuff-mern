import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    language: { type: String, required: true, default: 'en' },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        currentPrice: { type: Number, required: true },
        size: { type: String, required: false },
        color: { type: String, required: false },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: 'model_type',
        },
        model_type: { type: String, enum: ['Product', 'Supply', 'Plan'] },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      payingUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String },
      amount: { type: Number, default: 0.0 },
      currency: { type: String },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
