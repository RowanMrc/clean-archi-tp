import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';

export class DeleteOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async deleteOrder(orderId : string): Promise<Order[]> {
    const orderDeleted = await this.orderRepository.deleteOrder(orderId);
    return orderDeleted;
  }
}