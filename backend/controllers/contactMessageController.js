import { getAll, deleteOne, updateOne } from './handlerFactory.js';
import ContactMessage from '../models/contactMessageModel.js';
import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
// import sendContactMessageEmail from '../utils/sendContactMessageEmail.js';
import Email from '../utils/email.js';

const contactMessagesPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'readerId', select: ['name'] },
];
const contactMessagePopOption = [
  { path: 'user', select: ['name'] },
  { path: 'readerId', select: ['name'] },
];

// @desc    Get all contact message
// @route   GET /api/contact-message
// @access  Private/Admin
const getContactMessages = getAll(ContactMessage, contactMessagesPopOption);

// @desc    Get a contact message by ID
// @route   GET /api/contact-message/:id
// @access  Private/Admin
const getContactMessageById = asyncHandler(async (req, res) => {
  let query = ContactMessage.findById(req.params.id);
  if (contactMessagePopOption) query = query.populate(contactMessagePopOption);
  const doc = await query;
  if (doc) {
    return res.status(200).json(doc);
  } else {
    res.status(404);
    throw new Error('resource not found');
  }
});

// @desc    Create contact message
// @route   POST /api/contact-messages
// @access  Public
const createContactMessage = asyncHandler(async (req, res) => {
  // get data
  const { name, email, message, telephone, to, ownerName, language } = req.body;
  // message sender is a user?
  const user = await User.findOne({ email });
  const info = await new Email(
    { name: ownerName, email: to },
    language
  ).contactMessage({
    email,
    name,
    telephone,
    message,
  });
  if (!info) {
    res.status(401).json({
      status: 401,
      message: 'Sending the letter failed',
    });
  } else {
    const create = new ContactMessage({
      name,
      email,
      message,
      telephone,
      user: user?._id || null,
    });
    const doc = await create.save();
    res.status(201).json(doc);
  }
});

// @desc    update contact message
// @route   PUT /api/contact-messages/:id
// @access  Private/Admin
const updateContactMessage = updateOne(ContactMessage);

// @desc    delete contact message
// @route   DELETE /api/contact-messages/:id
// @access  Private/Admin
const deleteContactMessage = deleteOne(ContactMessage);

export {
  getContactMessages,
  getContactMessageById,
  createContactMessage,
  updateContactMessage,
  deleteContactMessage,
};
