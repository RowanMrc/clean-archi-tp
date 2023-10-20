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

  async findOrdersBeforeDate(date: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.createdAt <= :date', {date});
    const ordersOrm = query.getMany();
    return ordersOrm;
  }

  async findOrdersAfterDate(date: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.createdAt >= :date', {date});
    const ordersOrm = query.getMany();
    return ordersOrm;
  }

  async findOrdersForCustomer(customerId: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.customerId = :customerId', {customerId});
    const ordersOrm = query.getMany();
    return ordersOrm;
  }

  async findOrderById(id: string): Promise<Order> {
    const query = this.createQueryBuilder('order');

    query.where('order.id = :id', { id });

    const order = await query.getOne();

    console.log('order in repo ', order)

    return order;
  }

  async setOrderAsPaid(orderId: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.id = :orderId', {orderId});
    query.update({status: 'paid'});
    const ordersOrm = await query.execute();
    return ordersOrm;
  }

  async setOrderAsCancelled(orderId: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.id = :orderId', {orderId});
    query.update({status: 'cancelled'});
    const ordersOrm = await query.execute();
    return ordersOrm;
   }

  async deleteOrder(orderId: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    query.where('order.id = :orderId', {orderId});
    query.delete();
    const ordersOrm = await query.execute();
    return ordersOrm;
  }
  
  /*async createOrder(customer: string, products: string[] ): Promise<Order> {
    const order = this.create({
      customer,
      products,
      status: OrderStatusEnum.InCart
   });
     return this.save(order);
   }*/

   async persist<Order>(entityToBePersisted: DeepPartial<Order>): Promise<Order> {
    const orderToBePersisted = this.create(entityToBePersisted);
    const orderPersisted = await this.save(orderToBePersisted);

    return (await this.findOrderById(orderPersisted.id))as unknown as Order;
}

}
