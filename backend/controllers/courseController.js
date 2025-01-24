import asyncHandler from '../middleware/asyncHandler.js';
import { getOne, createOne } from './handlerFactory.js';
import APIFeatures from '../utils/apiFeatures.js';
import Course from '../models/courseModel.js';
import Video from '../models/videoModel.js';
import Textual from '../models/textualModel.js';
import User from '../models/userModel.js';
import CourseProgress from '../models/courseProgressModel.js';

const coursesPopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: ['title', 'translations'] },
  {
    path: 'students',
    populate: { path: 'user', select: ['_id', 'name', 'email'] },
  },
];

const coursePopOption = [
  { path: 'user', select: ['name'] },
  { path: 'category', select: ['title', 'translations'] },
  {
    path: 'students',
    populate: { path: 'user', select: ['_id', 'name', 'email'] },
  },
  {
    path: 'curriculum',
    populate: { path: 'lesson' },
  },
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
  req.body.curriculum = {
    totalDuration: 0,
    lessons: [],
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
    curriculum,
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
    course.curriculum = curriculum || course.curriculum;
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

// @desc    Create new lesson to curriculum
// @route   POST /api/courses/:id/lesson
// @access  Private/Admin
const addNewLesson = asyncHandler(async (req, res) => {
  const { lessonType } = req.body;
  let course = await Course.findById(req.params.id);

  if (course) {
    let createLesson;
    if (lessonType === 'Video') {
      createLesson = new Video({
        user: req.user._id,
        title: 'Simple video lesson title',
        videoUrl: 'https://vimeo.com/717781102?share=copy',
        duration: 0,
        translations: {
          hu: {
            title: 'Egyszerű videó lecke cím',
            videoUrl: 'https://vimeo.com/717781102?share=copy',
          },
        },
      });
    } else if (lessonType === 'Textual') {
      createLesson = new Textual({
        user: req.user._id,
        title: 'Simple textual lesson title',
        text: '<p>Some cool text</p>',
        translations: {
          hu: {
            title: 'Egyszerű szöveges lecke cím',
            text: '<p>Valami menő szöveg</p>',
          },
        },
      });
    }
    const newLesson = await createLesson.save();
    if (newLesson) {
      course.curriculum.push({
        lesson: newLesson._id,
        lessonType,
      });
    }
  }
  const updatedCourse = await course.save();
  if (updatedCourse) {
    res.status(200).json(updatedCourse);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Remove lesson from curriculum
// @route   PUT /api/courses/:id/dalete
// @access  Private/Admin
const removeLesson = asyncHandler(async (req, res) => {
  let course = await Course.findById(req.params.id);
  const { lessonId } = req.body;

  if (course) {
    const lesson = course.curriculum.find(
      (item) => item.lesson.toString() === lessonId
    );
    let model;
    if (lesson.lessonType === 'Video') {
      model = Video;
    } else if (lesson.lessonType === 'Textual') {
      model = Textual;
    }
    course.curriculum = course.curriculum.filter(
      (item) => item.lesson.toString() !== lessonId
    );
    const delLesson = await model.findById(lessonId);
    // console.log(delLesson);
    if (delLesson) {
      await model.deleteOne({ _id: lessonId });
    }
    const updatedLesson = await course.save();
    res.status(200).json(updatedLesson);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Update lesson in curriculum
// @route   PUT /api/courses/:id/lesson/:id/update
// @access  Private/Admin
const updateLesson = asyncHandler(async (req, res) => {
  let course = await Course.findById(req.params.id);
  const { lessonId, title } = req.body;

  if (course) {
    const lesson = course.curriculum.find(
      (item) => item.lesson.toString() === lessonId
    );
    let updatedLesson;
    if (lesson.lessonType === 'Video') {
      let video = await Video.findById(lessonId);
      video.title = title || video.title;
      video.videoUrl = req.body.videoUrl || video.videoUrl;
      video.duration = req.body.duration || video.duration;
      video.translations.hu.title =
        req.body.translations.hu.title || video.translations.hu.title;
      video.translations.hu.videoUrl =
        req.body.translations.hu.videoUrl || video.translations.hu.videoUrl;
      updatedLesson = await video.save();
    } else if (lesson.lessonType === 'Textual') {
      let textual = await Textual.findById(lessonId);
      textual.title = title || textual.title;
      textual.text = req.body.text || textual.text;
      textual.translations.hu.title =
        req.body.translations.hu.title || textual.translations.hu.title;
      textual.translations.hu.text =
        req.body.translations.hu.text || textual.translations.hu.text;
      updatedLesson = await textual.save();
    }
    res.json(updatedLesson);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Mark current lesson viewed
// @route   PUT /api/courses/:id/lesson/:id/viewed
// @access  Private
const markCurrentLessonAsViewed = asyncHandler(async (req, res) => {
  const { id: courseId } = req.params;
  const user = await User.findById(req.user._id).populate([
    {
      path: 'courses',
      populate: { path: 'course' },
    },
    { path: 'courses', populate: { path: 'user', select: ['_id', 'name'] } },
  ]);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  console.log({ user });
  res.status(200).json(user);
});

// @desc    Get current course progress
// @route   GET /api/courses/:id/getprogress
// @access  Private
const getCurrentUserCourseProgress = asyncHandler(async (req, res) => {
  const { id: courseId } = req.params;
  const user = await User.findById(req.user._id).populate([
    {
      path: 'courses',
      populate: { path: 'course' },
    },
    { path: 'courses', populate: { path: 'user', select: ['_id', 'name'] } },
  ]);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }
  const isCousePourchasedByCurrentUser =
    user.courses?.findIndex((item) => item.course._id.toString() === courseId) >
    -1;
  if (!isCousePourchasedByCurrentUser) {
    res.status(404);
    throw new Error('You need to purchase this course to access it');
  }
  let currentUserCourseProgress = await CourseProgress.findOne({
    user: user._id,
    course: courseId,
  }).populate([
    { path: 'user', select: ['_id', 'name'] },
    { path: 'course', populate: { path: 'category' } },
    {
      path: 'course',
      populate: { path: 'curriculum', populate: { path: 'lesson' } },
    },
    {
      path: 'lessonProgress',
    },
  ]);
  if (!currentUserCourseProgress) {
    // const lessonProgress = course.curriculum.filter((item) => item);
    const lessonProgress = course.curriculum;
    const newCourseProgress = new CourseProgress({
      user: user._id,
      course: course._id,
      completed: false,
      lessonProgress,
    });
    const savedProgress = await newCourseProgress.save();
    if (savedProgress) {
      currentUserCourseProgress = await CourseProgress.findById(
        savedProgress._id
      ).populate([
        { path: 'user', select: ['_id', 'name'] },
        { path: 'course', populate: { path: 'category' } },
        {
          path: 'course',
          populate: { path: 'curriculum', populate: { path: 'lesson' } },
        },
        {
          path: 'lessonProgress',
        },
      ]);
    }
  }
  res.status(200).json(currentUserCourseProgress);
});

// @desc    Reset course progress
// @route   PUT /api/courses/:id/progress-reset
// @access  Private
const resetCurrentUserCourseProgress = asyncHandler(async (req, res) => {
  res.status(200).json('reset course progress');
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
  addNewLesson,
  removeLesson,
  updateLesson,
  markCurrentLessonAsViewed,
  getCurrentUserCourseProgress,
  resetCurrentUserCourseProgress,
};
