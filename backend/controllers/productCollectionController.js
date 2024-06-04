import ProductCollection from '../models/productCollectionModel.js';
import {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
} from './handlerFactory.js';

const productCollectionsPopOption = [{ path: 'user', select: ['name'] }];
const productCollectionPopOption = [{ path: 'user', select: 'name' }];

const createInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.title = 'Simple collection';
  req.body.description = 'Simple description';
  next();
};

// @desc    Get productCollections
// @route   GET /api/productcollections
// @access  Public
const getProductCollections = getAll(
  ProductCollection,
  productCollectionsPopOption
);

// @desc    Get a productCollection by ID
// @route   GET /api/productcollections/:id
// @access  Public
const getProductCollectionById = getOne(
  ProductCollection,
  productCollectionPopOption
);

// @desc    Create productCollection
// @route   POST /api/productcollections
// @access  Private/Admin
const createProductCollection = createOne(ProductCollection);

// @desc    delete productCollection by ID
// @route   DELETE /api/productcollections/:id
// @access  Private/Admin
const deleteProductCollection = deleteOne(ProductCollection);

// @desc    Update productCollection
// @route   PUT /api/productcollections/:id
// @access  Private/Admin
const updateProductCollection = updateOne(ProductCollection);

export {
  createInit,
  getProductCollections,
  getProductCollectionById,
  createProductCollection,
  deleteProductCollection,
  updateProductCollection,
};
