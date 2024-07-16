import express from 'express';
const router = express.Router();
import {
  createInit,
  getSupplySizes,
  getSupplySizeById,
  createSupplySize,
  deleteSupplySize,
  updateSupplySize,
} from '../controllers/supplySizeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getSupplySizes)
  .post(protect, admin, createInit, createSupplySize);
router
  .route('/:id')
  .get(getSupplySizeById)
  .put(protect, admin, updateSupplySize)
  .delete(protect, admin, deleteSupplySize);

export default router;
