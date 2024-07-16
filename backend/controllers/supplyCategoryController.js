import SupplyCategory from '../models/supplyCategoryModel.js';
import {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
} from './handlerFactory.js';

const supplyCategoriesPopOption = [{ path: 'parent', select: ['title'] }];
const supplyCategoryPopOption = [
  { path: 'children', select: '_id title description -parent translations' },
  { path: 'parent', select: 'title' },
  {
    path: 'supplies',
    select: '-body -__v',
    populate: [
      { path: 'user', select: 'name' },
      { path: 'category', select: 'title' },
    ],
  },
];

const createInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.title = 'Simple category';
  req.body.description = 'Simple description';
  req.body.parent = null;
  req.body.translations = {
    hu: {
      title: 'Egyszerű kategória',
      description: 'Egyszerű leírás',
    },
  };
  next();
};

// @desc    Get supplyCategories
// @route   GET /api/supplycategories
// @access  Public
const getSupplyCategories = getAll(SupplyCategory, supplyCategoriesPopOption);

// @desc    Get a supplyCategory by ID
// @route   GET /api/supplycategories/:id
// @access  Public
const getSupplyCategoryById = getOne(SupplyCategory, supplyCategoryPopOption);

// @desc    Create supplyCategory
// @route   POST /api/supplycategories
// @access  Private/Admin
const createSupplyCategory = createOne(SupplyCategory);

// @desc    delete supplyCategory by ID
// @route   DELETE /api/supplycategories/:id
// @access  Private/Admin
const deleteSupplyCategory = deleteOne(SupplyCategory);

// @desc    Update supplyCategory
// @route   PUT /api/supplycategories/:id
// @access  Private/Admin
const updateSupplyCategory = updateOne(SupplyCategory);

export {
  createInit,
  getSupplyCategories,
  getSupplyCategoryById,
  createSupplyCategory,
  deleteSupplyCategory,
  updateSupplyCategory,
};
