import mongoose from 'mongoose';
import { app, PORT } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await natsWrapper.connect('tickets', 'random', 'http://nats-srv:4222');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Mongo DB');
  } catch (err) {
    console.error('Cannot connect to the db', err);
  }
};
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} !!!!`);
});

start();
