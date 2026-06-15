import express from 'express';
import { createContact, deleteContact, getContacts } from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createContact);
router.get('/', protectAdmin, getContacts);
router.delete('/:id', protectAdmin, deleteContact);

export default router;
