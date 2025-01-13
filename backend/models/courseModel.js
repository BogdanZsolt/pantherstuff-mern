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

const courseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      default: 'Simple course title',
    },
    images: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: 'Simple course description',
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
    duration: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseCategory',
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
    translations: {
      hu: {
        title: { type: String, default: 'Egyszerű tanfolyam cím' },
        description: { type: String, default: 'Egyszerű tanfolyam leírás' },
        currentPrice: { type: Number, default: 0 },
        beforePrice: { type: Number, default: 0 },
      },
    },
    curriculum: [
      {
        _id: false,
        lesson: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: 'curriculum.lessonType',
        },
        lessonType: {
          type: String,
          enum: ['Video', 'Textual'],
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// courseSchema.virtual('students', {
//   ref: 'User',
//   localField: '_id',
//   foreignField: 'courses.id',
// });

courseSchema.virtual('students', {
  ref: 'PurchasedCourse',
  localField: '_id',
  foreignField: 'course',
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
