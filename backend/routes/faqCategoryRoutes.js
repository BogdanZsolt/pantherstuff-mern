import express from 'express';
import {
  faqCategoryCreateInit,
  createFaqCategory,
  getFaqCategories,
  getFaqCategoryById,
  updateFaqCategory,
  deleteFaqCategory,
} from '../controllers/faqCategoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getFaqCategories)
  .post(protect, admin, faqCategoryCreateInit, createFaqCategory);
router
  .route('/:id')
  .get(getFaqCategoryById)
  .put(protect, admin, updateFaqCategory)
  .delete(protect, admin, deleteFaqCategory);

export default router;
