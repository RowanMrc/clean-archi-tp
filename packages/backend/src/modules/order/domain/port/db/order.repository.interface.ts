import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { RepositoryInterface } from '@src/modules/shared/domain/port/db/repository.interface';

export interface OrderRepositoryInterface extends RepositoryInterface {
  findOrders(): Promise<Order[]>;
  findOrdersBeforeDate(date: Date): Promise<Order[]>;
  findOrdersAfterDate(date: Date): Promise<Order[]>;
  findOrdersForCustomer(customerId: string): Promise<Order[]>;
  setOrderAsPaid(orderId: string): Promise<Order[]>;
  setOrderAsCancelled(orderId: string): Promise<Order[]>;
  deleteOrder(orderId: string): Promise<Order[]>;
  findOrderById(id: string): Promise<Order>;
  //createOrder(): Promise<Order>;
}