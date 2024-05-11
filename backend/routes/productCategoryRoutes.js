import express from 'express';
const router = express.Router();
import {
  createInit,
  getProductCategories,
  getProductCategoryById,
  createProductCategory,
  deleteProductCategory,
  updateProductCategory,
} from '../controllers/productCategoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getProductCategories)
  .post(protect, admin, createInit, createProductCategory);
router
  .route('/:id')
  .get(getProductCategoryById)
  .put(protect, admin, updateProductCategory)
  .delete(protect, admin, deleteProductCategory);

export default router;
