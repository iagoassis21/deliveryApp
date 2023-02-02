import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductOrderCard({ orders: { id, saleDate,
  totalPrice, status } }) {
  console.log(
    'log do orders dentro do componente ordeCard',
    id,
    saleDate,
    totalPrice,
    status,
  );
  return (
    <Link
      data-testid={ `customer_orders__element-order-id-${id}` }
      to={ `/customer/orders/${id}` }
    >
      <div
        className="justify-center
     text-center border-4 border-lime-600 border-color: rgb(101 163 13); rounded-lg"
      >
        <div
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          {id}
        </div>
        <div
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          {status}
        </div>
        <div
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          {new Date(saleDate).toLocaleDateString('pt-BR')}
        </div>
        <div
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          {totalPrice.replace('.', ',')}
        </div>
      </div>
    </Link>
  );
}

// AGORA VAI TA ATE PRINTANDO AQUI Ó https://prnt.sc/x8mzFACBSLRq

ProductOrderCard.propTypes = {
  // orders: PropTypes.shape({
  id: PropTypes.number,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.string,
  status: PropTypes.string,
  // }).isRequired,
}.isRequired;
