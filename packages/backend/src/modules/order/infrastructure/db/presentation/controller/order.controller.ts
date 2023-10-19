import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { GetOrdersService } from '@src/modules/order/domain/service/use-case/get-all-order.service';


@Controller('/orders')
export default class OrderController {
    constructor(
        private readonly getAllOrdersService: GetOrdersService,
      ) {}

      @Get('/all-orders')
      async getMissedMentoringSlots(): Promise<Order[]> {
        return await this.getAllOrdersService.getAllOrders();
      }
}
