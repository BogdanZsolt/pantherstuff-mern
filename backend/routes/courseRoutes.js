import express from 'express';
const router = express.Router();
import {
  getCourses,
  getCourseById,
  createCourse,
  courseCreateInit,
  updateCourse,
  deleteCourse,
  copyCourse,
  createCoursesReview,
  getTopCourses,
  getCourseStats,
  getCoursesMinMaxPrice,
  addNewLesson,
  removeLesson,
  updateLesson,
  getCurrentUserCourseProgress,
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
  .delete(protect, admin, deleteCourse)
  .post(protect, admin, copyCourse);
router.route('/:id/reviews').post(protect, createCoursesReview);
router.route('/:id/lesson').post(protect, admin, addNewLesson);
router.route('/:id/delete').put(protect, admin, removeLesson);
router.route('/:id/update').put(protect, admin, updateLesson);
router.route('/:id/getprogress').get(protect, getCurrentUserCourseProgress);

export default router;
