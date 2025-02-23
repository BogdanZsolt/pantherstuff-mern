import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String },
    videoUrl: { type: String },
    duration: { type: Number },
    translations: {
      hu: {
        title: { type: String },
        videoUrl: { type: String },
      },
    },
    section: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Video = mongoose.model('Video', videoSchema);
export default Video;
