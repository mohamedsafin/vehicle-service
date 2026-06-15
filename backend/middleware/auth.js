import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Admin authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_logixflow_key_1234');
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Admin account not found' });
    }

    req.admin = admin;
    return next();
  } catch (_error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired admin token' });
  }
};
