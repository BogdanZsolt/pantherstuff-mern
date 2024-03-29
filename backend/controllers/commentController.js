import { getAll, getOne, createOne, updateOne } from './handlerFactory.js';
import Comment from '../models/commentModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const setCommentUserId = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.check = true;
  next();
};

const commentsPopOption = [
  { path: 'user', select: 'name' },
  { path: 'post', select: 'title user' },
];

const commentPopOption = [
  { path: 'user', select: 'name' },
  { path: 'post', select: 'title user' },
  {
    path: 'replies',
    select: ['-__v'],
    populate: [
      { path: 'replies' },
      { path: 'user', select: 'name' },
      { path: 'post', select: 'title' },
      { path: 'replyOnUser', select: 'name' },
    ],
  },
];

// @desc    Get all comments
// @route   GET /api/comments
// @access  Private/Admin
const getComments = getAll(Comment, commentsPopOption);

// @desc    Get a comment
// @route   GET /api/comments/:id
// @access  Private/Admin
const getCommentById = getOne(Comment, commentPopOption);

// @desc    Create comment
// @route   POST /api/comments
// @access  Private
const createComment = createOne(Comment);

// @desc    delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const doc = await Comment.findById(req.params.id);

  if (doc) {
    if (
      (req.user && req.user.isAdmin) ||
      JSON.stringify(doc.user) === JSON.stringify(req.user._id)
    ) {
      await Comment.deleteOne({ _id: doc._id });
      res.status(200).json({ message: 'Resource deleted' });
    } else {
      res.status(401);
      throw new Error('Invalid user');
    }
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});
// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = updateOne(Comment);

export {
  getComments,
  getCommentById,
  setCommentUserId,
  createComment,
  updateComment,
  deleteComment,
};
