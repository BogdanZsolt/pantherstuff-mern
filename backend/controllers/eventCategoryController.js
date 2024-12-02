import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';
import EventCategory from '../models/eventCategoryModel.js';

const eventCategoriesPopOption = [
  { path: 'user', select: ['name'] },
  {
    path: 'events',
  },
];

const eventCategoryPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'events' },
];

const eventCategoryCreateInit = (req, res, next) => {
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

// @desc    Create new Event Category
// @route   POST /api/eventcategories
// @access  Private/Admin
const createEventCategory = createOne(EventCategory);

// @desc    Get all Event categories
// @route   GET /api/eventcategories
// @access  Public
const getEventCategories = getAll(EventCategory, eventCategoriesPopOption);

// @desc    Get Event Category by ID
// @route   GET /api/eventcategories/:id
// @access  Private/Admin
const getEventCategoryById = getOne(EventCategory, eventCategoryPopOption);

// @desc    Update Event Category
// @route   PUT /api/eventcategories/:id
// @access  Private/Admin
const updateEventCategory = updateOne(EventCategory);

// @desc    Delete Event Category
// @route   Delete /api/eventcategories/:id
// @access  Private/Admin
const deleteEventCategory = deleteOne(EventCategory);

export {
  eventCategoryCreateInit,
  createEventCategory,
  getEventCategories,
  getEventCategoryById,
  updateEventCategory,
  deleteEventCategory,
};
