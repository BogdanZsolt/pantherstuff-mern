import express from 'express';
const router = express.Router();
import {
  getCourses,
  getCourseById,
  createCourse,
  courseCreateInit,
  updateCourse,
  deleteCourse,
  createCoursesReview,
  getTopCourses,
  getCourseStats,
  getCoursesMinMaxPrice,
} from '../controllers/courseController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getCourses)
  .post(protect, admin, courseCreateInit, createCourse);
router.route('/top').get(getTopCourses);
router.route('/stats').get(getCourseStats);
router.route('/minmax').get(getCoursesMinMaxPrice);
router
  .route('/:id')
  .get(protect, getCourseById)
  .put(protect, admin, updateCourse)
  .delete(protect, admin, deleteCourse);
router.route('/:id/reviews').post(protect, createCoursesReview);

export default router;
