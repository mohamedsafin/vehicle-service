import express from 'express';
import { getContactSettings, updateContactSettings } from '../controllers/settingsController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/contact', getContactSettings);
router.put('/contact', protectAdmin, updateContactSettings);

export default router;
