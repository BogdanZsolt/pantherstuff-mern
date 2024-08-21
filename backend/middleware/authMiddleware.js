import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
import passport from 'passport';

const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(401).json({
        message: info ? info?.message : 'Login required, no token found',
        error: error ? error?.message : undefined,
      });
    }
    // place the user in the req obj
    req.user = user?._id;
    // call next
    return next();
  })(req, res, next);
};

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token failed.');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token.');
  }
});

// Admin middleware
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin.');
  }
});

// Premium member middleware
const premium = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isPremium) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as Premium member.');
  }
});

export { isAuthenticated, protect, admin, premium };
