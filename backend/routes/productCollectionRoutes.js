import express from 'express';
const router = express.Router();
import {
  createInit,
  getProductCollections,
  getProductCollectionById,
  createProductCollection,
  deleteProductCollection,
  updateProductCollection,
} from '../controllers/productCollectionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getProductCollections)
  .post(protect, admin, createInit, createProductCollection);
router
  .route('/:id')
  .get(getProductCollectionById)
  .put(protect, admin, updateProductCollection)
  .delete(protect, admin, deleteProductCollection);

export default router;
