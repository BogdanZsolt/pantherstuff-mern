import express from 'express';
import {
  planCreateInit,
  createPlan,
  getPlanById,
  getPlans,
  updatePlan,
  deletePlan,
} from '../controllers/planController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router
  .route('/')
  .post(protect, admin, planCreateInit, createPlan)
  .get(getPlans);
router
  .route('/:id')
  .get(getPlanById)
  .put(protect, admin, updatePlan)
  .delete(protect, admin, deletePlan);

export default router;
