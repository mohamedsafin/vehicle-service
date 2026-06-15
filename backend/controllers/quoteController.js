import Quote from '../models/Quote.js';
import Settings from '../models/Settings.js';
import { sendQuoteConfirmationEmail } from '../utils/emailService.js';

const requiredFields = ['name', 'phone', 'email', 'pickupLocation', 'dropLocation', 'vehicleType', 'message'];
const quoteStatuses = ['Pending', 'Contacted', 'Quoted', 'Confirmed', 'Completed'];

export const createQuote = async (req, res, next) => {
  try {
    const missingFields = requiredFields.filter((field) => !String(req.body[field] || '').trim());

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    const quote = await Quote.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      pickupLocation: req.body.pickupLocation,
      dropLocation: req.body.dropLocation,
      vehicleType: req.body.vehicleType,
      message: req.body.message,
    });

    // Send confirmation email asynchronously without blocking the client response
    try {
      const settings = await Settings.findOne() || {};
      sendQuoteConfirmationEmail(quote.email, quote, settings).catch((err) => {
        console.error('Async quote confirmation email failed:', err.message);
      });
    } catch (emailErr) {
      console.error('Failed to initialize quote confirmation email:', emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Quote submitted successfully',
      data: {
        id: quote._id,
        status: quote.status,
        createdAt: quote.createdAt,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors)
        .map((validationError) => validationError.message)
        .join(', ');

      return res.status(400).json({
        success: false,
        message,
      });
    }

    return next(error);
  }
};

export const getQuotes = async (req, res, next) => {
  try {
    const { search = '', status = '', page = 1, limit = 10 } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search.trim()) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { pickupLocation: { $regex: search, $options: 'i' } },
        { dropLocation: { $regex: search, $options: 'i' } },
        { vehicleType: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 50);
    const skip = (pageNumber - 1) * pageSize;

    const [quotes, total] = await Promise.all([
      Quote.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize),
      Quote.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      data: quotes,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize) || 1,
        limit: pageSize,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getQuoteById = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }

    return res.status(200).json({ success: true, data: quote });
  } catch (error) {
    return next(error);
  }
};

export const updateQuoteStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!quoteStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid quote status' });
    }

    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }

    return res.status(200).json({ success: true, data: quote, message: 'Quote status updated' });
  } catch (error) {
    return next(error);
  }
};

export const deleteQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }

    return res.status(200).json({ success: true, message: 'Quote request deleted' });
  } catch (error) {
    return next(error);
  }
};
