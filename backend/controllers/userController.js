import passport from 'passport';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
// import sendAccVerificationEmail from '../utils/sendAccVerificationEmail.js';
// import sendPasswordResetEmail from '../utils/sendPasswordResetEmail.js';
import Email from '../utils/email.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    // Check if user not found
    if (!user) {
      res.status(401);
      throw new Error(info.message);
    }
    // generate token
    generateToken(res, user._id);

    // response user info
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      premiumExpiresAt: user.premiumExpiresAt,
    });
  })(req, res, next);
});

// @desc    Google Auth user & get token
// @route   GET /api/users/auth/google
// @access  Public
const googleAuthUser = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// @desc    Google Auth callback
// @route   GET /api/users/auth/google/callback
// @access  Public
const googleAuthUserCallback = asyncHandler(async (req, res, next) => {
  passport.authenticate(
    'google',
    {
      failureRedirect: 'login',
      session: false,
    },
    (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.redirect(`${process.env.FRONTEND_URL}/google-login-error`);
      }
      // generate token
      generateToken(res, user?._id);
      // redirekt user
      if (process.env.NODE_ENV === 'development') {
        res.redirect(`${process.env.FRONTEND_URL}`);
      } else {
        res.redirect('/');
      }
    }
  )(req, res, next);
});

