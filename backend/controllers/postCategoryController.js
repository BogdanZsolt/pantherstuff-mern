import PostCategory from '../models/postCategoryModel.js';
import {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
} from './handlerFactory.js';

const postCategoriesPopOption = [{ path: 'parent', select: ['title'] }];
const postCategoryPopOption = [
  { path: 'children', select: '_id title description -parent' },
  {
    path: 'posts',
    select: '-body -__v',
    populate: [
      { path: 'user', select: 'name' },
      { path: 'category', select: 'title' },
    ],
  },
];

const createInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.title = 'Simple category';
  req.body.description = 'Simple description';
  next();
};

// @desc    Get postCategories
// @route   GET /api/postcategories
// @access  Public
const getPostCategories = getAll(PostCategory, postCategoriesPopOption);

// @desc    Get a postCategory by ID
// @route   GET /api/postcategories/:id
// @access  Public
const getPostCategoryById = getOne(PostCategory, postCategoryPopOption);

// @desc    Create postCategory
// @route   POST /api/postcategories
// @access  Private/Admin
const createPostCategory = createOne(PostCategory);

// @desc    delete postCategory by ID
// @route   DELETE /api/postcategories/:id
// @access  Private/Admin
const deletePostCategory = deleteOne(PostCategory);

// @desc    Update postCategory
// @route   PUT /api/postcategories/:id
// @access  Private/Admin
const updatePostCategory = updateOne(PostCategory);

export {
  createInit,
  getPostCategories,
  getPostCategoryById,
  createPostCategory,
  deletePostCategory,
  updatePostCategory,
};
