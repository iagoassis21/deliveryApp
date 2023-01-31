import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { getOrderById } from '../Services/DeliveryAppApi';
import TableProducts from '../Components/TableProducts';

export default function SellerOrdersdetails() {
  const { id } = useParams();
  const [myToken, setMyToken] = useState('');

  useEffect(() => {
    const data = async () => {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const { token } = userInfo;
      setMyToken(token);
    };
    data();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <h1>Detalhe do Pedido</h1>
        <TableProducts saleId={ id } token={ myToken } />
      </div>
    </div>
  );
}
