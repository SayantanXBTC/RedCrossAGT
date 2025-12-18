import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      logger.error('MONGODB_URI is not defined in environment variables');
      process.exit(1);
    }

    // Simplified options for Windows SSL compatibility
    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(mongoURI, options);

    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
    logger.info(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected successfully');
    });

  } catch (error) {
    logger.error(`❌ MongoDB Connection Error: ${error.message}`);
    logger.error('Error details:', error.name);
    
    // Provide helpful error message
    if (error.message.includes('SSL') || error.message.includes('TLS')) {
      logger.error('SSL/TLS Error detected. This may be due to:');
      logger.error('1. Network/firewall restrictions');
      logger.error('2. MongoDB Atlas IP whitelist settings');
      logger.error('3. Windows SSL certificate issues');
      logger.error('');
      logger.error('Solutions:');
      logger.error('- Check MongoDB Atlas Network Access settings');
      logger.error('- Ensure IP address is whitelisted (or use 0.0.0.0/0 for testing)');
      logger.error('- Try updating Node.js to the latest LTS version');
    }
    
    // Don't exit immediately, allow retry
    logger.info('Retrying connection in 10 seconds...');
    setTimeout(connectDB, 10000);
  }
};

export default connectDB;
