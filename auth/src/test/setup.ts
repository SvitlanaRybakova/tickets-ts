import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any;
// create, get and connect a memory server before running each test
beforeAll(async () => {
  // create the memory server
  mongo = await MongoMemoryServer.create();

  // get the server's url
  const mongoUri = mongo.getUri();

  //connect to it
  await mongoose.connect(mongoUri, {});
});

// delete collections after each test's executing
beforeEach(async () => {
  // find existing collections
  const collections = await mongoose.connection.db.collections();

  // loop over them and delete datd in each collection
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// disconnect MongoDB after executing all! tests
afterAll(async () => {
  if (mongo) await mongo.stop();
  await mongoose.connection.close();
});
