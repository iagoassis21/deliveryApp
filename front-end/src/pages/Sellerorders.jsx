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

  return (
    <div>
      <NavBar />
      {
        orders.map((obj) => (
          <div key={ obj.id }>
            <button type="submit" onClick={ () => handlePush(obj.id) }>
              <p data-testid={ `seller_orders__element-order-id-${obj.id}` }>{obj.id}</p>
              <p
                data-testid={ `seller_orders__element-delivery-status-${obj.id}` }
              >
                {obj.status}
              </p>
              <p
                data-testid={ `seller_orders__element-order-date-${obj.id}` }
              >
                {obj.saleDate}
              </p>
              <p
                data-testid={ `seller_orders__element-card-price-${obj.id}` }
              >
                {obj.totalPrice}
              </p>
              <p data-testid={ `seller_orders__element-card-address-${obj.id}` }>
                {obj.deliveryAddress}
              </p>
            </button>
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
