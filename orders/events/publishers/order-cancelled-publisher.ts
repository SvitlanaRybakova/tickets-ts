import { Subjects, Publisher, OrderCancelledEvent } from "@sviry/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
