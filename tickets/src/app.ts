import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import CookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@sviry/common';


const PORT = 3000;

const app = express();

app.set('trust proxy', true);
app.use(json());

app.use(
  CookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);


app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app, PORT };
