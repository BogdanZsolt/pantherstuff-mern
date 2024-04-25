import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  uploadSingleImage,
  uploadImage,
  getImages,
  deleteImage,
} from '../controllers/uploadController.js';

const router = express.Router();

router.post('/', protect, uploadSingleImage, uploadImage);
router.get('/', protect, getImages);
router.delete('/:id', protect, deleteImage);

export default router;
