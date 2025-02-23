import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String, required: true, default: 'Simple section title' },
    duration: { type: Number, required: true, default: 0 },
    translations: {
      hu: {
        title: { type: String },
      },
    },
    lessons: [
      {
        _id: false,
        lessonType: {
          type: String,
          required: true,
          enum: ['Video', 'Textual', 'Section'],
        },
        lesson: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: 'curriculum.lessonType',
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

const Section = mongoose.model('Section', sectionSchema);
export default Section;
