import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    fileName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Upload = mongoose.model('Upload', uploadSchema);

export default Upload;
