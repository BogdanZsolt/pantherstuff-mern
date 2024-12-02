import express from 'express';
import {
  eventCategoryCreateInit,
  createEventCategory,
  getEventCategories,
  getEventCategoryById,
  updateEventCategory,
  deleteEventCategory,
} from '../controllers/eventCategoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getEventCategories)
  .post(protect, admin, eventCategoryCreateInit, createEventCategory);
router
  .route('/:id')
  .get(getEventCategoryById)
  .put(protect, admin, updateEventCategory)
  .delete(protect, admin, deleteEventCategory);

export default router;
