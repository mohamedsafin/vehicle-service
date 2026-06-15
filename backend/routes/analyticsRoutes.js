import express from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protectAdmin, getAnalytics);

export default router;
