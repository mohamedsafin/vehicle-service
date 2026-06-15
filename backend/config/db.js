import dns from 'node:dns';
import mongoose from 'mongoose';

export let lastConnectionError = null;

const connectDB = async () => {
  try {
    lastConnectionError = null;
    const dnsServers = process.env.MONGO_DNS_SERVERS?.split(',')
      .map((server) => server.trim())
      .filter(Boolean);

    if (dnsServers?.length && !process.env.VERCEL) {
      dns.setServers(dnsServers);
    }

    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    lastConnectionError = error.message;
    console.error(`MongoDB connection failed: ${error.message}`);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
  }
};

export default connectDB;
