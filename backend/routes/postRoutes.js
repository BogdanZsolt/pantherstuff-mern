import express from 'express';
const router = express.Router();
import {
  createPost,
  updatePost,
  deletePost,
  getPostBySlug,
  getPosts,
} from '../controllers/postController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getPosts).post(protect, admin, createPost);
router
  .route('/:slug')
  .put(protect, admin, updatePost)
  .delete(protect, admin, deletePost)
  .get(getPostBySlug);

export default router;
