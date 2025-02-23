import mongoose from 'mongoose';

const lessonModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String },
    translations: {
      hu: {
        title: { type: String },
      },
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
    },
  },
  {
    discriminatorKey: 'lessonType',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Lesson = mongoose.model('Lesson', lessonModel);

const Video = Lesson.discriminator(
  'Video',
  new mongoose.Schema({
    videoUrl: { type: String },
    duration: { type: Number, required: true, default: 0 },
    translations: {
      hu: {
        videoUrl: { type: String },
      },
    },
  })
);

const Textual = Lesson.discriminator(
  'Textual',
  new mongoose.Schema({
    text: { type: String },
    translations: {
      hu: {
        text: { type: String },
      },
    },
  })
);

const Section = Lesson.discriminator(
  'Section',
  new mongoose.Schema({
    duration: {
      type: Number,
      required: true,
      default: 0,
    },
    lessons: [
      {
        _id: false,
        lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
      },
    ],
  })
);

export { Lesson, Video, Textual, Section };
