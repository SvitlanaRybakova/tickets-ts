import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    export interface Global {
      signin(): string[];
    }
  }
}

jest.mock('../nats-wrapper');

let mongo: any;
// create, get and connect a memory server before running each test
beforeAll(async () => {
  process.env.JWT_KEY = 'random_key';
  // create the memory server
  mongo = await MongoMemoryServer.create();

  // get the server's url
  const mongoUri = mongo.getUri();

  //connect to it
  await mongoose.connect(mongoUri, {});
});

// delete collections after each test's executing
beforeEach(async () => {
  jest.clearAllMocks();
  
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

global.signin = () => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'fakeid@fakeid.com',
  };
  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // Buid session Object. { jwt: MY_JWT}
  const session = { jwt: token };
  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  // Take JSON and decode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
