import express from 'express';
const router = express.Router();
import {
  getBookings,
  getBookingById,
  getMyBookings,
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(protect, admin, getBookings);
router.route('/mine').get(protect, getMyBookings);
router.route('/:id').get(getBookingById);

export default router;
