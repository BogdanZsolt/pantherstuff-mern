import express from 'express';
const router = express.Router();
import {
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
  getUserCoursesList,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/auth', authUser);
router.get('/auth/google', googleAuthUser);
router.get('/auth/google/callback', googleAuthUserCallback);
router.get('/checkauthenticated', checkAuthenticated);
router.get('/checkadmin', checkIsAdmin);
router.get('/checkpremium', checkIsPremium);
router.get('/mycourses', protect, getUserCoursesList);
router.put('/account-verification-email', protect, verifyEmailAccount);
router.put('/verify-account/:verifyToken', protect, verifyEmailAcc);
router.post('/forgot-password', forgotPasswordEmailToken);
router.post('/password-reset/:resetToken', resetPassword);
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', protect, logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deletetUser);
router.route('/:id/author').get(getAuthor);

export default router;
