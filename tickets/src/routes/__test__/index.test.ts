import request from 'supertest'
import {app} from '../../app'

const createTickets = (title: string, price: number) => {
  return request(app)
  .post('/api/tickets')
  .set("Cookie", global.signin())
  .send({
    title, price
  })
}
it('can fetch a list of tickets', async() => {
  await createTickets("ticket 1", 20)
  await createTickets("ticket 2", 10)
  await createTickets("ticket 3", 40)

  const response = await request(app)
  .get('/api/tickets')
  .send()
  .expect(200)

  expect(response.body.length).toEqual(3)
  expect(response.body[0].title).toEqual('ticket 1')
  expect(response.body[1].title).toEqual('ticket 2')
  expect(response.body[2].title).toEqual('ticket 3')
})