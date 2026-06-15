import Contact from '../models/Contact.js';
import Fleet from '../models/Fleet.js';
import Quote from '../models/Quote.js';

export const getAnalytics = async (_req, res, next) => {
  try {
    const [quotes, totalMessages, totalFleet] = await Promise.all([
      Quote.find().lean(),
      Contact.countDocuments(),
      Fleet.countDocuments(),
    ]);

    const statusCounts = quotes.reduce((acc, quote) => {
      acc[quote.status] = (acc[quote.status] || 0) + 1;
      return acc;
    }, {});

    const monthlyQuotes = quotes.reduce((acc, quote) => {
      const month = new Date(quote.createdAt).toLocaleString('en', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const routeCounts = quotes.reduce((acc, quote) => {
      const route = `${quote.pickupLocation} to ${quote.dropLocation}`;
      acc[route] = (acc[route] || 0) + 1;
      return acc;
    }, {});

    const vehicleCounts = quotes.reduce((acc, quote) => {
      acc[quote.vehicleType] = (acc[quote.vehicleType] || 0) + 1;
      return acc;
    }, {});

    const topEntry = (counts) => Object.entries(counts).sort((a, b) => b[1] - a[1])[0] || ['No data', 0];
    const converted = (statusCounts.Confirmed || 0) + (statusCounts.Completed || 0);

    return res.status(200).json({
      success: true,
      data: {
        totalQuotes: quotes.length,
        pendingQuotes: statusCounts.Pending || 0,
        contactedQuotes: statusCounts.Contacted || 0,
        convertedQuotes: converted,
        totalMessages,
        totalFleet,
        monthlyQuotes: Object.entries(monthlyQuotes).map(([month, count]) => ({ month, count })),
        mostRequestedRoute: topEntry(routeCounts),
        mostRequestedVehicleType: topEntry(vehicleCounts),
        conversionRate: quotes.length ? Math.round((converted / quotes.length) * 100) : 0,
      },
    });
  } catch (error) {
    return next(error);
  }
};
