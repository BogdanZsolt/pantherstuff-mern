import express from 'express';
const router = express.Router();
import {
  getSubscribers,
  getSubscriber,
  getCountSubscribers,
  createSubscriber,
  checkemail,
} from '../controllers/subscriberController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(protect, admin, getSubscribers)
  .post(protect, admin, createSubscriber);
router.route('/:email').get(protect, admin, getSubscriber);
router.route('/count').get(protect, admin, getCountSubscribers);
router.route('/check').post(protect, admin, checkemail);

export default router;
