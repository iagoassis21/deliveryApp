import React from 'react';

export default function TableHeaderCheckout() {
  return (
    <thead
      className={ `text-xs h-12 py-3.5 uppercase
     bg-bgColorGrayThead dark:bg-bgColorGrayThead` }
    >
      <tr>
        <th scope="col" className="px-6 py-3 text-white text-base">Id</th>
        <th scope="col" className="px-6 py-3 text-white text-base">Name</th>
        <th scope="col" className="px-6 py-3 text-white text-base">Qtd</th>
        <th scope="col" className="px-6 py-3 text-white text-base">Price</th>
        <th scope="col" className="px-6 py-3 text-white text-base">Total</th>
        <th scope="col" className="px-6 py-3 text-white text-base">Remover Itens</th>
      </tr>
    </thead>
  );
}
