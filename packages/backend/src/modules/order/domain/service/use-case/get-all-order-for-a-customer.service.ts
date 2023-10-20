import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';

export class GetOrdersForCustomerService {
    constructor(private readonly orderRepository: OrderRepositoryInterface) {}

    async getAllOrdersForCustomer(customerId : string): Promise<Order[]> {
        const orders = await this.orderRepository.findOrdersForCustomer(customerId);
        return orders;
    }
}
