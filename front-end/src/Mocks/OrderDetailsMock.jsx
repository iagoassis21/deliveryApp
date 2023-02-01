export const OrderDetailsMock = [
  { id: 1,
    pedido: 1,
    userId: 710,
    sellerId: 25,
    sellerName: 'Robervaldo',
    totalPrice: 10.00,
    deliveryAddress: 'Rua das Flores, 123',
    deliveryNumber: '123',
    saleDate: Date.now(),
    status: 'Pendente',
  },
];

export const SaleDetailsMock = [
  { id: 1, pedido: 1, status: 'Pendente', orderDate: Date.now(), price: 10.00 },
];
