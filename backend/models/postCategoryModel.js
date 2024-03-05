import mongoose from 'mongoose';
import PostCategory from './postCategoryModel';

const postCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const PostCategory = mongoose.model('PostCategory', postCategorySchema);

export default PostCategory;
