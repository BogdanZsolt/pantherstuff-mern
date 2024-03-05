import asyncHandler from '../middleware/asyncHandler.js';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';

// @desc    Create comment
// @route   POST /api/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  const { description, slug, parent, replyOnUser } = req.body;
  const post = await Post.findOne({ slug });

  if (!post) {
    res.status(404);
    throw new Error('Resource not found.');
  }

  const newComment = new Comment({
    user: req.user._id,
    description,
    post: post._id,
    parent,
    replyOnUser,
  });

  const savedComment = await newComment.save();
  res.status(201).json(savedComment);
});

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user._id;
  const { description } = req.body;
  const comment = await Comment.findById(commentId);

  if (comment && comment.user.equals(userId)) {
    comment.description = description || comment.description;
    comment.check = comment.check;
    comment.parent = comment.parent;
    comment.replyOnUser = comment.replyOnUser;
    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    delete comment
// @route   PUT /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user._id;
  const comment = await Comment.findById(commentId);

  console.log(userId);
  console.log(comment.user);

  if (comment && comment.user.equals(userId)) {
    await Comment.deleteOne({ _id: comment._id });
    res.status(200).json({ message: 'Comment deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export { createComment, updateComment, deleteComment };
