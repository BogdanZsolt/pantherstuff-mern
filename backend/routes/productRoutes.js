import express from 'express';
const router = express.Router();
import {
  productCreateInit,
  getProductStats,
  getProductsMinMaxPrice,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getProducts)
  .post(protect, admin, productCreateInit, createProduct);
router.route('/top').get(getTopProducts);
router.route('/stats').get(getProductStats);
router.route('/minmax').get(getProductsMinMaxPrice);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
