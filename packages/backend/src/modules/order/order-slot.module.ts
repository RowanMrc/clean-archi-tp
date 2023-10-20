import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import OrderRepository from '@src/modules/order/infrastructure/db/repository/order.repository';
import OrderController from '@src/modules/order/infrastructure/db/presentation/controller/order.controller';
import { GetOrdersService } from './domain/service/use-case/get-all-order.service';
import { OrderRepositoryInterface } from './domain/port/db/order.repository.interface';
import { GetOrdersBeforedateService } from './domain/service/use-case/get-all-order-before-date.service';
import { GetOrdersAfterdateService } from './domain/service/use-case/get-all-order-after-date.service';
import { GetOrdersForCustomerService } from './domain/service/use-case/get-all-order-for-a-customer.service';
import { SetOrderAsPaidService } from './domain/service/use-case/set-order-status-paid.service';
import { SetOrderAsCanceledService } from './domain/service/use-case/set-order-status-canceled.service';
import { DeleteOrderService } from './domain/service/use-case/delete-order.service';
import { CreateOrderService } from './domain/service/use-case/create-order.service';

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
    },{
      provide: GetOrdersBeforedateService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersBeforedateService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    },{
      provide: GetOrdersAfterdateService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersAfterdateService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    },{
      provide: GetOrdersForCustomerService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersForCustomerService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    },{
      provide: SetOrderAsPaidService ,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetOrderAsPaidService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    },{
      provide: SetOrderAsCanceledService ,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetOrderAsCanceledService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    },{
      provide: DeleteOrderService ,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new DeleteOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    },{
      provide: CreateOrderService ,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    },],
})
export default class OrderModule { }
