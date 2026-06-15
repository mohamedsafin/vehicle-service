import express from 'express';
import {
  createFleetVehicle,
  deleteFleetVehicle,
  getFleet,
  updateFleetVehicle,
} from '../controllers/fleetController.js';
import { protectAdmin } from '../middleware/auth.js';
import { uploadFleetImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getFleet);
router.post('/', protectAdmin, uploadFleetImage.single('image'), createFleetVehicle);
router.put('/:id', protectAdmin, uploadFleetImage.single('image'), updateFleetVehicle);
router.delete('/:id', protectAdmin, deleteFleetVehicle);

export default router;
