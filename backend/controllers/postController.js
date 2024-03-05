import asyncHandler from '../middleware/asyncHandler.js';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';

// @desc    Create post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    user: req.user._id,
    title: 'Simple title',
    caption: 'Simple caption',
    description: 'Simple description',
    body: {
      type: 'doc',
      content: [],
    },
    bannerImage: '/images/sample.jpg',
  });
  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Create post
// @route   POST /api/posts
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });

  const { title, caption, description, body, bannerImage, tags, categories } =
    req.body;

  if (post) {
    post.title = title || post.title;
    post.caption = caption || post.caption;
    post.description = description || post.description;
    post.body = body || post.body;
    post.bannerImage = bannerImage || post.bannerImage;
    post.tags = tags || post.tags;
    post.categories = categories || post.categories;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Delete post
// @route   DELETE /api/posts/:slug
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndDelete({ slug: req.params.slug });

  if (!post) {
    res.status(404);
    throw new Error('Resource not found');
  } else {
    await Comment.deleteMany({ post: post._id });
    res.status(200).json({ message: 'Post deleted' });
  }
});

// @desc    Get a post
// @route   GET /api/post/:slug
// @access  Public
const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate([
    {
      path: 'user',
      select: ['name'],
    },
    {
      path: 'comments',
      match: {
        check: true,
        parent: null,
      },
      populate: [
        {
          path: 'user',
          select: ['name'],
        },
        {
          path: 'replies',
          match: {
            check: true,
          },
          populate: [
            {
              path: 'user',
              select: ['name'],
            },
          ],
        },
      ],
    },
  ]);

  if (post) {
    return res.json(post);
  } else {
    res.status(404);
    throw new Error('resource not found');
  }
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate([
    {
      path: 'user',
      select: ['name'],
    },
  ]);

  res.json({ posts });
});

export { createPost, updatePost, deletePost, getPostBySlug, getPosts };
