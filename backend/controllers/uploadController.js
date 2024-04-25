import path from 'path';
import fs from 'fs';
import multer from 'multer';
import asyncHandler from '../middleware/asyncHandler.js';
import Upload from '../models/uploadModel.js';
import { getAll } from './handlerFactory.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

// @desc    Get images
// @route   GET /api/upload
// @access  Private, Admin
const getImages = getAll(Upload);

// @desc    Create and upload image
// @route   Post /api/upload
// @access  Private, Admin
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: err.message });
  }

  const image = new Upload({
    user: req.user._id,
    fileName: req.file.filename,
    thumbnailUrl: `/${req.file.path}`,
    size: req.file.size,
    title: req.file.originalname,
  });

  const createdImage = await image.save();

  res.status(200).send({
    message: 'Image uploaded successfully',
    image: createdImage.thumbnailUrl,
  });
});

// @desc    Delete uploaded image
// @route   delete /api/upload/:id
// @access  Private, Admin
const deleteImage = asyncHandler(async (req, res) => {
  const image = await Upload.findById({ _id: req.params.id });

  if (!image) {
    res.status(404);
    throw new Error('Resource not found');
  }

  const __dirname = path.resolve();
  const file = `${__dirname}/uploads/${image.fileName}`;
  fs.unlink(file, (err) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        res.status(404);
        throw new Error('Resource not found');
      }
    }
  });
  await Upload.findByIdAndDelete(image._id);
  res.status(200).json({ message: `image ${image.fileName} deleted` });
});

export { uploadSingleImage, uploadImage, getImages, deleteImage };
