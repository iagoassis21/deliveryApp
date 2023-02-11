/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect, useContext } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
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
            <div className="px-2">
              <ScrollArea.Root
                className={ `rounded overflow-hidden shadow-[0_2px_10px]
               shadow-blackA7 bg-white` }
              >
                <ScrollArea.Viewport className="w-full h-full rounded">
                  <section className="grid grid-col justify-center">
                    <table
                      className={ `w-full text-sm text-left text-gray-500 
              dark:text-gray-400` }
                    >
                      <TableHeaderCheckout />
                      <TableBodyCheckout />
                    </table>
                  </section>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  className={ `flex select-none touch-none p-0.5 bg-blackA6
                transition-colors duration-[160ms] ease-out hover:bg-blackA8
                data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col
                data-[orientation=horizontal]:h-2.5` }
                  orientation="horizontal"
                >
                  <ScrollArea.Thumb
                    className={ ` flex-1 bg-mauve10 rounded-[10px]
                relative before:content-[''] before:absolute before:top-1/2
                before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]` }
                  />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="bg-blackA8" />
              </ScrollArea.Root>
            </div>
          )
      }
      <div className="flex justify-center py-6">
        <p
          className=" bg-yellow text-black font-bold py-2 px-4 rounded"
          type="button"
          data-testid="customer_checkout__element-order-total-price"
        >
          {`Total dos itens: R$${!cartValue ? '0,00' : cartValue}`}

        </p>
      </div>
      <div className="flex justify-center px-2 pb-2">
        { cartValue === '0,00' || !cartValue ? '' : <AddressFormCard /> }
      </div>
    </div>
  );
}
