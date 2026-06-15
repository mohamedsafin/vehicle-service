import Contact from '../models/Contact.js';

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone = '', message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const contact = await Contact.create({ name, email, phone, message });

    return res.status(201).json({
      success: true,
      message: 'Message submitted successfully',
      data: { id: contact._id, createdAt: contact.createdAt },
    });
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

export const getContacts = async (_req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    return next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    return res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    return next(error);
  }
};
