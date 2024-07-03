import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';
import Faq from '../models/faqModel.js';
// import asyncHandler from '../middleware/asyncHandler.js';

const faqsPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: ['title', 'translations'] },
];

const faqPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: ['title', 'translations'] },
];

const faqCreateInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.question = 'Simple question';
  req.body.answer = '<p>Simple answer</p>';
  req.body.category = null;
  req.body.translations = {
    hu: {
      question: 'Egyszerű kérdés',
      answer: 'Egyszerű válasz',
    },
  };
  next();
};

// @desc    Create new FAQ
// @route   POST /api/faqs
// @access  Private/Admin
const createFaq = createOne(Faq);

// @desc    Get all FAQs
// @route   GET /api/faqs
// @access  Public
const getFaqs = getAll(Faq, faqsPopOption);

// @desc    Get FAQ by ID
// @route   GET /api/faqs/:id
// @access  Private/Admin
const getFaqById = getOne(Faq, faqPopOption);

// @desc    Update FAQ
// @route   PUT /api/faqs/:id
// @access  Private/Admin
const updateFaq = updateOne(Faq);

// @desc    Delete FAQ
// @route   Delete /api/faqs/:id
// @access  Private/Admin
const deleteFaq = deleteOne(Faq);

export { faqCreateInit, createFaq, getFaqs, getFaqById, updateFaq, deleteFaq };
