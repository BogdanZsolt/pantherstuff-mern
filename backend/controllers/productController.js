import asyncHandler from '../middleware/asyncHandler.js';
import { getAll, getOne, createOne } from './handlerFactory.js';
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

// @desc    Fetch all products
// @route   GET /api/products/all
// @access  Public
const getProducts = getAll(Product, productsPopOption);

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = getOne(Product, productPopOption);

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = createOne(Product);
// const createProduct = asyncHandler(async (req, res) => {
//   const product = new Product({
//     name: 'Sample name',
//     user: req.user._id,
//     thumbnails: ['/images/sample.jpg'],
//     description: 'Sample description',
//     category: '',
//     beforePrice: 0,
//     currentPrice: 0,
//     countInStock: 0,
//     rating: 0,
//     numReviews: 0,
//     colors: ['#ffffff'],
//   });

//   const createdProduct = await product.save();
//   res.status(201).json(createdProduct);
// });

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    thumbnail,
    thumbnailHover,
    description,
    category,
    beforePrice,
    currentPrice,
    countInStock,
    colors,
    thumbnails,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.thumbnail = thumbnail;
    product.thumbnailHover = thumbnailHover;
    product.description = description;
    product.category = category;
    product.beforePrice = beforePrice;
    product.currentPrice = currentPrice;
    product.countInStock = countInStock;
    product.colors = colors;
    product.thumbnails = thumbnails;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

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

export {
  productCreateInit,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
