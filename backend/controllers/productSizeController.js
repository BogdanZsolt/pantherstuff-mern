import ProductSize from '../models/productSizeModel.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';

const productSizesPopOption = [{ path: 'user', select: ['name'] }];
const productSizePopOption = [
  { path: 'user', select: 'name' },
  { path: 'products' },
];

const createInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.title = 'Simple Product Size';
  req.body.description = 'Simple product size description';
  req.body.translations = {
    hu: {
      title: 'Egyszerű termék méret',
      description: 'Egyszerű termék méret leírás',
      info: 'Egyszerű termék méret info',
    },
  };
  next();
};

// @desc    Get productSizes
// @route   GET /api/productsizes
// @access  Public
const getProductSizes = getAll(ProductSize, productSizesPopOption);

// @desc    Get a productSize by ID
// @route   GET /api/productsizes/:id
// @access  Public
const getProductSizeById = getOne(ProductSize, productSizePopOption);

// @desc    Create productSize
// @route   POST /api/productsizes
// @access  Private/Admin
const createProductSize = createOne(ProductSize);

// @desc    delete productSize by ID
// @route   DELETE /api/productsizes/:id
// @access  Private/Admin
const deleteProductSize = deleteOne(ProductSize);

// @desc    Update productSize
// @route   PUT /api/productsizes/:id
// @access  Private/Admin
const updateProductSize = updateOne(ProductSize);

export {
  createInit,
  getProductSizes,
  getProductSizeById,
  createProductSize,
  deleteProductSize,
  updateProductSize,
};
