import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductOrderCard({ orders: { id, saleDate,
  totalPrice, status } }) {
  const handleChangeStatusStyle = (statusParams) => {
    switch (statusParams) {
    case 'Pendente':
      return 'border bg-bgPendente text-black uppercase font-semibold rounded mt-1';
    case 'Preparando':
      return 'border bg-bgPreparando text-black uppercase font-semibold rounded mt-1';
    case 'Em Trânsito':
      return 'border bg-bgTransito text-black uppercase font-semibold rounded mt-1';
    case 'Entregue':
      return 'border bg-bgEntregue text-black uppercase font-semibold rounded mt-1';
    case 'Cancelado':
      return 'border bg-bgCancelado text-black uppercase font-semibold rounded mt-1';
    default:
      return '';
    }
  };

  return (
    <Link
      data-testid={ `customer_orders__element-order-id-${id}` }
      to={ `/customer/orders/${id}` }
    >
      <section
        className={ `flex justify-center text-center border-4 bg-bgColorGrayThead
       border-darkGray hover:bg-darkGray text-white font-semibold
         shadow-2xl rounded-lg href="#"` }
      >
        <div className="flex space-x-24 py-4">
          <div className="grid justify-center">
            <p>Número do Pedido</p>
            <div
              data-testid={ `customer_orders__element-order-id-${id}` }
            >
              {`${id}`}
            </div>
          </div>
          <div className="grid justify-center">
            <p className="pb-2">Status do Pedido</p>
            <div
              className={ handleChangeStatusStyle(status) }
              data-testid={ `customer_orders__element-delivery-status-${id}` }
            >
              {`${status}`}
            </div>
          </div>
          <div className="grid justify-center">
            <p>Data do Pedido</p>
            <div
              data-testid={ `customer_orders__element-order-date-${id}` }
            >
              {`${new Date(saleDate).toLocaleDateString('pt-BR')}`}
            </div>
          </div>
          <div className="grid justify-center">
            <p>Valor do Pedido</p>
            <div
              data-testid={ `customer_orders__element-card-price-${id}` }
            >
              {`R$: ${totalPrice.replace('.', ',')}`}
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

ProductOrderCard.propTypes = {
  id: PropTypes.number,
  saleDate: PropTypes.string,
  totalPrice: PropTypes.string,
  status: PropTypes.string,
}.isRequired;
