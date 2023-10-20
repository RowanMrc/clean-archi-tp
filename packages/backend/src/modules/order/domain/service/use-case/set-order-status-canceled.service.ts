import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';

export class SetOrderAsCanceledService{
    constructor(private readonly OrderRepository: OrderRepositoryInterface) {}

    async confirmPaidOrder(id: string): Promise<Order> {
        const Order = await this.OrderRepository.findOrderById(id);

        if (!Order) {
            throw new Exception(ExceptionTypeEnum.NotFound, `Order with id ${id} not found`);
        }
        Order.cancel();

        return await this.saveOrder(Order);
    }

    private async saveOrder(OrderToPersist: DeepPartial<Order>): Promise<Order> {
        try {
            const Order = await this.OrderRepository.persist<Order>(OrderToPersist);

            return Order;
        } catch (error) {
            throw new Exception(ExceptionTypeEnum.InternalServerError, `Cannot persist Order : ${error.message}`);
        }
    }
}