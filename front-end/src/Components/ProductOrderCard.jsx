import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ProductOrderCard({ orders }) {
  const { id, saleDate, totalPrice, status } = orders;
  const history = useHistory();

  const onClickRedirect = (idParams) => {
    history.push(`/customer/orders/${idParams}`);
  };

  return (
    <button
      key={ id }
      data-testid={ `customer_orders__element-order-id-${id}` }
      type="button"
      onClick={ () => onClickRedirect(id) }
    >
      <p>{id}</p>
      <p
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        {status}
      </p>
      <p
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        {new Date(saleDate).toLocaleDateString('pt-BR')}
      </p>
      <p
        data-testid={ `customer_orders__element-card-price-${id} ` }
      >
        {totalPrice}
      </p>
    </button>
  );
}

ProductOrderCard.propTypes = {
  orders: PropTypes.shape({
    id: PropTypes.number,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};
