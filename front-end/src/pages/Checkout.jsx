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
      <h1 className="flex justify-center font-medium p-4">Finalize seu pedido abaixo</h1>
      {
        cartState.length === 0
          ? <p className="flex justify-center font-medium p-4">{cartMessage}</p>
          : (
            <section className="relative overflow-x-auto shadow-md">
              <table
                className={ `w-full text-sm text-left text-gray-500 
              dark:text-gray-400` }
              >
                <TableHeaderCheckout />
                <TableBodyCheckout />
              </table>

            </section>

          )
      }
      <div className="flex justify-end mt-4 mr-4">
        <button
          className=" bg-yellow text-black font-bold py-2 px-4 rounded"
          type="button"
          data-testid="customer_checkout__element-order-total-price"
        >
          {`Total dos itens: R$${!cartValue ? 0 : cartValue}`}

        </button>
      </div>
      <h2> Detalhes e Endereço para Entrega </h2>
      <AddressFormCard />
    </div>
  );
}
