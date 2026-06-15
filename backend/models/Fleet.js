import mongoose from 'mongoose';

const fleetSchema = new mongoose.Schema(
  {
    vehicleName: {
      type: String,
      required: [true, 'Vehicle name is required'],
      trim: true,
      maxlength: 120,
    },
    vehicleType: {
      type: String,
      required: [true, 'Vehicle type is required'],
      trim: true,
      maxlength: 80,
    },
    capacity: {
      type: String,
      required: [true, 'Capacity is required'],
      trim: true,
      maxlength: 80,
    },
    availability: {
      type: String,
      enum: ['Available', 'In Transit', 'Maintenance', 'Unavailable'],
      default: 'Available',
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Fleet = mongoose.model('Fleet', fleetSchema);

export default Fleet;
