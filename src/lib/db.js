import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://juniorflutter1:qazplm890@shaurma.joq53km.mongodb.net/?retryWrites=true&w=majority&appName=shaurma'
    );
    console.log('DB connected');
  } catch (error) {
    console.error('DB connection error', error);
  }
};