import mongoose from 'mongoose';

const eventCategorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      default: 'Event category title',
    },
    description: {
      type: 'String',
      required: true,
      default: 'Event category',
    },
    translations: {
      hu: {
        title: {
          type: String,
          default: 'Esemény kategória cím',
        },
        description: {
          type: String,
          default: 'Esemény kategória leírás',
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

eventCategorySchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'category',
});

const EventCategory = mongoose.model('EventCategory', eventCategorySchema);

export default EventCategory;
