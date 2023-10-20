import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';
import { OrderRepositoryDtoInterface } from '@src/modules/order/domain/model/dto/create-order.dto.interface';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';
import Order, { } from '@src/modules/order/infrastructure/db/entity/order.orm-entity';

export class CreateOrderService {
    constructor(
        private readonly orderRepo: OrderRepositoryInterface,
    ) { }

    async createOrder(createOrder: OrderRepositoryDtoInterface): Promise<Order> {
        try {
            const order = await this.orderRepo.persist<Order>(createOrder);
            return order;
        } catch (error) {
            throw new Exception(ExceptionTypeEnum.InternalServerError, 'Cannot persist order: ${ error.message }');
        }
    }
}
