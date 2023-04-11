import { Subjects } from './subjects';

export interface ITicketUpdateEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
