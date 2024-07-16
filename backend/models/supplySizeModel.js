import mongoose from 'mongoose';

const supplySizeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: { type: String },
  info: { type: String },
  translations: {
    hu: {
      title: { type: String },
      description: { type: String },
      info: { type: String },
    },
  },
});

supplySizeSchema.virtual('supplies', {
  ref: 'Supply',
  localField: '_id',
  foreignField: 'sizes',
});

const SupplySize = mongoose.model('SupplySize', supplySizeSchema);

export default SupplySize;
