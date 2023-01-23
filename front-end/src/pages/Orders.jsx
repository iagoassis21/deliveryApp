import React from 'react';
import OrderItems from '../Mocks/OrdersMock';
import NavBar from '../Components/navBar';

export default function orders() {
  return (
    <div>
      <NavBar />
      <section className="orders-container">
        {
          OrderItems.map((item) => (
            <div
              key={ item.id }
              datatest-id={ `customer_orders__element-order-id-${item.id}` }
            >
              <p>{item.pedido}</p>
              <p
                data-testid={ `customer_orders__element-delivery-status-${item.id}` }
              >
                {item.status}
              </p>
              <p
                data-testid={ `customer_orders__element-order-date-${item.id}` }
              >
                {item.orderDate}
              </p>
              <p
                data-testid={ `customer_orders__element-card-price-${item.id} ` }
              >
                {item.price}
              </p>
            </div>
          ))
        }
      </section>
    </div>
  );
}
