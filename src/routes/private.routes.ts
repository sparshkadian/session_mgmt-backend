import express from 'express';
import validateSession from '../middleware/validateSession.middleware';
import { getDashboardDetails } from '../controllers/dashboard.controller';
import { getProfileDetails } from '../controllers/profile.controller';
import {
  getSessionDetails,
  logout,
  logoutAllDevices,
} from '../controllers/logout.controller';

const router = express.Router();

router.use(validateSession);

// Dashboard Routes
router.get('/dashboard', getDashboardDetails);

// Profile Routes
router.get('/profile', getProfileDetails);

// Logout Routes
router.get('/logout', logout);
router.get('/logout-all', logoutAllDevices);
router.get('/sessions', getSessionDetails);

export default router;
