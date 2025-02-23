import mongoose from 'mongoose';

const courseProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    completionAt: { type: Date, default: null },
    lessonProgress: [
      {
        _id: false,
        lesson: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Lesson',
        },
        viwed: { type: Boolean, required: true, default: false },
        viwedAt: { type: Date, default: null },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);

export default CourseProgress;
