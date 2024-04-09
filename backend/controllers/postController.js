import asyncHandler from '../middleware/asyncHandler.js';
import Post from '../models/postModel.js';
import { createOne, getAll, getOne, updateOne } from './handlerFactory.js';
import Comment from '../models/commentModel.js';

const postsPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: ['title'] },
];
const postPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: 'title' },
  {
    path: 'comments',
    match: { check: true, parent: null },
    populate: [
      { path: 'user', select: ['name'] },
      {
        path: 'replies',
        match: { check: true },
        populate: [{ path: 'user', select: ['name'] }],
      },
    ],
  },
];

const createInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.title = 'Simple title';
  req.body.description = 'Simple description';
  req.body.body = '<p>Simple Post</p>';
  // req.body.body = {
  //   type: 'doc',
  //   content: [
  //     {
  //       type: 'paragraph',
  //       content: [
  //         {
  //           type: 'text',
  //           text: 'Wow, this editor instance exports its content as JSON.',
  //         },
  //       ],
  //     },
  //   ],
  // };
  req.body.tags = ['simple'];
  req.body.bannerImage = '/images/sample.jpg';
  next();
};

// @desc    Get posts
// @route   GET /api/posts
// @access  Public
const getPosts = getAll(Post, postsPopOption);

// @desc    Get a post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = getOne(Post, postPopOption);

// @desc    Create post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = createOne(Post);

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = updateOne(Post);

// @desc    Delete post
// @route   DELETE /api/posts/:slug
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete({ _id: req.params.id });

  if (!post) {
    res.status(404);
    throw new Error('Resource not found');
  } else {
    await Comment.deleteMany({ post: post._id });
    res.status(200).json({ message: 'Post deleted' });
  }
});

// @desc    Get last 3 posts
// @route   GET /api/posts/last
// @access  Public
const getLastPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .populate([
      {
        path: 'user',
        select: ['name'],
      },
    ]);

  res.json({ posts });
});

export {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPosts,
  getLastPosts,
  createInit,
};
