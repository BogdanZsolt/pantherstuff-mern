import express from 'express';
const router = express.Router();
import {
  getGroups,
  getGroupSubscribers,
} from '../controllers/subscriberController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getGroups);
router.route('/:id/subscribers').get(getGroupSubscribers);

export default router;
