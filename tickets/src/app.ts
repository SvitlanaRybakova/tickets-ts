import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import CookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@sviry/common';

import { createTicketRouter } from './routes/new';

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

app.use(currentUser)
app.use(createTicketRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app, PORT };