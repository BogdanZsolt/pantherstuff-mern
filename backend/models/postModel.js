import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    language: { type: String, required: true, default: 'hu' },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    bannerImage: { type: String, required: false },
    tags: { type: [String] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'PostCategory' },
    isPremium: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

postSchema.index({ createdAt: -1 });

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

const Post = mongoose.model('Post', postSchema);

export default Post;
