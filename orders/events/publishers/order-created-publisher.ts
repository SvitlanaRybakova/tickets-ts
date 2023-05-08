import { Publisher, OrderCreatedEvent, Subjects } from "@sviry/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
