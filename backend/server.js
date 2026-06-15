import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';
import connectDB from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import fleetRoutes from './routes/fleetRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
const allowedOrigins = clientUrl.split(',').map((url) => url.trim().replace(/\/$/, ''));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      
      const cleanOrigin = origin.replace(/\/$/, '');
      
      // Always allow localhost/127.0.0.1 for local development
      if (/^http:\/\/localhost(:\d+)?$/.test(cleanOrigin) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(cleanOrigin)) {
        return callback(null, true);
      }
      
      // Always allow any vercel.app subdomain to make hosting seamless
      if (/\.vercel\.app$/.test(cleanOrigin)) {
        return callback(null, true);
      }
      
      // Check allowed list
      const isAllowed = allowedOrigins.some(allowed => {
        const cleanAllowed = allowed.replace(/\/$/, '');
        return cleanAllowed === '*' || cleanAllowed === cleanOrigin;
      });
      
      if (isAllowed) {
        return callback(null, true);
      }
      
      return callback(null, false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json({ limit: '100kb' }));
const uploadsPath = process.env.VERCEL
  ? path.join('/tmp', 'uploads')
  : path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.get('/api/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Quote API is running' });
});

app.use('/api/quotes', quoteRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/fleet', fleetRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: 'Server error while processing quote request',
  });
});

// App listening port configuration updated
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
