import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';

export class GetOrdersBeforedateService {
    constructor(private readonly orderRepository: OrderRepositoryInterface) {}

    async getAllOrdersBeforedate(date: Date): Promise<Order[]> {
        const orders = await this.orderRepository.findOrdersBeforeDate(date);
        return orders;
    }
}
