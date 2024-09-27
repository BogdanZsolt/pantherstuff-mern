import ProductCategory from '../models/productCategoryModel.js';
import {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
} from './handlerFactory.js';

const productCategoriesPopOption = [{ path: 'parent', select: ['title'] }];
const productCategoryPopOption = [
  { path: 'children', select: '_id title description -parent translations' },
  { path: 'parent', select: 'title' },
  {
    path: 'products',
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

// @desc    Get productCategories
// @route   GET /api/productcategories
// @access  Public
const getProductCategories = getAll(
  ProductCategory,
  productCategoriesPopOption
);

// @desc    Get a productCategory by ID
// @route   GET /api/productcategories/:id
// @access  Public
const getProductCategoryById = getOne(
  ProductCategory,
  productCategoryPopOption
);

// @desc    Create productCategory
// @route   POST /api/productcategories
// @access  Private/Admin
const createProductCategory = createOne(ProductCategory);

// @desc    delete productCategory by ID
// @route   DELETE /api/productcategories/:id
// @access  Private/Admin
const deleteProductCategory = deleteOne(ProductCategory);

// @desc    Update productCategory
// @route   PUT /api/productcategories/:id
// @access  Private/Admin
const updateProductCategory = updateOne(ProductCategory);

export {
  createInit,
  getProductCategories,
  getProductCategoryById,
  createProductCategory,
  deleteProductCategory,
  updateProductCategory,
};
