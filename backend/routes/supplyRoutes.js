import express from 'express';
const router = express.Router();
import {
  supplyCreateInit,
  getSupplyStats,
  getSuppliesMinMaxPrice,
  getSupplies,
  getSupplyById,
  createSupply,
  updateSupply,
  deleteSupply,
  createSupplyReview,
  getTopSupplies,
} from '../controllers/supplyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getSupplies)
  .post(protect, admin, supplyCreateInit, createSupply);
router.route('/top').get(getTopSupplies);
router.route('/stats').get(getSupplyStats);
router.route('/minmax').get(getSuppliesMinMaxPrice);
router
  .route('/:id')
  .get(getSupplyById)
  .put(protect, admin, updateSupply)
  .delete(protect, admin, deleteSupply);
router.route('/:id/reviews').post(protect, createSupplyReview);

export default router;
