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
      console.log('log do response', response);
      setOrders(response);
    };
    data();
  }, []);

  console.log('log do orders', orders);

  return (
    <div>
      <NavBar />
      <div>
        { !orders.length ? <h1>Não há pedidos</h1>
          : orders.map((item) => (
            <ProductOrderCard key={ item.id } orders={ item } />
          ))}
      </div>
    </div>
  );
}
