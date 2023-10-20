import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';

export class SetOrderAsCanceledService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async setOrderStatusCanceled(orderId : string): Promise<Order[]> {
    const orderCanceled= await this.orderRepository.setOrderAsCancelled(orderId);
    return orderCanceled;
  }
}