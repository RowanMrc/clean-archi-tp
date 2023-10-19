import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';

export default class OrderRepository extends Repository<Order> implements OrderRepositoryInterface{
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,
  ) {
    super(Order, datasource.createEntityManager());
  }
  async findOrders(): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    const ordersOrm = await query.getMany();
    return ordersOrm;

  }
  persist?<T>(entityToBePersisted: DeepPartial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
