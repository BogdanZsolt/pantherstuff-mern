import mongoose from 'mongoose';
import slugify from 'slugify';

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: { type: String, required: true, unique: true, trim: true },
    caption: { type: String, required: true },
    slug: String,
    description: { type: String, required: true },
    body: { type: Object, required: true },
    bannerImage: { type: String, required: false },
    tags: { type: [String] },
    categories: { type: [mongoose.Schema.Types.ObjectId], ref: 'PostCategory' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, {
    lower: true,
  });
  next();
});

const Post = mongoose.model('Post', postSchema);

export default Post;
