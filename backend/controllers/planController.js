import asyncHandler from '../middleware/asyncHandler.js';
import { createOne, getOne, updateOne } from './handlerFactory.js';
import APIFeatures from '../utils/apiFeatures.js';
import Plan from '../models/planModel.js';

const plansPopOption = [{ path: 'user', select: ['name'] }];
const planPopOption = [{ path: 'user', select: ['name'] }];
const planCreateInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.name = 'Simple plan';
  req.body.thumbnail = '/images/member.png';
  req.body.features = ['Simple feature 1'];
  req.body.limitation = '';
  req.body.price = 0;
  req.body.translations = {
    hu: {
      name: 'Egyszerű csomag',
      features: ['Egyszerű jellemző 1'],
      price: 0,
    },
  };
  next();
};

const documentumCount = (docs) => {
  return docs.length;
};

// @desc    Create a plan
// @route   POST /api/plans
// @access  Private/Admin
const createPlan = createOne(Plan);

// @desc    Fetch a plan
// @route   GET /api/plans/:id
// @access  Public
const getPlanById = getOne(Plan, planPopOption);

// @desc    Get plans
// @route   GET /api/plans
// @access  Public
const getPlans = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  if (req.query.page) {
    req.query.limit = req.query.limit || process.env.PAGINATION_LIMIT;
  }

  const features = new APIFeatures(Plan.find(), req.query, plansPopOption)
    .filter()
    .sort()
    .limit()
    .limitFields()
    .paginate()
    .populate();

  const doc = await features.query;
  let pages = 1;
  let count = 0;

  if (req.query.page) {
    const counter = new APIFeatures(
      Plan.find(),
      req.query,
      plansPopOption
    ).filter();

    const docs = await counter.query;
    count = documentumCount(docs);

    pages = Math.ceil(count / Number(req.query.limit));
  } else {
    count = documentumCount(doc);
  }

  // SEND RESPONSE
  res.json({ data: doc, pages, page, count });
});

// @desc    Update Plan
// @route   PUT /api/plans/:id
// @access  Private/Admin
const updatePlan = updateOne(Plan);

// @desc    Delete a plan
// @route   DELETE /api/plans/:id
// @access  Private/Admin
const deletePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);

  if (plan) {
    await Plan.deleteOne({ _id: plan._id });
    res.status(200).json({ message: 'Plan deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  planCreateInit,
  createPlan,
  getPlanById,
  getPlans,
  updatePlan,
  deletePlan,
};
