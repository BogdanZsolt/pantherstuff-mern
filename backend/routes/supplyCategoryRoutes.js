import express from 'express';
const router = express.Router();
import {
  createInit,
  getSupplyCategories,
  getSupplyCategoryById,
  createSupplyCategory,
  deleteSupplyCategory,
  updateSupplyCategory,
} from '../controllers/supplyCategoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getSupplyCategories)
  .post(protect, admin, createInit, createSupplyCategory);
router
  .route('/:id')
  .get(getSupplyCategoryById)
  .put(protect, admin, updateSupplyCategory)
  .delete(protect, admin, deleteSupplyCategory);

export default router;
