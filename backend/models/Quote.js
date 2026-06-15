import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'],
    },
    pickupLocation: {
      type: String,
      required: [true, 'Pickup location is required'],
      trim: true,
      maxlength: 200,
    },
    dropLocation: {
      type: String,
      required: [true, 'Drop location is required'],
      trim: true,
      maxlength: 200,
    },
    vehicleType: {
      type: String,
      required: [true, 'Vehicle type is required'],
      trim: true,
      maxlength: 80,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Quoted', 'Confirmed', 'Completed'],
      default: 'Pending',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;
