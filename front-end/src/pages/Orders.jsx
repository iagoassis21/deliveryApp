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
      <section className="orders-container">
        {
          orders.map((item) => (
            <ProductOrderCard key={ item.id } orders={ item } />
          ))
        }
      </section>
    </div>
  );
}
