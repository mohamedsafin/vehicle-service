import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const createToken = (adminId) =>
  jwt.sign({ id: adminId }, process.env.JWT_SECRET || 'super_secret_logixflow_key_1234', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    return res.status(200).json({
      success: true,
      token: createToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getAdminProfile = async (req, res) => {
  res.status(200).json({ success: true, admin: req.admin });
};
