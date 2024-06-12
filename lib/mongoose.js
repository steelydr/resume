import mongoose from 'mongoose';

const dbconn = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default dbconn;