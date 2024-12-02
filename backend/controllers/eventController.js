import asyncHandler from '../middleware/asyncHandler.js';
import { getOne, createOne } from './handlerFactory.js';
import APIFeatures from '../utils/apiFeatures.js';
import Event from '../models/eventModel.js';

const eventsPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: ['title', 'translations'] },
];
const eventPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: ['title', 'translations'] },
];
const eventCreateInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.title = 'Simple event title';
  req.body.images = ['/images/sample.jpg'];
  req.body.description = 'Simple event description';
  req.body.currentPrice = 0;
  req.body.beforePrice = 0;
  req.body.advance = 0;
  req.body.duration = 0;
  req.body.maxGroupsize = 0;
  req.body.rating = 0;
  req.body.numReviews = 0;
  req.body.translations = {
    hu: {
      title: 'Egyszerű esemény cím',
      description: 'Egyszerű esemény leírás',
      beforePrice: 0,
      currentPrice: 0,
      advance: 0,
    },
  };
  next();
};

const documentumCount = (docs) => {
  return docs.length;
};

// @desc    get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  if (req.query.page) {
    req.query.limit = req.query.limit || process.env.PAGINATION_LIMIT;
  }

  const features = new APIFeatures(Event.find(), req.query, eventsPopOption)
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
      Event.find(),
      req.query,
      eventsPopOption
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

// @desc    Get  events min-max price
// @route   GET /api/events/minmax
// @access  Public
const getEventsMinMaxPrice = asyncHandler(async (req, res) => {
  try {
    const minMaxPrice = await Event.aggregate([
      {
        $addFields: {
          current_hu: {
            $ifNull: ['$translations.hu.currentPrice', '$currentPrice'],
          },
        },
      },
      {
        $group: {
          _id: null,
          minPrice: {
            $min: '$currentPrice',
          },
          maxPrice: {
            $max: '$currentPrice',
          },
          minPrice_hu: {
            $min: '$current_hu',
          },
          maxPrice_hu: {
            $max: '$current_hu',
          },
        },
      },
    ]);
    res.status(200).json(minMaxPrice);
  } catch (err) {
    res.status(404);
    throw new Error('Resource not found');
  }
});

//  @desc    get an event by Id
// @route   GET /api/events/:id
// @access  Public
const getEventById = getOne(Event, eventPopOption);

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = createOne(Event);

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const {
    title,
    images,
    description,
    currentPrice,
    beforePrice,
    advance,
    category,
    duration,
    durationUnit,
    maxGroupsize,
    startDate,
    location,
    translations,
  } = req.body;

  const event = await Event.findById(req.params.id);

  if (event) {
    event.title = title || event.title;
    event.images = images || event.images;
    event.description = description || event.description;
    event.currentPrice = currentPrice || event.currentPrice;
    event.beforePrice = beforePrice || event.beforePrice;
    event.advance = advance || event.advance;
    event.category = category || event.category;
    event.duration = duration || event.duration;
    event.durationUnit = durationUnit || event.durationUnit;
    event.maxGroupsize = maxGroupsize || event.maxGroupsize;
    event.startDate = startDate || event.startDate;
    event.location = location || event.location;
    event.translations = translations || event.translations;

    const updatedEvent = await event.save();

    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    copy an event
// @route   POST /api/events/:id
// @access  Private/Admin
const copyEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    const newEvent = new Event({
      user: req.user._id,
      title: event.title,
      images: event.images,
      description: event.description,
      currentPrice: event.currentPrice,
      beforePrice: event.beforePrice,
      advance: event.advance,
      category: event.category,
      maxGroupsize: event.maxGroupsize,
      startDate: null,
      duration: event.duration,
      durationUnit: event.durationUnit,
      rating: event.rating,
      numReviews: event.numReviews,
      location: event.location,
      translations: event.translations,
    });
    const doc = await newEvent.save();
    res.status(201).json(doc);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Delete an event by Id
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    await Event.deleteOne({ _id: event._id });
    res.status(200).json({ message: 'Event deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create a new event's review
// @route   POST /api/events/:id/reviews
// @access  Private
const createEventsReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const event = await Event.findById(req.params.id);

  if (event) {
    const alreadyReviewed = event.reviews?.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Event already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    event.reviews.push(review);

    event.numReviews = event.reviews.length;

    event.rating = (
      event.reviews.reduce((acc, review) => acc + review.rating, 0) /
      event.reviews.length
    ).toFixed(1);

    await event.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Get top rated events
// @route   GET /api/events/top
// @access  Public
const getTopEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort({ rating: -1 }).limit(4);
  res.status(200).json(events);
});

// @desc    Get event stats
// @route   GET /api/events/stats
// @access  Public
const getEventStats = asyncHandler(async (req, res) => {
  try {
    const stats = await Course.aggregate([
      // {
      //   $match: { rating: { $gte: 4.5 } },
      // },
      {
        $group: {
          _id: '$rating',
          numEvents: { $sum: 1 },
          numRatings: { $sum: '$rating' },
          avgRating: { $avg: '$rating' },
          avgPrice: { $avg: '$currentPrice' },
          minPrice: { $min: '$currentPrice' },
          maxPrice: { $max: '$currentPrice' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);
    res.status(200).json(stats);
  } catch (err) {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  getEvents,
  getEventsMinMaxPrice,
  getEventById,
  createEvent,
  eventCreateInit,
  updateEvent,
  copyEvent,
  deleteEvent,
  createEventsReview,
  getTopEvents,
  getEventStats,
};
