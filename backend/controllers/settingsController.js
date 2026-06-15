import Settings from '../models/Settings.js';

// @desc    Get contact settings
// @route   GET /api/settings/contact
// @access  Public
export const getContactSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();

    // If no settings exist yet, create a default one
    if (!settings) {
      settings = await Settings.create({});
    }

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Update contact settings
// @route   PUT /api/settings/contact
// @access  Private/Admin
export const updateContactSettings = async (req, res, next) => {
  try {
    const {
      companyName,
      phone,
      email,
      address,
      workingHours,
      whatsappNumber,
      googleMapsEmbedUrl,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass,
    } = req.body;

    const updateData = {
      companyName,
      phone,
      email,
      address,
      workingHours,
      whatsappNumber,
      googleMapsEmbedUrl,
      smtpHost,
      smtpPort: smtpPort ? Number(smtpPort) : undefined,
      smtpUser,
      smtpPass,
    };

    const settings = await Settings.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Contact settings updated successfully',
      data: settings,
    });
  } catch (error) {
    return next(error);
  }
};
