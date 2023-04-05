import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if the tikcet is not found', async () => {
   await request(app).get('/api/tickets/randomid').send().expect(404);
});

it('returns the ticket if the tikcet is found', async () => {
  const title = 'random title';
  const price = 10;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});