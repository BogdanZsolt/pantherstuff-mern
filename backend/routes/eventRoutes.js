import express from 'express';
const router = express.Router();
import {
  getEvents,
  getEventsMinMaxPrice,
  getEventById,
  createEvent,
  eventCreateInit,
  updateEvent,
  copyEvent,
  deleteEvent,
  createEventsReview,
  getTopEvents,
  getEventStats,
} from '../controllers/eventController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getEvents)
  .post(protect, admin, eventCreateInit, createEvent);
router.route('/top').get(getTopEvents);
router.route('/stats').get(getEventStats);
router.route('/minmax').get(getEventsMinMaxPrice);
router
  .route('/:id')
  .get(getEventById)
  .put(protect, admin, updateEvent)
  .post(protect, admin, copyEvent)
  .delete(protect, admin, deleteEvent);
router.route('/:id/reviews').post(protect, createEventsReview);

export default router;
