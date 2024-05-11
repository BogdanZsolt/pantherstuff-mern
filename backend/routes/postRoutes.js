import express from 'express';
const router = express.Router();
import {
  createPost,
  postCreateInit,
  updatePost,
  deletePost,
  getPostById,
  getPosts,
  getLastPosts,
} from '../controllers/postController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getPosts)
  .post(protect, admin, postCreateInit, createPost);
router.route('/last').get(getLastPosts);
router
  .route('/:id')
  .put(protect, admin, updatePost)
  .delete(protect, admin, deletePost)
  .get(getPostById);

export default router;
