import { ShoppingCart } from 'phosphor-react';
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

  const buttonAllowed = `bg-darkGray px-5 h-12 rounded-md border border-yellow
  font-bold flex text-center items-center gap-3 hover:bg-yellow
  text-yellow hover:text-black`;

  return (
    <div>
      <button
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ onClickRedirect }
        className={ buttonAllowed }
        title={ cartItems.length === 0 ? 'Carrinho Vazio' : 'Ver Carrinho' }
      >
        <ShoppingCart size={ 32 } />
        {`Ver Carrinho: R$${cartValue}` }

      </button>
    </div>
  );
}
