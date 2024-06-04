import asyncHandler from '../middleware/asyncHandler.js';
import { getOne, createOne, updateOne } from './handlerFactory.js';
import APIFeatures from '../utils/apiFeatures.js';
import Product from '../models/productModel.js';

const productsPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: ['title'] },
];
const productPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: 'title' },
];
const productCreateInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.name = 'Simple title';
  req.body.thumbnails = ['/images/sample.jpg'];
  req.body.description = 'Simple description';
  req.body.beforePrice = 0;
  req.body.currentPrice = 0;
  req.body.countInStock = 0;
  req.body.rating = 0;
  req.body.numReviews = 0;
  req.body.colors = ['#ffffff'];
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

// @desc    Fetch all products
// @route   GET /api/products/all
// @access  Public
// const getProducts = getAll(Product, productsPopOption);
const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  if (req.query.page) {
    req.query.limit = req.query.limit || process.env.PAGINATION_LIMIT;
  }

  const features = new APIFeatures(Product.find(), req.query, productsPopOption)
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
      Product.find(),
      req.query,
      productsPopOption
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

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = getOne(Product, productPopOption);

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = createOne(Product);

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = updateOne(Product);
// const updateProduct = asyncHandler(async (req, res) => {
//   const {
//     name,
//     thumbnail,
//     thumbnailHover,
//     description,
//     category,
//     beforePrice,
//     currentPrice,
//     countInStock,
//     colors,
//     thumbnails,
//     sizes,
//   } = req.body;

//   const product = await Product.findById(req.params.id);

//   if (product) {
//     product.name = name;
//     product.thumbnail = thumbnail;
//     product.thumbnailHover = thumbnailHover;
//     product.description = description;
//     product.category = category;
//     product.beforePrice = beforePrice;
//     product.currentPrice = currentPrice;
//     product.countInStock = countInStock;
//     product.colors = colors;
//     product.sizes = sizes;
//     product.thumbnails = thumbnails;

//     const updatedProduct = await product.save();

//     res.json(updatedProduct);
//   } else {
//     res.status(404);
//     throw new Error('Resource not found');
//   }
// });

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
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

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.status(200).json(products);
});

const getProductStats = asyncHandler(async (req, res) => {
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

const getProductsMinMaxPrice = asyncHandler(async (req, res) => {
  try {
    const minMaxPrice = await Product.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: '$currentPrice' },
          maxPrice: { $max: '$currentPrice' },
        },
      },
    ]);
    res.status(200).json(minMaxPrice);
  } catch (err) {
    res.status(404);
    throw new Error('Resource not found');
  }
});

const getProductsAllColors = asyncHandler(async (req, res) => {
  try {
    const allColors = await Product.aggregate([
      {
        $group: {
          _id: null,
          colors: { $addToSet: '$colors' },
        },
      },
      {
        $addFields: {
          colors: {
            $reduce: {
              input: '$colors',
              initialValue: [],
              in: {
                $concatArrays: ['$$value', '$$this'],
              },
            },
          },
        },
      },
    ]);
    const filtered = allColors[0].colors.filter(
      (val, index) => allColors[0].colors.indexOf(val) === index
    );
    allColors[0].colors = [...filtered];
    res.status(200).json(allColors);
  } catch (err) {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  productCreateInit,
  getProductStats,
  getProductsMinMaxPrice,
  getProductsAllColors,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
