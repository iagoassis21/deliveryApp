import React, { useState, useEffect } from 'react';
import AddressFormCard from '../Components/AddressFormCard';
import TableBodyCheckout from '../Components/TableBodyCheckout';
import TableHeaderCheckout from '../Components/TableHeaderCheckout';

export default function Checkout() {
  const [cartMessage, setCartMessage] = useState('');
  const [cartState, setCartState] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    if (!cart || cart.length === 0) {
      return setCartMessage('Seu carrinho está vazio');
    }
    setCartMessage('');
    return setCartState(cart);
  }, []);

  return (
    <div>
      <h1>Finalizar Pedido</h1>
      { cartState.length === 0 ? <p>{cartMessage}</p>
        : <table>
          <TableHeaderCheckout />
          <TableBodyCheckout />
          </table>}
      <h2> Detalhes e Endereço para Entrega </h2>
      <AddressFormCard />
    </div>
  );
}
