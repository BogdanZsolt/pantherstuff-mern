import mongoose from 'mongoose';
import Booking from './bookingModel.js';

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
        fullPrice: { type: Number, required: false },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: 'model_type',
        },
        model_type: {
          type: String,
          enum: ['Product', 'Supply', 'Plan', 'Event', 'Course'],
        },
        isToBeDelivered: { type: Boolean, required: true, default: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    billingAddress: {
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

orderSchema.methods.createBooking = async function () {
  const events = this.orderItems.filter((item) => item.model_type === 'Event');
  if (!events) {
    return;
  }
  let createdBookings = [];
  events.map(async (event) => {
    const createBookingObj = new Booking({
      user: this.user._id,
      event: event.product,
      price: event.currentPrice,
      paid: true,
    });
    const created = await createBookingObj.save();
    createdBookings.push(created);
  });
  return createdBookings;
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
