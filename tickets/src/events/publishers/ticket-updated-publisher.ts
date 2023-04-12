import { Publisher, Subjects, ITicketUpdateEvent } from '@sviry/common';

export class TicketUpdatedPublisher extends Publisher<ITicketUpdateEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
