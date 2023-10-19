import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';

export class GetOrdersService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.findOrders();
    return orders;
  }
}
