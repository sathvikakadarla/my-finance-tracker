import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionToDatabase = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGODB_URI);
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'test', 
      });
      console.log('✅ Connected to MongoDB Atlas');
    } else {
      console.log('✅ Already connected to MongoDB');
    }
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
  }
};

export default connectionToDatabase;
