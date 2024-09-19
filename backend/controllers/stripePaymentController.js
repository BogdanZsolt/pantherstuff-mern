import stripe from 'stripe';
import asyncHandler from '../middleware/asyncHandler';

const stripePayment = asyncHandler(async (req, res) => {
  // get the order ID
  const orderId = req.params.id;
  // Check for the valid id of the order
  // find the order
  // get the user
  // Create payment intent/making the payment
  // Send the respons
});
