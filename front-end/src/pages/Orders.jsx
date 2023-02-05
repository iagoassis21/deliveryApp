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
      <div className="grid grid-cols-3 gap-3 mt-8 py-12 px-12 rounded-lg">
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
  );
}
