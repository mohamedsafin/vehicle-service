import express from 'express';
import {
  createQuote,
  deleteQuote,
  getQuoteById,
  getQuotes,
  updateQuoteStatus,
} from '../controllers/quoteController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createQuote);
router.get('/', protectAdmin, getQuotes);
router.get('/:id', protectAdmin, getQuoteById);
router.put('/:id/status', protectAdmin, updateQuoteStatus);
router.delete('/:id', protectAdmin, deleteQuote);

export default router;
