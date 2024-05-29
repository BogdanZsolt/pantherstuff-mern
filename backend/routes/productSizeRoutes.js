import express from 'express';
const router = express.Router();
import {
  createInit,
  getProductSizes,
  getProductSizeById,
  createProductSize,
  deleteProductSize,
  updateProductSize,
} from '../controllers/productSizeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getProductSizes)
  .post(protect, admin, createInit, createProductSize);
router
  .route('/:id')
  .get(getProductSizeById)
  .put(protect, admin, updateProductSize)
  .delete(protect, admin, deleteProductSize);

export default router;
