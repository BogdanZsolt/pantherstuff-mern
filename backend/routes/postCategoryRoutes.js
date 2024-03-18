import express from 'express';
const router = express.Router();
import {
  createInit,
  getPostCategories,
  getPostCategoryById,
  createPostCategory,
  deletePostCategory,
  updatePostCategory,
} from '../controllers/postCategoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getPostCategories)
  .post(protect, admin, createInit, createPostCategory);
router
  .route('/:id')
  .get(getPostCategoryById)
  .put(protect, admin, updatePostCategory)
  .delete(protect, admin, deletePostCategory);

export default router;
