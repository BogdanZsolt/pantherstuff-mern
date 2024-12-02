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

const eventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      default: 'Simple event title',
    },
    images: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      defaul: 'Simple event description',
    },
    currentPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    beforePrice: {
      type: Number,
      default: 0,
    },
    advance: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EventCategory',
      default: null,
    },
    maxGroupsize: {
      type: Number,
      required: true,
      default: 0,
    },
    startDate: Date,
    duration: {
      type: Number,
      required: true,
    },
    durationUnit: {
      type: String,
      required: true,
      default: 'day',
      enum: ['minute', 'hour', 'day', 'week'],
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    translations: {
      hu: {
        title: { type: String, default: 'Egyszerű tanfolyam cím' },
        description: { type: String, default: 'Egyszerű tanfolyam leírás' },
        currentPrice: { type: Number, default: 0 },
        beforePrice: { type: Number, default: 0 },
        advance: { type: Number, default: 0 },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
