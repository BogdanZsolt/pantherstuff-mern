import SupplySize from '../models/supplySizeModel.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';

const supplySizesPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'supplies' },
];
const supplySizePopOption = [
  { path: 'user', select: 'name' },
  { path: 'supplies' },
];

const createInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.title = 'Simple Size';
  req.body.description = 'Simple description';
  req.body.info = 'Simple info';
  req.body.translations = {
    hu: {
      title: 'Egyszerű kellék méret',
      description: 'Egyszerű kellék méret leírás',
      info: 'Egyszerű kellék méret info',
    },
  };
  next();
};

// @desc    Get supplySizes
// @route   GET /api/supplysizes
// @access  Public
const getSupplySizes = getAll(SupplySize, supplySizesPopOption);

// @desc    Get a supplySize by ID
// @route   GET /api/supplysizes/:id
// @access  Public
const getSupplySizeById = getOne(SupplySize, supplySizePopOption);

// @desc    Create supplySize
// @route   POST /api/supplysizes
// @access  Private/Admin
const createSupplySize = createOne(SupplySize);

// @desc    delete supplySize by ID
// @route   DELETE /api/supplysizes/:id
// @access  Private/Admin
const deleteSupplySize = deleteOne(SupplySize);

// @desc    Update supplySize
// @route   PUT /api/supplysizes/:id
// @access  Private/Admin
const updateSupplySize = updateOne(SupplySize);

export {
  createInit,
  getSupplySizes,
  getSupplySizeById,
  createSupplySize,
  deleteSupplySize,
  updateSupplySize,
};
