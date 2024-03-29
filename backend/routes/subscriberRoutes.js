import express from 'express';
const router = express.Router();
import {
  getSubscribers,
  getCountSubscribers,
  createSubscriber,
  checkemail,
} from '../controllers/subscriberController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getSubscribers).post(createSubscriber);
router.route('/count').get(getCountSubscribers);
router.route('/check').post(checkemail);

export default router;
