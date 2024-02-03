import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   Get /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch a product
// @route   Get /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create a product
// @route   POST /api/products/
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    user: req.user._id,
    thumbnail: '/images/product_01.jpg',
    thumbnailHover: '/images/product_01b.jpg',
    description: 'Simple description',
    category: 'Simple',
    beforePrice: 0,
    currentPrice: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    colors: ['#ffe13c'],
    thumbnails: [''],
    reviews: [],
  });
  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

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
  const product = Product.findById(req.params.id);

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

    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export { getProducts, getProductById, createProduct, updateProduct };
