import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import OrderRepository from '@src/modules/order/infrastructure/db/repository/order.repository';
import OrderController from '@src/modules/order/infrastructure/db/presentation/controller/order.controller';
import { GetOrdersService } from './domain/service/use-case/get-all-order.service';
import { OrderRepositoryInterface } from './domain/port/db/order.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderRepository,
    {
          provide: 'OrderRepositoryInterface',
          useClass: OrderRepository,
        },
    {
          provide: GetOrdersService,
          useFactory: (orderRepository: OrderRepositoryInterface) => {
            return new GetOrdersService(orderRepository);
          },
          inject: ['OrderRepositoryInterface'],
        },],
})
export default class OrderModule {}
