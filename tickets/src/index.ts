import mongoose from 'mongoose';
import { app, PORT } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to Mongo DB');
  } catch (err) {
    console.error('Cannot connect to the db', err);
  }
};
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} !!!!`);
});

start();
