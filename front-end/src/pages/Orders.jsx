import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import { getAllOrdersByUser } from '../Services/DeliveryAppApi';
import ProductOrderCard from '../Components/ProductOrderCard';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { id, token } = JSON.parse(localStorage.getItem('user'));
    const data = async () => {
      const response = await getAllOrdersByUser(id, token);
      setOrders(response);
    };
    data();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center">
        <h1 className="flex self-center pt-8 font-bold">
          Clique no pedido para ir aos detalhes
        </h1>
        <div
          className={ `grid grid-cols gap-3 py-4 xl:px-36 
        lg:px-28 md:px-20 sm:px-8 px-4 rounded-lg` }
        >
          { !orders.length ? (
            <h1
              className={ `grid h-screen place-items-center
         font-medium bg-bgColorWhiteIce` }
            >
              Você ainda não fez nenhum pedido...
            </h1>
          )
            : orders.map((item) => (
              <ProductOrderCard key={ item.id } orders={ item } />
            ))}
        </div>
      </div>
    </div>
  );
}
