import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductOrderCard({ orders }) {
  const { id, saleDate, totalPrice, status } = orders;
  return (
    <Link
      data-testid={ `customer_orders__element-order-id-${id}` }
      to={ `/customer/orders/${id}` }
    >
      <p
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        {id}
      </p>
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
    </Link>
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
