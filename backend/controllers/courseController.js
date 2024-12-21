import asyncHandler from '../middleware/asyncHandler.js';
import { getOne, createOne } from './handlerFactory.js';
import APIFeatures from '../utils/apiFeatures.js';
import Course from '../models/courseModel.js';

const coursesPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: ['title', 'translations'] },
];
const coursePopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: ['title', 'translations'] },
];
const courseCreateInit = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.title = 'Simple course title';
  req.body.images = ['/images/sample.jpg'];
  req.body.course = null;
  req.body.description = 'Simple course description';
  req.body.beforePrice = 0;
  req.body.currentPrice = 0;
  req.body.rating = 0;
  req.body.numReviews = 0;
  req.body.translations = {
    hu: {
      title: 'Egyszerű tanfolyam cím',
      description: 'Egyszerű tanfolyam   leírás',
      beforePrice: 0,
      currentPrice: 0,
    },
  };
  next();
};

const documentumCount = (docs) => {
  return docs.length;
};

const minPrice = (docs) => {
  let min = 0;
  docs.map((doc) => {
    min =
      min === 0
        ? doc.currentPrice
        : min > doc.currentPrice
        ? doc.currentPrice
        : min;
  });
  return min;
};

const maxPrice = (docs) => {
  let max = 0;
  docs.map((doc) => {
    max =
      max === 0
        ? doc.currentPrice
        : max < doc.currentPrice
        ? doc.currentPrice
        : max;
  });
  return max;
};

// @desc    get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  if (req.query.page) {
    req.query.limit = req.query.limit || process.env.PAGINATION_LIMIT;
  }

  const features = new APIFeatures(Course.find(), req.query, coursesPopOption)
    .filter()
    .sort()
    .limit()
    .limitFields()
    .paginate()
    .populate();

  const doc = await features.query;
  let pages = 1;
  let count = 0;
  let minCurrentPrice = 0;
  let maxCurrentPrice = 0;

  if (req.query.page) {
    const counter = new APIFeatures(
      Course.find(),
      req.query,
      coursesPopOption
    ).filter();

    const docs = await counter.query;
    count = documentumCount(docs);
    minCurrentPrice = minPrice(docs);
    maxCurrentPrice = maxPrice(docs);

    pages = Math.ceil(count / Number(req.query.limit));
  } else {
    count = documentumCount(doc);
    minCurrentPrice = minPrice(doc);
    maxCurrentPrice = maxPrice(doc);
  }

  // SEND RESPONSE
  res.json({ data: doc, pages, page, count, minCurrentPrice, maxCurrentPrice });
});

//  @desc    get a course by Id
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = getOne(Course, coursePopOption);

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = createOne(Course);

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const {
    title,
    images,
    description,
    currentPrice,
    beforePrice,
    duration,
    category,
    translations,
  } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    course.title = title || course.title;
    course.images = images || course.images;
    course.description = description || course.description;
    course.currentPrice = currentPrice || course.currentPrice;
    course.beforePrice = beforePrice || course.beforePrice;
    course.duration = duration || course.duration;
    course.category = category;
    course.translations = translations || course.translations;

    const updatedCourse = await course.save();

    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    copy a course
// @route   POST /api/courses/:id
// @access  Private/Admin
const copyCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course) {
    const newCourse = new Course({
      user: req.user._id,
      title: course.title,
      images: course.images,
      description: course.description,
      currentPrice: course.currentPrice,
      beforePrice: course.beforePrice,
      duration: course.duration,
      category: course.category,
      rating: 0,
      numReviews: 0,
      translations: course.translations,
    });
    const doc = await newCourse.save();
    res.status(201).json(doc);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Delete a course by Id
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await Course.deleteOne({ _id: course._id });
    res.status(200).json({ message: 'Course deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create a new course's review
// @route   POST /api/courses/:id/reviews
// @access  Private
const createCoursesReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const course = await Course.findById(req.params.id);

  if (course) {
    const alreadyReviewed = course.reviews?.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Course already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    course.reviews.push(review);

    course.numReviews = course.reviews.length;

    course.rating = (
      course.reviews.reduce((acc, review) => acc + review.rating, 0) /
      course.reviews.length
    ).toFixed(1);

    await course.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Get top rated courses
// @route   GET /api/courses/top
// @access  Public
const getTopCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).sort({ rating: -1 }).limit(4);
  res.status(200).json(courses);
});

// @desc    Get course stats
// @route   GET /api/courses/stats
// @access  Public
const getCourseStats = asyncHandler(async (req, res) => {
  try {
    const stats = await Course.aggregate([
      // {
      //   $match: { rating: { $gte: 4.5 } },
      // },
      {
        $group: {
          _id: '$rating',
          numCourses: { $sum: 1 },
          numRatings: { $sum: '$rating' },
          avgRating: { $avg: '$rating' },
          avgPrice: { $avg: '$currentPrice' },
          minPrice: { $min: '$currentPrice' },
          maxPrice: { $max: '$currentPrice' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);
    res.status(200).json(stats);
  } catch (err) {
    res.status(404);
    throw new Error('Resource not found');
  }
});

const getCoursesMinMaxPrice = asyncHandler(async (req, res) => {
  try {
    const minMaxPrice = await Course.aggregate([
      {
        $addFields: {
          current_hu: {
            $ifNull: ['$translations.hu.currentPrice', '$currentPrice'],
          },
        },
      },
      {
        $group: {
          _id: null,
          minPrice: {
            $min: '$currentPrice',
          },
          maxPrice: {
            $max: '$currentPrice',
          },
          minPrice_hu: {
            $min: '$current_hu',
          },
          maxPrice_hu: {
            $max: '$current_hu',
          },
        },
      },
    ]);
    res.status(200).json(minMaxPrice);
  } catch (err) {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  getCourses,
  getCourseById,
  createCourse,
  courseCreateInit,
  updateCourse,
  copyCourse,
  deleteCourse,
  createCoursesReview,
  getTopCourses,
  getCourseStats,
  getCoursesMinMaxPrice,
};
