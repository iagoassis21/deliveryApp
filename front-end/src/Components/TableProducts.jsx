import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOrderById, updateStatus } from '../Services/DeliveryAppApi';

export default function Tableproductss({ saleId }) {
  const [order, setOrder] = useState([]);

  const dataTestDate = 'seller_order_details__element-order-details-label-order-date';
  const dTestStatus = 'seller_order_details__element-order-details-label-delivery-status';
  const dItemNum = 'seller_order_details__element-order-table-item-number';
  const dItemName = 'seller_order_details__element-order-table-name';
  const dItemQuantity = 'seller_order_details__element-order-table-quantity';
  const dUnityPrice = 'seller_order_details__element-order-table-unit-price';
  const dSubPrice = 'seller_order_details__element-order-table-sub-total';

  useEffect(() => {
    const data = async () => {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const { token } = userInfo;
      // console.log(token);
      const saleDetails = await getOrderById(token, saleId);
      setOrder(saleDetails);
      // console.log(saleDetails);
    };
    data();
  }, []);

  const handleStatus = async (event) => {
    event.preventDefault();
    const { name } = event.target;
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const { token } = userInfo;
    if (name === 'Preparando') {
      const preparando = 'Preparando';
      await updateStatus(saleId, preparando, token);
      const update = await await getOrderById(token, saleId);
      setOrder(update);
    }
    if (name === 'Transito') {
      const transito = 'Em Trânsito';
      await updateStatus(saleId, transito, token);
      const update = await getOrderById(token, saleId);
      setOrder(update);
    }
  };

  return (
    <div>
      {
        order && order.map((obj) => (
          <table className="table-responsive" key={ obj.id }>
            <thead>
              <tr>
                <th
                  data-testid="seller_order_details__element-order-details-label-order-id"
                >
                  { `PEDIDO ${obj.id}`}
                </th>
                <th
                  data-testid={ dataTestDate }
                >
                  { obj.saleDate }
                </th>
                <th
                  data-testid={ dTestStatus }
                >
                  { obj.status }
                </th>
                <th>
                  <button
                    type="button"
                    data-testid="seller_order_details__button-preparing-check"
                    name="Preparando"
                    onClick={ handleStatus }
                  >
                    PREPARAR PEDIDO
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    data-testid="seller_order_details__button-dispatch-check"
                    name="Transito"
                    onClick={ handleStatus }
                  >
                    SAIU PARA ENTREGA
                  </button>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>
                  Item
                </th>
                <th>
                  Descrição
                </th>
                <th>
                  Quantidade
                </th>
                <th>
                  Valor Unitário
                </th>
                <th>
                  Sub-total
                </th>
              </tr>
            </thead>
            <tbody />
            {
              obj.products.map((products, index) => (
                <tr key={ index }>
                  <td
                    data-testid={ `${dItemNum}-${index}` }
                  >
                    {index}
                  </td>
                  <td
                    data-testid={ `${dItemName}-${index}` }
                  >
                    {products.name}
                  </td>
                  <td
                    data-testid={ `${dItemQuantity}-${index}` }
                  >
                    {products.SalesProduct.quantity}
                  </td>
                  <td
                    data-testid={ `${dUnityPrice}${index}` }
                  >
                    { products.price }
                  </td>
                  <td
                    data-testid={ `${dSubPrice}-${index}` }
                  >
                    { Number(products.SalesProduct.quantity * products.price) }
                  </td>
                </tr>
              ))
            }
            <h1
              data-testid="seller_order_details__element-order-total-price"
            >
              Total:
              {obj.totalPrice}
            </h1>
          </table>
        ))
      }
    </div>
  );
}

Tableproductss.propTypes = {
  saleId: PropTypes.string.isRequired,
};
