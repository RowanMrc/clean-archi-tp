import Order from '@src/modules/order/infrastructure/db/entity/order.orm-entity';
import { RepositoryInterface } from '@src/modules/shared/domain/port/db/repository.interface';

export interface OrderRepositoryInterface extends RepositoryInterface {
  //searchMentoringSlots(searchFilters: SearchMentoringSlotsDtoInterface): Promise<Order[]>;
  findOrders(): Promise<Order[]>;
  //findMentoringSlotBySlug(slug: string): Promise<MentoringSlot>;
  //findMentoringSlotById(id: string): Promise<MentoringSlot>;
  //findMentoringSlotsBetweenDates(startDate: Date, endDate: Date): Promise<MentoringSlot[]>;
  //findMentoringSlotsByMissed(): Promise<MentoringSlot[]>;
}
