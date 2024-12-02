import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';
import CourseCategory from '../models/courseCategoryModel.js';

const courseCategoriesPopOption = [
  { path: 'user', select: ['name'] },
  {
    path: 'courses',
  },
];

const courseCategoryPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'courses' },
];

const courseCategoryCreateInit = (req, res, next) => {
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

// @desc    Create new course Category
// @route   POST /api/coursecategories
// @access  Private/Admin
const createCourseCategory = createOne(CourseCategory);

// @desc    Get all course categories
// @route   GET /api/coursecategories
// @access  Public
const getCourseCategories = getAll(CourseCategory, courseCategoriesPopOption);

// @desc    Get course Category by ID
// @route   GET /api/coursecategories/:id
// @access  Private/Admin
const getCourseCategoryById = getOne(CourseCategory, courseCategoryPopOption);

// @desc    Update course Category
// @route   PUT /api/coursecategories/:id
// @access  Private/Admin
const updateCourseCategory = updateOne(CourseCategory);

// @desc    Delete course Category
// @route   Delete /api/coursecategories/:id
// @access  Private/Admin
const deleteCourseCategory = deleteOne(CourseCategory);

export {
  courseCategoryCreateInit,
  createCourseCategory,
  getCourseCategories,
  getCourseCategoryById,
  updateCourseCategory,
  deleteCourseCategory,
};
