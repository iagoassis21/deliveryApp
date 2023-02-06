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
          Selecione um pedido para ir aos detalhes
        </h1>
        <div className="grid grid-cols gap-3 mt-2 py-12 px-36 rounded-lg">
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
