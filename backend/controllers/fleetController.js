import Fleet from '../models/Fleet.js';

const getImageUrl = (req) => (req.file ? `/uploads/fleet/${req.file.filename}` : req.body.imageUrl || '');

export const getFleet = async (_req, res, next) => {
  try {
    const fleet = await Fleet.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: fleet });
  } catch (error) {
    return next(error);
  }
};

export const createFleetVehicle = async (req, res, next) => {
  try {
    const vehicle = await Fleet.create({
      vehicleName: req.body.vehicleName,
      vehicleType: req.body.vehicleType,
      capacity: req.body.capacity,
      availability: req.body.availability || 'Available',
      imageUrl: getImageUrl(req),
    });

    return res.status(201).json({ success: true, data: vehicle, message: 'Vehicle added' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map((item) => item.message).join(', '),
      });
    }

    return next(error);
  }
};

export const updateFleetVehicle = async (req, res, next) => {
  try {
    const payload = {
      vehicleName: req.body.vehicleName,
      vehicleType: req.body.vehicleType,
      capacity: req.body.capacity,
      availability: req.body.availability,
    };

    const nextImageUrl = getImageUrl(req);
    if (nextImageUrl) payload.imageUrl = nextImageUrl;

    const vehicle = await Fleet.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    return res.status(200).json({ success: true, data: vehicle, message: 'Vehicle updated' });
  } catch (error) {
    return next(error);
  }
};

export const deleteFleetVehicle = async (req, res, next) => {
  try {
    const vehicle = await Fleet.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    return res.status(200).json({ success: true, message: 'Vehicle deleted' });
  } catch (error) {
    return next(error);
  }
};
