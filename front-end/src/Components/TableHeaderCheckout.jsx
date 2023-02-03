import React from 'react';

export default function TableHeaderCheckout() {
  return (
    <thead
      className={ `text-xs h-12 py-3.5 uppercase
     bg-bgColorGrayThead dark:bg-bgColorGrayThead` }
    >
      <tr>
        <th scope="col" className="px-6 py-3">Id</th>
        <th scope="col" className="px-6 py-3">Name</th>
        <th scope="col" className="px-6 py-3">Qtd</th>
        <th scope="col" className="px-6 py-3">Price</th>
        <th scope="col" className="px-6 py-3">Total</th>
        <th scope="col" className="px-6 py-3">Remover Itens</th>
      </tr>
    </thead>
  );
}
