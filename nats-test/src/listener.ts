import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import {TicketCreatedListener} from './events/ticket-created-listener'

console.clear();

//create a client
const stan = nats.connect('tickets', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

//execites after the listener connecting to NATS
stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());




