import express from 'express';
import {
  getContactMessages,
  getContactMessageById,
  createContactMessage,
  updateContactMessage,
  deleteContactMessage,
} from '../controllers/contactMessageController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router
  .route('/')
  .get(protect, admin, getContactMessages)
  .post(createContactMessage);
router
  .route('/:id')
  .get(protect, admin, getContactMessageById)
  .put(protect, admin, updateContactMessage)
  .delete(protect, admin, deleteContactMessage);

export default router;
