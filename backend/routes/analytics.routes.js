import express from 'express';
import {
  getDashboardStats,
  getVolunteerAnalytics,
  getMemberAnalytics
} from '../controllers/analytics.controller.js';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All analytics routes require admin authentication
router.use(authenticateToken);
router.use(authorizeRole('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/volunteers', getVolunteerAnalytics);
router.get('/members', getMemberAnalytics);

export default router;
