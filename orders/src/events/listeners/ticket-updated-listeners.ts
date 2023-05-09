import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ITicketUpdateEvent } from '@sviry/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<ITicketUpdateEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ITicketUpdateEvent['data'], msg: Message) {
    const { id, title, price } = data;
    
    const ticket = Ticket.findById(id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
