import express from 'express';
const router = express.Router();
import {
  createPost,
  createInit,
  updatePost,
  deletePost,
  getPostById,
  getPosts,
  getLastPosts,
} from '../controllers/postController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getPosts).post(protect, admin, createInit, createPost);
router.route('/last').get(getLastPosts);
router
  .route('/:id')
  .put(protect, admin, updatePost)
  .delete(protect, admin, deletePost)
  .get(getPostById);

export default router;
