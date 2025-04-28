require('dotenv').config();
import mongoose from 'mongoose';

const connectionToDatabase = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGODB_URI);

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
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
