import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductOrderCard({ orders: { id, saleDate,
  totalPrice, status } }) {
  const handleChangeStatusStyle = (statusParams) => {
    switch (statusParams) {
    case 'Pendente':
      return 'border bg-bgPendente text-black uppercase font-semibold rounded px-2';
    case 'Preparando':
      return 'border bg-bgPreparando text-black uppercase font-semibold rounded px-2';
    case 'Em Trânsito':
      return 'border bg-bgTransito text-black uppercase font-semibold rounded px-2';
    case 'Entregue':
      return 'border bg-bgEntregue text-black uppercase font-semibold rounded px-2';
    case 'Cancelado':
      return 'border bg-bgCancelado text-black uppercase font-semibold rounded px-2';
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
         shadow-2xl rounded-lg` }
      >
        <div className="flex flex-col sm:flex-row justify-evenly py-2">
          <div className="flex flex-row sm:flex-col justify-center py-1">
            <p className="pr-2">Número do Pedido</p>
            <div
              data-testid={ `customer_orders__element-order-id-${id}` }
            >
              {`#${id}`}
            </div>
          </div>
          <div className="flex flex-row sm:flex-col justify-center px-2 py-1">
            <p className="pr-2">Status:</p>
            <div
              className={ handleChangeStatusStyle(status) }
              data-testid={ `customer_orders__element-delivery-status-${id}` }
            >
              {`${status}`}
            </div>
          </div>
          <div className="flex flex-row sm:flex-col justify-center px-2 py-1">
            <p className="pr-2">Data:</p>
            <div
              data-testid={ `customer_orders__element-order-date-${id}` }
            >
              {`${new Date(saleDate).toLocaleDateString('pt-BR')}`}
            </div>
          </div>
          <div className="flex flex-row sm:flex-col justify-center px-2 py-1">
            <p className="pr-2">Valor:</p>
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
