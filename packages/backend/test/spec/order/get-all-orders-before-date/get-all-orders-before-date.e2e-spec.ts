import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';
import { orderBuilder } from '../order.e2e-builder';
import { specifiedOrder } from '../order.e2e-utils';

describe('Get Orders before specified date', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  // beforeAll est fonction mise à dispo par Vitest (framework de test)
  // qui sera executée avant tous les tests
  // permet de créer l'application et la connection à la base de données
  // et les stocker dans des variables globales (dispos pour tous les tests de ce fichier)
  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
    
  });

  it('should return all orders before the specified date ', async () => {
    // envoyer une requête HTTP GET sur l'url /api/mentoring-slots/was-missed
    // récupèrer la réponse HTTP

    const getAllOrdersResponse = await request(app.getHttpServer()).get('/api/orders/all-orders-before-date/23-09-2023');
    expect(getAllOrdersResponse.status).toBe(200);
    expect(getAllOrdersResponse.body).toEqual([]);

    it('should return all orders created before the specified date',async () => {
      const orderBuild = orderBuilder().build();
      const order = await specifiedOrder(connection, orderBuild);
      const orderResponse = await request(app.getHttpServer()).get('/api/orders/created-after/23-09-2023');
      expect(orderResponse.status).toBe(200);
      expect(orderResponse.body.length).toEqual(1);
      expect(orderResponse.body[0].id).toEqual(order.id);
  });

  });


  // s'execute après tous les tests de ce fichier
  // permet de supprimer les données de la DB et de fermer la connection
  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
