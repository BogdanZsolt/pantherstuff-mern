import { createOne, deleteOne, updateOne } from './handlerFactory.js';
import Comment from '../models/commentModel.js';

const setCommentUserId = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.check = true;
  next();
};

// @desc    Create comment
// @route   POST /api/comments
// @access  Private
const createComment = createOne(Comment);

// @desc    delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = deleteOne(Comment);

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = updateOne(Comment);

export { setCommentUserId, createComment, updateComment, deleteComment };
