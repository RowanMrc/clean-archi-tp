import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import { orderBuilder } from '../order.e2e-builder';


describe('Create Order', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should create an order',async () => {
        const order = orderBuilder().build();
        const orderResponse = await request(app.getHttpServer()).post('/api/orders/create-order/').send(order);
        console.log(orderResponse.error);
        expect(orderResponse.status).toBe(201);
        console.log(orderResponse.body);
        expect(orderResponse.body.customer).toEqual(order.customer)
    });



    afterAll(async () => {
        await cleanApp(app, connection);
    });
})