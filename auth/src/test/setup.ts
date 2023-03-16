import { response } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

// declare global {
//   var signup: () => Promise<string[]>;
// }
declare global {
  namespace NodeJS {
    export interface Global {
      signup(): Promise<string[]>;
    }
  }
}

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

global.signup = async () => {
  const email = 'test@test.com';
  const password = 'password';
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;
};
