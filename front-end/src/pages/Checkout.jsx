import React, { useState, useEffect, useContext } from 'react';
import AddressFormCard from '../Components/AddressFormCard';
import NavBar from '../Components/NavBar';
import TableBodyCheckout from '../Components/TableBodyCheckout';
import TableHeaderCheckout from '../Components/TableHeaderCheckout';
import DeliveryAppContext from '../Context/DeliveryAppContext';

export default function Checkout() {
  const { cartValue } = useContext(DeliveryAppContext);
  const [cartMessage, setCartMessage] = useState('');
  const [cartState, setCartState] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart || cart.length === 0) {
      return setCartMessage('Seu carrinho está vazio');
    }
    setCartMessage('');
    return setCartState(cart);
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Finalizar Pedido</h1>
      {
        cartState.length === 0
          ? <p>{cartMessage}</p>
          : (
            <section>
              <table>
                <TableHeaderCheckout />
                <TableBodyCheckout />
              </table>
              <button
                type="button"
                data-testid="customer_checkout__element-order-total-price"
              >
                {cartValue}

              </button>
            </section>
          )
      }
      <h2> Detalhes e Endereço para Entrega </h2>
      <AddressFormCard />
    </div>
  );
}
