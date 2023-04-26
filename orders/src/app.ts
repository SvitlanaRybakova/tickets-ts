import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import CookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@sviry/common';

import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';
import { deleteOrderRouter } from './routes/delete';

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

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);


app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app, PORT };
