import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  stripePayment,
  stripeVerify,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';
import {
  protect,
  admin,
  isAccountVerified,
} from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, isAccountVerified, addOrderItems)
  .get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/stripe').post(protect, stripePayment);
router.route('/:paymentId/verify').get(protect, stripeVerify);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
