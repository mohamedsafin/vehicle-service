import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Haulier & Service Admin';

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env before running this script.');
    process.exit(1);
  }

  const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
  const hashedPassword = await bcrypt.hash(password, 12);

  if (existingAdmin) {
    existingAdmin.name = name;
    existingAdmin.password = hashedPassword;
    await existingAdmin.save();
    console.log(`Updated admin: ${email}`);
  } else {
    await Admin.create({ name, email, password: hashedPassword });
    console.log(`Created admin: ${email}`);
  }

  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
