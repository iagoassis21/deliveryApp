import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import TableProducts from '../Components/TableProducts';

export default function SellerOrdersdetails() {
  const { id } = useParams();

  return (
    <div>
      <NavBar />
      <div className="grid grid-cols gap-3 py-10 px-36 rounded-lg">
        <h1 className="text-center font-bold pb-4">Detalhes do Pedido</h1>
        <TableProducts saleId={ id } />
      </div>
    </div>
  );
}
