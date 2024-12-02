import asyncHandler from '../middleware/asyncHandler.js';
import APIFeatures from '../utils/apiFeatures.js';

const getAll = (Model, popOption) =>
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    if (req.query.page) {
      req.query.limit = req.query.limit || process.env.PAGINATION_LIMIT;
    }

    const features = new APIFeatures(Model.find(), req.query, popOption)
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
        Model.find(),
        req.query,
        popOption
      ).filter();

      count = await counter.query.estimatedDocumentCount();

      pages = Math.ceil(count / Number(req.query.limit));
    } else {
      count = doc.length;
    }

    // SEND RESPONSE
    res.json({ data: doc, pages, page, count });
  });

const getOne = (Model, popOption) =>
  asyncHandler(async (req, res) => {
    let query = Model.findById(req.params.id);
    if (popOption) query = query.populate(popOption);
    const doc = await query;

    if (doc) {
      return res.json(doc);
    } else {
      res.status(404);
      throw new Error('resource not found');
    }
  });

const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const create = new Model(req.body);

    const doc = await create.save();
    res.status(201).json(doc);
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res) => {
    console.log(req.params);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404);
      throw new Error('Resource not found');
    }
  });

const deleteOne = (Model) =>
  asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      res.status(404);
      throw new Error('Resource not found');
    } else {
      res.status(200).json({ message: 'Resource deleted' });
    }
  });

export { getAll, getOne, createOne, deleteOne, updateOne };
