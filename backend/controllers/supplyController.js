import asyncHandler from '../middleware/asyncHandler.js';
import { getOne, createOne } from './handlerFactory.js';
import APIFeatures from '../utils/apiFeatures.js';
import Supply from '../models/supplyModel.js';

const suppliesPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: ['title', 'translations'] },
];
const supplyPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: ['title', 'translations'] },
  { path: 'sizes', select: ['title'] },
];
const supplyCreateInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.name = 'Simple supply';
  req.body.thumbnails = ['/images/sample.jpg'];
  req.body.description = 'Simple supply description';
  req.body.beforePrice = 0;
  req.body.currentPrice = 0;
  req.body.countInStock = 0;
  req.body.rating = 0;
  req.body.numReviews = 0;
  req.body.translations = {
    hu: {
      name: 'Egyszerű kellék',
      description: 'Egyszerű kellék leírás',
      beforePrice: 0,
      currentPrice: 0,
    },
  };
  next();
};

const documentumCount = (docs) => {
  return docs.length;
};

const minPrice = (docs) => {
  let min = 0;
  docs.map((doc) => {
    min =
      min === 0
        ? doc.currentPrice
        : min > doc.currentPrice
        ? doc.currentPrice
        : min;
  });
  return min;
};

const maxPrice = (docs) => {
  let max = 0;
  docs.map((doc) => {
    max =
      max === 0
        ? doc.currentPrice
        : max < doc.currentPrice
        ? doc.currentPrice
        : max;
  });
  return max;
};

// @desc    Fetch all supplies
// @route   GET /api/supplies/all
// @access  Public
// const getSupplies = getAll(Supply, suppliesPopOption);
const getSupplies = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  if (req.query.page) {
    req.query.limit = req.query.limit || process.env.PAGINATION_LIMIT;
  }

  const features = new APIFeatures(Supply.find(), req.query, suppliesPopOption)
    .filter()
    .sort()
    .limit()
    .limitFields()
    .paginate()
    .populate();

  const doc = await features.query;
  let pages = 1;
  let count = 0;
  let minCurrentPrice = 0;
  let maxCurrentPrice = 0;

  if (req.query.page) {
    const counter = new APIFeatures(
      Supply.find(),
      req.query,
      suppliesPopOption
    ).filter();

    const docs = await counter.query;
    count = documentumCount(docs);
    minCurrentPrice = minPrice(docs);
    maxCurrentPrice = maxPrice(docs);

    pages = Math.ceil(count / Number(req.query.limit));
  } else {
    count = documentumCount(doc);
    minCurrentPrice = minPrice(doc);
    maxCurrentPrice = maxPrice(doc);
  }

  // SEND RESPONSE
  res.json({ data: doc, pages, page, count, minCurrentPrice, maxCurrentPrice });
});

// @desc    Fetch a supply
// @route   GET /api/supplies/:id
// @access  Public
const getSupplyById = getOne(Supply, supplyPopOption);

// @desc    Create a supply
// @route   POST /api/supplies
// @access  Private/Admin
const createSupply = createOne(Supply);

// @desc    Update a Supply
// @route   PUT /api/Supplies/:id
// @access  Private/Admin
// const updateSupply = updateOne(Supply);
const updateSupply = asyncHandler(async (req, res) => {
  const {
    name,
    thumbnails,
    description,
    category,
    beforePrice,
    currentPrice,
    countInStock,
    translations,
  } = req.body;

  const supply = await Supply.findById(req.params.id);

  if (supply) {
    supply.name = name || supply.name;
    supply.thumbnails = thumbnails || supply.thumbnails;
    supply.description = description || supply.description;
    supply.category = category || supply.category;
    supply.beforePrice = beforePrice || supply.beforePrice;
    supply.currentPrice = currentPrice || supply.currentPrice;
    supply.countInStock = countInStock || supply.countInStock;
    supply.translations = translations || supply.translations;

    const updatedSupply = await supply.save();

    res.json(updatedSupply);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Delete a supply
// @route   DELETE /api/supplies/:id
// @access  Private/Admin
const deleteSupply = asyncHandler(async (req, res) => {
  const supply = await Supply.findById(req.params.id);

  if (supply) {
    await Supply.deleteOne({ _id: supply._id });
    res.status(200).json({ message: 'Supply deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create a new review
// @route   POST /api/supplies/:id/reviews
// @access  Private
const createSupplyReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const supply = await Supply.findById(req.params.id);

  if (supply) {
    const alreadyReviewed = supply.reviews?.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    supply.reviews.push(review);

    supply.numReviews = supply.reviews.length;

    supply.rating = (
      supply.reviews.reduce((acc, review) => acc + review.rating, 0) /
      supply.reviews.length
    ).toFixed(1);

    await supply.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Get top rated Supply
// @route   GET /api/supply/top
// @access  Public
const getTopSupplies = asyncHandler(async (req, res) => {
  const supplies = await Supply.find({}).sort({ rating: -1 }).limit(4);
  res.status(200).json(supplies);
});

const getSupplyStats = asyncHandler(async (req, res) => {
  try {
    const stats = await Product.aggregate([
      // {
      //   $match: { rating: { $gte: 4.5 } },
      // },
      {
        $group: {
          _id: '$rating',
          numProducts: { $sum: 1 },
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

const getSuppliesMinMaxPrice = asyncHandler(async (req, res) => {
  try {
    const minMaxPrice = await Supply.aggregate([
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

export {
  supplyCreateInit,
  getSupplyStats,
  getSuppliesMinMaxPrice,
  getSupplies,
  getSupplyById,
  createSupply,
  updateSupply,
  deleteSupply,
  createSupplyReview,
  getTopSupplies,
};
