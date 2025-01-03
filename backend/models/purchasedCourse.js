import mongoose from 'mongoose';

const purchasedCourseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    purchasedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const PurchasedCourse = mongoose.model(
  'PurchasedCourse',
  purchasedCourseSchema
);

export default PurchasedCourse;
