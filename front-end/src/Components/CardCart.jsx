import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryAppContext from '../Context/DeliveryAppContext';

export default function CardCart() {
  const history = useHistory();
  const { cartItems } = useContext(DeliveryAppContext);
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    const getSubTotal = () => {
      if (!cartItems || cartItems.length === 0) {
        setCartValue(0);
        return 0;
      }
      const getTotal = cartItems.reduce((acc, { Qtd, price }) => acc + (Qtd * price), 0);
      const subTotalFixed = getTotal.toFixed(2).replace('.', ',');
      return setCartValue(subTotalFixed);
    };
    getSubTotal();
  }, [cartItems, cartValue]);

  const onClickRedirect = () => {
    history.push('/customer/checkout');
  };

  return (
    <div>
      <button
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ onClickRedirect }
        disabled={ cartItems.length === 0 }
      >
        <p
          data-testid="customer_products__checkout-bottom-value"
        >
          {`R$: ${cartValue}` }
        </p>
      </button>
    </div>
  );
}
