import { OrderRepositoryDtoInterface } from '@src/modules/order/domain/model/dto/create-order.dto.interface';

const CreateOrderDtoInterface: OrderRepositoryDtoInterface = {
  customer: "Zambrano",
  products: ["Porsche", "Ferrari"],
};

export const orderBuilder = (orderCreateData: OrderRepositoryDtoInterface = CreateOrderDtoInterface) => {
  return {
    withCustomer: (customer: OrderRepositoryDtoInterface['customer']) => {
      return orderBuilder({
        ...orderCreateData,
        customer,
      });
    },

    withProducts: (products: OrderRepositoryDtoInterface['products']) => {
      return orderBuilder({
        ...orderCreateData,
        products,
      });
    },

    build() {
      return orderCreateData;
    },
  };
};
