import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';

export class GetOrdersAfterdateService {
    constructor(private readonly orderRepository: OrderRepositoryInterface) {}

    async getAllOrdersAfterdate(date: Date): Promise<Order[]> {
        const orders = await this.orderRepository.findOrdersAfterDate(date);
        return orders;
    }
}
