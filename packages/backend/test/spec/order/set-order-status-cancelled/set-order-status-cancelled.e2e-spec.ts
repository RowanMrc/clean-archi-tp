import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { randomUUID } from 'crypto';
import { orderBuilder } from '../order.e2e-builder';
import { specifiedOrder } from '../order.e2e-utils';
import { whenUpdatingOrderStatus } from '../update-order.e2e-action';
import { OrderStatusEnum } from '@src/modules/order/domain/model/const/order-status.enum';

describe('Set Order status cancelled', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;
    let order: Order;
    let orderId = randomUUID();
  
    beforeAll(async () => {
      app = await givenExistingApp(app);
      connection = await givenExistingDbConnection();
      const orderBuild = orderBuilder().build();
      order = await specifiedOrder(connection, orderBuild);
    });
  
  
    it('should return 404 if the order is not found ', async () => {
      const orderResponse = await request(app.getHttpServer()).patch(`/api/orders/${orderId}/cancel-order/`);
      console.log(orderResponse.error);
      expect(orderResponse.status).toBe(404);
    });
  
    it('should change the order status to canceled ', async () => {
      const {updateOrderResponse} = await whenUpdatingOrderStatus(app,order,'cancel-order');
      expect(updateOrderResponse.status).toBe(200);
      expect(updateOrderResponse.body.id).toEqual(order.id);
      expect(updateOrderResponse.body.status).toEqual(OrderStatusEnum.Canceled);
    });
  
    afterAll(async () => {
      await cleanApp(app, connection);
    });
});
