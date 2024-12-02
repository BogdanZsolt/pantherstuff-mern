import express from 'express';
import {
  courseCategoryCreateInit,
  createCourseCategory,
  getCourseCategories,
  getCourseCategoryById,
  updateCourseCategory,
  deleteCourseCategory,
} from '../controllers/courseCategoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getCourseCategories)
  .post(protect, admin, courseCategoryCreateInit, createCourseCategory);
router
  .route('/:id')
  .get(getCourseCategoryById)
  .put(protect, admin, updateCourseCategory)
  .delete(protect, admin, deleteCourseCategory);

export default router;
