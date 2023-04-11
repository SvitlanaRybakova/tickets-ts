import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { ITicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<ITicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-servise';

  onMessage(data: ITicketCreatedEvent['data'], msg: Message) {
    console.log('Event data', data);

    msg.ack();
  }
}
