import React from 'react';
// import { useParams } from 'react-router-dom';
import OrderDetailsMock from '../Mocks/OrderDetailsMock';

export default function OrderDetails() {
  const COD = 'customer_order_details';
  //   const { orderId } = useParams();

  return (
    <div>
      <h1>Detalhe de Pedido</h1>
      <div>
        {
          OrderDetailsMock.map((item, index) => (
            <section key={ item.id }>
              <div>
                <p
                  data-testid={ `${COD}__element-order-details-label-order-id` }
                >
                  {`Pedido ${item.pedido}`}
                </p>
                <p data-testid={ `${COD}__element-order-details-label-seller-name` }>
                  {`P. Vend: ${item.sellerName}`}
                </p>
                <p data-testid={ `${COD}__element-order-details-label-order-date` }>
                  {`${item.saleDate}`}
                </p>
                <p
                  data-testid={ `${COD}__element-order-details-label-
                  delivery-status${index}` }
                >
                  {`Endereço: ${item.deliveryAddress}`}
                </p>
                <button
                  data-testid="customer_order_details__button-delivery-check"
                  type="button"
                >
                  Marcar como Entregue
                </button>
              </div>
            </section>
          ))
        }
      </div>
    </div>
  );
}
