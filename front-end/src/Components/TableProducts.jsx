import React from 'react';

export default function TableProducts() {
  return (
    <table className="table-responsive">
      <thead>
        <tr>
          <th>
            {' '}
            PEDIDO
            {' '}
            { order.id }
            {' '}
          </th>
          <th>
            {' '}
            { order.saleDate }
            {' '}
          </th>
          <th>
            {' '}
            { order.status }
            {' '}
          </th>
          {/* <th className="table"> {  } </th>
            <th className="table"> Moeda </th> */}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={ product.id }>
            <td>{ desp.description }</td>
            <td>{ desp.tag }</td>
            <td>{ desp.method }</td>
            <td>{ this.valueInput(desp.value) }</td>
            <td>{ desp.exchangeRates[desp.currency].name }</td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}
