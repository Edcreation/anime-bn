import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions).catch((error) => {
      console.log(error)
    });
    console.log('Database connected!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export default connectDB;
