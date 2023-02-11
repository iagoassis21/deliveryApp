import React from 'react';
import { useLocation } from 'react-router-dom';

export default function TableHeaderCheckout() {
  const { pathname } = useLocation();
  const isCheckout = pathname === '/customer/checkout';
  return (
    <thead
      className={ `text-xs text-center h-10 py-3.5 uppercase
     bg-bgColorGrayThead dark:bg-bgColorGrayThead` }
    >
      <tr>
        <th scope="col" className="px-3 py-3 text-white text-base">Item</th>
        <th scope="col" className="px-6 py-3 text-white text-base">Name</th>
        <th scope="col" className="px-3 py-3 text-white text-base">Qtd</th>
        <th scope="col" className="px-4 py-3 text-white text-base">Preço</th>
        <th scope="col" className="px-4 py-3 text-white text-base">Total</th>
        { isCheckout
          ? (
            <th scope="col" className="px-6 py-3 text-white text-base">
              Remover Itens
            </th>
          )
          : null}
      </tr>
    </thead>
  );
}
