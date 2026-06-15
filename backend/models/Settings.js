import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
      default: 'Haulier & Service',
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      default: '+91 98765 43210',
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      default: 'operations@haulierandservice.com',
    },
    address: {
      type: String,
      required: true,
      trim: true,
      default: 'Ramanathapuram, Tamil Nadu, India',
    },
    workingHours: {
      type: String,
      required: true,
      trim: true,
      default: 'Monday - Saturday 9:00 AM - 7:00 PM',
    },
    whatsappNumber: {
      type: String,
      required: true,
      trim: true,
      default: '+919876543210',
    },
    googleMapsEmbedUrl: {
      type: String,
      required: true,
      trim: true,
      default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125766.19658607147!2d78.75168019313936!3d9.36870024921609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b01b3de33f6df23%3A0x8e83344cb8dcff!2sRamanathapuram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    },
    smtpHost: {
      type: String,
      trim: true,
      default: '',
    },
    smtpPort: {
      type: Number,
      default: 587,
    },
    smtpUser: {
      type: String,
      trim: true,
      default: '',
    },
    smtpPass: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
