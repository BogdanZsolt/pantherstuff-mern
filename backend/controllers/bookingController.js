import asyncHandler from '../middleware/asyncHandler.js';
import APIFeatures from '../utils/apiFeatures.js';
import { getOne } from './handlerFactory.js';
import Booking from '../models/bookingModel.js';

const bookingsPopOption = [
  { path: 'user', select: ['name'] },
  {
    path: 'event',
    select: ['title', 'duration', 'durationUnit', 'translations', 'location'],
  },
  {
    path: 'order',
    select: [
      'paymentResult',
      'language',
      'paymentMethod',
      'paymentMethod',
      'createdAt',
      'updatedAt',
      'paidAt',
    ],
  },
];

const bookingPopOption = [
  { path: 'user', select: ['name'] },
  {
    path: 'event',
    select: ['title', 'duration', 'durationUnit', 'translations', 'location'],
  },
  {
    path: 'order',
    select: [
      'paymentResult',
      'language',
      'paymentMethod',
      'paymentMethod',
      'createdAt',
      'updatedAt',
      'paidAt',
    ],
  },
];

const myBookingPopOption = [
  { path: 'user', select: ['name'] },
  {
    path: 'event',
    select: [
      'title',
      'startDate',
      'duration',
      'durationUnit',
      'translations',
      'location',
    ],
  },
  {
    path: 'order',
    select: [
      'paymentResult',
      'language',
      'paymentMethod',
      'paymentMethod',
      'createdAt',
      'updatedAt',
      'paidAt',
    ],
  },
];

const documentumCount = (docs) => {
  return docs.length;
};

// @desc    get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  if (req.query.page) {
    req.query.limit = req.query.limit || process.env.PAGINATION_LIMIT;
  }

  const features = new APIFeatures(Booking.find(), req.query, bookingsPopOption)
    .filter()
    .sort()
    .limit()
    .limitFields()
    .paginate()
    .populate();

  const doc = await features.query;
  let pages = 1;
  let count = 0;

  if (req.query.page) {
    const counter = new APIFeatures(
      Booking.find(),
      req.query,
      bookingsPopOption
    ).filter();

    const docs = await counter.query;
    count = documentumCount(docs);

    pages = Math.ceil(count / Number(req.query.limit));
  } else {
    count = documentumCount(doc);
  }

  // SEND RESPONSE
  res.json({
    data: doc,
    pages,
    page,
    count,
  });
});

//  @desc    get an booking by Id
// @route   GET /api/bookings/:id
// @access  Public
const getBookingById = getOne(Booking, bookingPopOption);

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mine
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const features = new APIFeatures(
    Booking.find({ user: req.user._id }),
    req.query,
    myBookingPopOption
  )
    .filter()
    .sort()
    .limit()
    .limitFields()
    .paginate()
    .populate();

  const doc = await features.query;
  if (doc) {
    return res.status(200).json(doc);
  } else {
    res.status(404);
    throw new Error('resource not found');
  }
});

export { getBookings, getBookingById, getMyBookings };
