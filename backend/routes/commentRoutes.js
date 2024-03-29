import express from 'express';
const router = express.Router();
import {
  createComment,
  updateComment,
  deleteComment,
  setCommentUserId,
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, setCommentUserId, createComment);
router.route('/:id').put(protect, updateComment).delete(protect, deleteComment);

export default router;
