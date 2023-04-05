import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'title 1',
      price: 20,
    })
    .expect(404);
});

it('returns a 401 if the user is not authentificated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'title 1',
      price: 20,
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  // create a ticket with random id
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'ticket 1',
      price: 10,
    });
  const ticketId = response.body.id;

  // try to update someone else ticket
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set('Cookie', global.signin())
    .send({
      title: 'not mine ticket title',
      price: 10,
    })
    .expect(401);

  // check the original ticket is unchanged 
  const originalTicketResponse = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .send();

  expect(originalTicketResponse.body.title).toEqual('ticket 1');
  expect(originalTicketResponse.body.price).toEqual(10);
});

it('returns a 400 if the usesr provides an invalid title or price', async () => {
  const cookie = global.signin();

  //create a ticket
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'title 1',
      price: 20,
    });

  const ticketId = response.body.id;

  // try to update ticket with invalid title
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  // try to update ticket with invalid price
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set('Cookie', cookie)
    .send({
      title: 'ticket 1',
      price: -10,
    })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const cookie = global.signin();

  //create a ticket
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'title 1',
      price: 20,
    });

  const ticketId = response.body.id;

  // update ticket
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set('Cookie', cookie)
    .send({
      title: 'a new title',
      price: 100000,
    })
    .expect(200);

  // check updated ticket
  const updatedTicketResponse = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .send();

  expect(updatedTicketResponse.body.title).toEqual('a new title');
  expect(updatedTicketResponse.body.price).toEqual(100000);
});
