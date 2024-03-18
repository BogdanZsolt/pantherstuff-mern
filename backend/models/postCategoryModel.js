import mongoose from 'mongoose';

const postCategorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String, required: true },
    description: { type: String },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PostCategory',
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postCategorySchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'category',
});

postCategorySchema.virtual('children', {
  ref: 'PostCategory',
  localField: '_id',
  foreignField: 'parent',
});

const PostCategory = mongoose.model('PostCategory', postCategorySchema);

export default PostCategory;
