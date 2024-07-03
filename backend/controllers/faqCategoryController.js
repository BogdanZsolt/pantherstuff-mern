import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';
import FaqCategory from '../models/faqCategoryModel.js';

const faqCategoriesPopOption = [
  { path: 'user', select: ['name'] },
  {
    path: 'faqs',
  },
];

const faqCategoryPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'faqs' },
];

const faqCategoryCreateInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.title = 'Simple title';
  req.body.description = 'Simple description';
  req.body.translations = {
    hu: {
      question: 'Egyszerű cím',
      answer: 'Egyszerű leírás',
    },
  };
  next();
};

// @desc    Create new FAQ Category
// @route   POST /api/faqcategories
// @access  Private/Admin
const createFaqCategory = createOne(FaqCategory, faqCategoryCreateInit);

// @desc    Get all FAQ categories
// @route   GET /api/faqcategories
// @access  Public
const getFaqCategories = getAll(FaqCategory, faqCategoriesPopOption);

// @desc    Get FAQ Category by ID
// @route   GET /api/faqcategories/:id
// @access  Private/Admin
const getFaqCategoryById = getOne(FaqCategory, faqCategoryPopOption);

// @desc    Update FAQ Category
// @route   PUT /api/faqcategories/:id
// @access  Private/Admin
const updateFaqCategory = updateOne(FaqCategory);

// @desc    Delete FAQ Category
// @route   Delete /api/faqcategories/:id
// @access  Private/Admin
const deleteFaqCategory = deleteOne(FaqCategory);

export {
  faqCategoryCreateInit,
  createFaqCategory,
  getFaqCategories,
  getFaqCategoryById,
  updateFaqCategory,
  deleteFaqCategory,
};
