/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../Components/NavBar';
import { getOrdersBySellerId } from '../Services/DeliveryAppApi';

export default function SellerOrders(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = async () => {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const { id, token } = userInfo;
      const response = await getOrdersBySellerId(token, id);
      setOrders(response);
    };
    data();
  }, []);

  const handlePush = (productid) => {
    const { history } = props;
    history.push(`/seller/orders/${productid}`);
  };

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
    <div>
      <NavBar />
      {
        orders.map((obj) => (
          <div
            className={ `grid grid-cols gap-3 py-4 xl:px-36 
          lg:px-28 md:px-20 sm:px-8 px-4 rounded-lg` }
            key={ obj.id }
          >
            <section
              className={ `flex justify-center text-center border-4 bg-bgColorGrayThead
              border-darkGray hover:bg-darkGray text-white font-semibold
                shadow-2xl rounded-lg` }
            >
              <button type="submit" onClick={ () => handlePush(obj.id) }>
                <div className="flex flex-col sm:flex-row justify-evenly py-2">
                  <div className="flex flex-row sm:flex-col justify-center px-2 py-1">
                    <p className="pr-2">Número do Pedido</p>
                    <div data-testid={ `seller_orders__element-order-id-${obj.id}` }>{`#${obj.id}`}</div>
                  </div>
                  <div className="flex flex-row sm:flex-col justify-center px-2 py-1">
                    <p className="pr-2">Status do Pedido:</p>
                    <div
                      className={ handleChangeStatusStyle(obj.status) }
                      data-testid={ `seller_orders__element-delivery-status-${obj.id}` }
                    >
                      {`${obj.status}`}
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col justify-center px-2 py-1">
                    <p className="pr-2">Data: </p>
                    <div
                      data-testid={ `seller_orders__element-order-date-${obj.id}` }
                    >
                      {`${new Date(obj.saleDate).toLocaleDateString('pt-BR')}`}
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col justify-center px-2 py-1">
                    <p>Valor:</p>
                    <div
                      data-testid={ `seller_orders__element-card-price-${obj.id}` }
                    >
                      {`R$: ${obj.totalPrice.replace('.', ',')}`}
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col justify-center px-2 py-1">
                    <div data-testid={ `seller_orders__element-card-address-${obj.id}` }>
                      { `Endereço: ${obj.deliveryAddress}`}
                    </div>
                  </div>
                </div>
              </button>
            </section>
          </div>
        ))
      }
    </div>
  );
}

SellerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
