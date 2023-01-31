import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import TableProducts from '../Components/TableProducts';

export default function SellerOrdersdetails() {
  const { id } = useParams();

  return (
    <div>
      <NavBar />
      <div>
        <h1>Detalhes do Pedido</h1>
        <TableProducts saleId={ id } />
      </div>
    </div>
  );
}
