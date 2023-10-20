import { NestExpressApplication } from "@nestjs/platform-express";
import Order from "@src/modules/order/infrastructure/db/entity/order.orm-entity";
import request from 'supertest'

export const whenUpdatingOrderStatus = async(
    app: NestExpressApplication,
    order: Order,
    status: string,
): Promise<{ 
    updateOrderResponse : request.Response;
}> => {
    const updateOrderResponse = await request(app.getHttpServer())
    .patch(`/api/orders/${order.id}/${status}`)
    return {
        updateOrderResponse,
    };
};
