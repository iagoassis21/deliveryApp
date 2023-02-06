import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryAppContext from '../Context/DeliveryAppContext';

export default function CardCart() {
  const history = useHistory();
  const { cartItems, cartValue, setCartValue } = useContext(DeliveryAppContext);

  useEffect(() => {
    const getSubTotal = () => {
      if (!cartItems || cartItems.length === 0) {
        setCartValue(0);
        return 0;
      }
      const getTotal = cartItems
        .reduce((acc, { quantity, price }) => {
          const priceFixed = Number(price.replace(',', '.'));
          return acc + (quantity * priceFixed);
        }, 0);

      const subTotalFixed = getTotal.toFixed(2).replace('.', ',');
      return setCartValue(subTotalFixed);
    };
    getSubTotal();
  }, [cartItems, cartValue, setCartValue]);

  const onClickRedirect = () => {
    history.push('/customer/checkout');
  };

  const buttonStyles = `inline-block bg-darkGray font-bold border border-yellow rounded
  py-5 px-5 hover:bg-yellow text-yellow hover:text-black
  href="#"`;

  return (
    <div>
      <button
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ onClickRedirect }
        disabled={ cartItems.length === 0 }
      >
        <p
          className={ buttonStyles }
          data-testid="customer_products__checkout-bottom-value"
        >
          {`Ver Carrinho: R$${cartValue}` }
        </p>
      </button>
    </div>
  );
}