// @desc    Check user authenticated
// @route   GET /api/users/checkauthenticated
// @access  Public
const checkAuthenticated = asyncHandler(async (req, res) => {
  const token = req.cookies['jwt'];
  if (!token) {
    return res.status(200).json({ isAuthenticated: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // find the user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(200).json({ isAuthenticated: false });
    } else {
      res.status(200).json({
        isAuthenticated: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        isAdmin: user.isAdmin,
        isPremium: user.isPremium,
        premiumExpiresAt: user.premiumExpiresAt,
      });
    }
  } catch (err) {
    return res.status(401).json({ isAuthenticated: false, err });
  }
});

// @desc    Check if the user is an Admin
// @route   GET /api/users/checkadmin
// @access  Public
const checkIsAdmin = asyncHandler(async (req, res) => {
  const token = req.cookies['jwt'];
  if (!token) {
    return res.status(200).json({ isAdmin: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // find the user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(200).json({ isAdmin: false });
    } else {
      let isAdmin = false;
      if (user.isAdmin) {
        isAdmin = user.isAdmin;
      }
      res.status(200).json({
        isAdmin: isAdmin,
      });
    }
  } catch (err) {
    return res.status(401).json({ isAdmin: false, err });
  }
});

// @desc    Check if the user's plan is premium
// @route   GET /api/users/checkpremium
// @access  Public
const checkIsPremium = asyncHandler(async (req, res) => {
  const token = req.cookies['jwt'];
  if (!token) {
    return res.status(200).json({ isPremium: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // find the user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(200).json({ isPremium: false });
    } else {
      let isPremium = false;
      if (user.isPremium || user.isAdmin) {
        isPremium = true;
      }
      res.status(200).json({
        isPremium: isPremium,
      });
    }
  } catch (err) {
    return res.status(401).json({ isPremium: false, err });
  }
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email already exist
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Register the user
  const user = await User.create({
    name,
    email,
    isEmailVerified: false,
    isPremium: true,
    premiumExpiresAt: null,
    password,
  });

  if (user) {
    // generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    // expires: new Date(0),
    maxAge: 1,
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      authMethod: user.authMethod,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      premiumExpiresAt: user.premiumExpiresAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isEmailVerified: updateUser.isEmailVerified,
      isAdmin: updatedUser.isAdmin,
      isPremium: updateUser.isPremium,
      premiumExpiresAt: updateUser.premiumExpiresAt,
      authMethod: updateUser.authMethod,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user
// @route   Delete /api/users/:id
// @access  Private/Admin
const deletetUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update use
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get author
// @route   GET /api/users/:id/author
// @access  Public
const getAuthor = asyncHandler(async (req, res) => {
  const author = await User.findById(req.params.id)
    .select('-password -isAdmin -email, -__v')
    .populate({
      path: 'posts',
      select: '-body -__v',
      populate: [
        { path: 'user', select: 'name' },
        { path: 'category', select: ['title', 'translations'] },
      ],
    });
  res.status(200).json(author);
});

// @desc    verify email account send token
// @route   PUT /api/users/account-verification-email
// @access  Private
const verifyEmailAccount = asyncHandler(async (req, res) => {
  // find the login user
  const user = await User.findById(req.user);
  const { language } = req.body;
  // const { origin: originUrl } = req.headers;

  if (user) {
    // Check if user email exists
    if (user?.email) {
      // use the method from the model
      const token = await user.generateAccVerificationToken();
      // resave the user
      await user.save();
      // send the email
      const url = `${process.env.FRONTEND_URL}/account-verification/${token}`;
      const info = await new Email(user, language).accountVerify(url);
      if (!info) {
        res.status(401).json({
          status: 401,
          message: 'Sending the letter failed',
        });
      } else {
        res.status(200).json({
          status: 200,
          message: `Account verification email sent to your your email. Token expires in 10 minutes.`,
        });
      }
    } else {
      res.status(404);
      throw new Error('Email not found');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    verify email account
// @route   PUT /api/users/verify-account/:token
// @access  Public
// https://youtu.be/1KDV3VGAkYw?si=0jTpVxXsJlX6UFF4
const verifyEmailAcc = asyncHandler(async (req, res) => {
  // Get the token
  const { verifyToken } = req.params;

  // Find the user
  const userFound = await User.findOne({
    accountVerificationToken: verifyToken,
    accountVerificationExpires: { $gt: Date.now() },
  });
  if (userFound) {
    // Update the user field
    userFound.isEmailVerified = true;
    userFound.accountVerificationToken = null;
    userFound.accountVerificationExpires = null;
    await userFound.save();
    res.status(200).json({ message: 'Account successfully verified' });
  } else {
    res.status(404);
    throw new Error('Account verification token expires');
  }
});

// @desc    forgot password (sending email token)
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPasswordEmailToken = asyncHandler(async (req, res) => {
  // find the user email
  const { email, language } = req.body;
  // find the user
  const user = await User.findOne({ email });
  // const { origin: originUrl } = req.headers;

  if (user) {
    // Check if user email exists
    if (user?.authMethod === 'local') {
      // use the method from the model
      const token = await user.generatePasswordResetToken();
      // resave the user
      await user.save();
      // send the email
      const url = `${process.env.FRONTEND_URL}/reset-password/${token}`;
      const info = await new Email(user, language).sendPasswordReset(url);
      if (!info) {
        res.status(401).json({
          status: 401,
          message: 'Sending the letter failed',
        });
      } else {
        res.status(200).json({
          status: 200,
          message: `Password reset email sent ${email}. Token expires in 10 minutes.`,
        });
      }
    } else {
      res.status(404);
      throw new Error('Please login with your social account');
    }
  } else {
    res.status(404);
    throw new Error(`User with email ${email} is not found in our database`);
  }
});

// @desc    Reset password
// @route   PUT /api/users/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  // Get the token
  const { resetToken } = req.params;
  // Verify new password
  const { password } = req.body;

  // Find the user
  const userFound = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (userFound) {
    // Update the user field
    if (password) {
      userFound.password = password;
    }
    userFound.passwordResetToken = null;
    userFound.passwordResetExpires = null;
    await userFound.save();
    res
      .status(200)
      .json({ status: 200, message: 'Password successfully reset' });
  } else {
    res.status(404);
    throw new Error('Password reset token expires');
  }
});

export {
  checkAuthenticated,
  checkIsAdmin,
  checkIsPremium,
  authUser,
  googleAuthUser,
  googleAuthUserCallback,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deletetUser,
  updateUser,
  getAuthor,
  verifyEmailAccount,
  verifyEmailAcc,
  forgotPasswordEmailToken,
  resetPassword,
};
