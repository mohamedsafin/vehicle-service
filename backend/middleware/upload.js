import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';

const uploadDir = process.env.VERCEL
  ? path.join('/tmp', 'uploads', 'fleet')
  : path.join(process.cwd(), 'uploads', 'fleet');

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image uploads are allowed'));
  }
};

export const uploadFleetImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 },
});
