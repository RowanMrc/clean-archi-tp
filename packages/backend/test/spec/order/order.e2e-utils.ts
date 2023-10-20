import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { OrderRepositoryDtoInterface } from '@src/modules/order/domain/model/dto/create-order.dto.interface';

import  DataSource  from '@src/modules/database/config/typeorm.config';

export const specifiedOrder = async (connection: typeof DataSource, orderBuild: OrderRepositoryDtoInterface) => {
    const orderRepository = connection.getRepository(Order);
    const order = orderRepository.create(orderBuild as DeepPartial<Order>);

    return orderRepository.save(order);
};