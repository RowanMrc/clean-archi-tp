import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { GetOrdersService } from '@src/modules/order/domain/service/use-case/get-all-order.service';
import { GetOrdersBeforedateService } from '@src/modules/order/domain/service/use-case/get-all-order-before-date.service';
import { GetOrdersAfterdateService } from '@src/modules/order/domain/service/use-case/get-all-order-after-date.service';
import { GetOrdersForCustomerService } from '@src/modules/order/domain/service/use-case/get-all-order-for-a-customer.service';
import { SetOrderAsPaidService } from '@src/modules/order/domain/service/use-case/set-order-status-paid.service';
import { SetOrderAsCanceledService } from '@src/modules/order/domain/service/use-case/set-order-status-canceled.service';
import { DeleteOrderService } from '@src/modules/order/domain/service/use-case/delete-order.service';
import { CreateOrderService } from '@src/modules/order/domain/service/use-case/create-order.service';
import { CreateOrderDto} from '@src/modules/order/domain/model/dto/create-order.dto';
import { OrderPresenter } from '@src/modules/order/presentation/presenter/order.presenter';



@Controller('/orders')  
export default class OrderController {
    private readonly MIN_CHAR_LENGTH = 5;
    constructor(
        private readonly getAllOrdersService: GetOrdersService,
        private readonly getAllOrdersBeforeDateService: GetOrdersBeforedateService,
        private readonly getAllOrdersAfterDateService: GetOrdersAfterdateService,
        private readonly getAllOrdersForCustomerService: GetOrdersForCustomerService,
        private readonly setOrderAsPaidService: SetOrderAsPaidService,
        private readonly setOrderAsCancelledService: SetOrderAsCanceledService,
        private readonly DeleteOrderService: DeleteOrderService,
        private readonly CreateOrderService: CreateOrderService,
      ) {}

      @Get('/all-orders')
      async getAllOrders(): Promise<Order[]> {
        return await this.getAllOrdersService.getAllOrders();
      }

      @Get('/all-orders-before-date/:date')
      async getAllOrdersBeforeDate(): Promise<Order[]> {
        return await this.getAllOrdersBeforeDateService.getAllOrdersBeforedate(new Date());
      }

      @Get('/all-orders-after-date/:date')
      async getAllOrdersAfterDate(): Promise<Order[]> {
        return await this.getAllOrdersAfterDateService.getAllOrdersAfterdate(new Date());
      }

      @Get('/:customerId/all-orders-for-customer')
      async getAllOrdersForCustomer(@Param('customerId') customerId: string): Promise<Order[]> {
        if (customerId.length < this.MIN_CHAR_LENGTH || /\d/.test(customerId)) {
            if (customerId.length < this.MIN_CHAR_LENGTH) {
              throw new Error('Error on username length, it must be 5 char minimum !');
            } else {
              throw new Error("Error on username composition, it can't have digit !");
            }
      
          }
        return await this.getAllOrdersForCustomerService.getAllOrdersForCustomer(customerId);
      }

      @Patch('/:orderId/pay-order/')
      async setOrderAsPaid(@Param('orderId') orderId: string): Promise<OrderPresenter> {
        const order = await this.setOrderAsPaidService.confirmPaidOrder(orderId);

        return new OrderPresenter(order);
      }

      @Patch('/:orderId/cancel-order/')
      async setOrderAsCancelled(@Param('orderId') orderId: string): Promise<OrderPresenter> {
        const order =  await this.setOrderAsCancelledService.confirmPaidOrder(orderId);

        return new OrderPresenter(order);
      }

      @Delete('/:orderId/delete-order/')
      async deleteOrder(@Param('orderId') orderId: string): Promise<Order[]> {
        return await this.DeleteOrderService.deleteOrder(orderId);
      }

      @Post('/create-order/')
      async createOrder(@Body() orderDto: CreateOrderDto): Promise<OrderPresenter> {
        const order = await this.CreateOrderService.createOrder(orderDto);
        return new OrderPresenter(order);
    }
}
