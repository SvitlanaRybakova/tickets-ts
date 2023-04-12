import {Publisher, Subjects, ITicketCreatedEvent} from '@sviry/common'

export class TicketCreatedPublisher extends Publisher <ITicketCreatedEvent>{
  subject: Subjects.TicketCreated = Subjects.TicketCreated
}