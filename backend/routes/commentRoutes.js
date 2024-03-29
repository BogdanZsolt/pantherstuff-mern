import express from 'express';
const router = express.Router();
import {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  setCommentUserId,
} from '../controllers/commentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(protect, admin, getComments)
  .post(protect, setCommentUserId, createComment);
router
  .route('/:id')
  .get(protect, admin, getCommentById)
  .put(protect, updateComment)
  .delete(protect, deleteComment);

export default router;
