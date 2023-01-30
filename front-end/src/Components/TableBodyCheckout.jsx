import React from 'react';

export default function TableBodyCheckout() {
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  const CCEOT = 'customer_checkout__element-order-table-';
  return (
    <tbody>
      {
        cartItems.map((product, index) => (
          <tr key={ index }>
            <td data-testid={ `${CCEOT}item-number-${index}` }>{product.id}</td>
            <td data-testid={ `${CCEOT}table-name-${index}` }>{product.name}</td>
            <td data-testid={ `${CCEOT}table-quantity-${index}` }>{product.Qtd}</td>
            <td data-testid={ `${CCEOT}table-unit-price-${index}` }>{product.price}</td>
            <td data-testid={ `${CCEOT}table-sub-total-${index}` }>
              {product.subTotal}
            </td>
          </tr>
        ))
      }
    </tbody>
  );
}
