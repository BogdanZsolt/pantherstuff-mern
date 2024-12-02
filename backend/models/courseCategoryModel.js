import mongoose from 'mongoose';

const courseCategorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      default: 'Course category title',
    },
    description: {
      type: 'String',
      required: true,
      default: 'Course category',
    },
    translations: {
      hu: {
        title: {
          type: String,
          default: 'Kurzus kategória cím',
        },
        description: {
          type: String,
          default: 'Kurzus kategória leírás',
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

courseCategorySchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'category',
});

const CourseCategory = mongoose.model('CourseCategory', courseCategorySchema);

export default CourseCategory;
