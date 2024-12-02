import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Plan from '../models/planModel.js';
import Product from '../models/productModel.js';
import Supply from '../models/supplyModel.js';
import User from '../models/userModel.js';
import { getAll } from './handlerFactory.js';
import { calcPrices } from '../utils/calcPrices.js';
import Stripe from 'stripe';
import { addTimeToDate } from '../utils/dateTools.js';
import {
  assignSubscriberGroup,
  getSubscriber,
  createSubscriber,
} from '../utils/mailerTools.js';

const productsPopOption = [{ path: 'user', select: ['id name'] }];

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    language,
    orderItems,
    shippingAddress,
    billingAddress,
    paymentMethod,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // get the ordered items from our database
    const productItemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });
    const supplyItemsFromDB = await Supply.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });
    const planItemsFromDB = await Plan.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });
    const itemsFromDB = [
      ...productItemsFromDB,
      ...supplyItemsFromDB,
      ...planItemsFromDB,
    ];

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price:
          language === 'en'
            ? matchingItemFromDB.currentPrice
            : (
                (matchingItemFromDB.translations?.hu?.currentPrice ||
                  matchingItemFromDB.currentPrice) * 0.7874
              ).toFixed(0),
        _id: undefined,
        type: undefined,
        model_type:
          itemFromClient.type === 'product'
            ? 'Product'
            : itemFromClient.type === 'supply'
            ? 'Supply'
            : itemFromClient.type === 'membership'
            ? 'Plan'
            : undefined,
      };
    });

    const taxRate = language === 'en' ? 0.15 : 0.27;
    const freeShipping = language === 'en' ? 100 : 20000;
    const shipping = language === 'en' ? 10 : 1990;

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(
      dbOrderItems,
      taxRate,
      freeShipping,
      shipping
    );

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      language,
      shippingAddress,
      billingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/mine
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    stripe payment for the order
// @route   POST /api/orders/:id/stripe
// @access  Private
const stripePayment = asyncHandler(async (req, res) => {
  // find the order
  const order = await Order.findById(req.params.id);
  // const { origin } = req.headers;

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // get the user
  const user = req.user;

  // Create payment intent/making the payment
  try {
    const amount = parseInt(order.totalPrice * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: order.language === 'hu' ? 'huf' : 'eur',
      statement_descriptor_suffix: 'Payment using Stripe',
      payment_method_types: ['card'],
      // automatic_payment_methods: {
      //   enabled: true,
      // },
      // add somme metadata
      metadata: {
        userId: user?._id.toString(),
        orderId: order._id.toString(),
      },
    });
    // Send the respons
    res.json({
      clientSecret: paymentIntent.client_secret,
      // paymentIntent,
      userEmail: user?.email,
      orderId: order._id,
    });
  } catch (err) {
    res.json(err);
  }
});

// @desc    stripe payment verify
// @route   GET /api/orders/:paymentId/verify
// @access  Private
const stripeVerify = asyncHandler(async (req, res) => {
  // Get the paymentId
  const { paymentId } = req.params;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

  // Confirm the payment status
  if (paymentIntent.status === 'succeeded') {
    // get the data from the metadata
    const metadata = paymentIntent?.metadata;
    const orderId = metadata?.orderId;
    const userId = metadata?.userId;

    // Find the user
    const userFound = await User.findById(userId);
    if (!userFound) {
      res.status(404);
      throw new Error('User not found');
    }
    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    // Checking the payment of the order
    if (order.isPaid) {
      return res.status(200).json(order);
    }
    // get the payment details
    const amount = paymentIntent?.amount / 100;
    const currency = paymentIntent.currency;
    order.isPaid = true;
    order.paidAt = Date.now();

    // Create payment history
    order.paymentResult = {
      id: paymentIntent.id,
      payingUser: userFound?._id,
      paymentMethod: 'stripe',
      status: 'success',
      amount,
      currency,
    };

    //There is a membership subscription between the orders
    const membership = order.orderItems.find(
      (item) => item.model_type === 'Plan'
    );
    if (membership) {
      const plan = await Plan.findById(membership.product);
      if (!userFound.premiumExpiresAt) {
        userFound.premiumExpiresAt = addTimeToDate(
          new Date(),
          plan.timeLimitMeasure,
          plan.timeLimitQty
        );
      } else {
        if (userFound.premiumExpiresAt <= Date.now()) {
          userFound.premiumExpiresAt = addTimeToDate(
            new Date(),
            plan.timeLimitMeasure,
            plan.timeLimitQty
          );
        } else {
          userFound.premiumExpiresAt = addTimeToDate(
            new Date(userFound.premiumExpiresAt),
            plan.timeLimitMeasure,
            plan.timeLimitQty
          );
        }
      }
      // checks if the user is a MeilerLite subscriber
      // await unAssignSubscriberGroup(userFound.email, process.env.PREMIUM_GROUP);
      const subscriber = await getSubscriber(userFound.email);
      if (subscriber) {
        // Is the user a member of the PANTHERSTUFF_PREMIUM group
        const group = subscriber.data.groups.find(
          (item) => item.id === process.env.PREMIUM_GROUP
        );
        if (!group) {
          // Add user to PANTHERSTUFF_PREMIUM group
          await assignSubscriberGroup(
            userFound.email,
            process.env.PREMIUM_GROUP
          );
        }
      } else {
        // Register user on Pantherstuff MailerLite and add to PANTHERSTUFF_PREMIUM group?
        const groups = [process.env.SUBSCRIBE_GROUP, process.env.PREMIUM_GROUP];
        await createSubscriber(userFound.email, userFound.name, groups);
      }

      // Update the user profile
      userFound.isPremium = true;
      await userFound.save();
    }

    // send the response
    const updatedOrder = await order.save();
    if (updatedOrder) {
      // res.status(200).json('Payment verified, user updated');
      res.status(200).json(updatedOrder);
    }
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updateOrder = await order.save();

    res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = getAll(Order, productsPopOption);
// const getOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({}).populate('user', 'id name');
//   res.status(200).json(orders);
// });

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  stripePayment,
  stripeVerify,
  updateOrderToDelivered,
  getOrders,
};
