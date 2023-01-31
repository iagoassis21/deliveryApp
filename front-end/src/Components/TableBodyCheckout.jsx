import React from 'react';

export default function TableBodyCheckout() {
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  const CCEOT = 'customer_checkout__element-order-table-';

  const removeItem = (id) => {
    const result = cartItems.filter((item) => item.id !== id);
    window.location.reload(true);
    return localStorage.setItem('cart', JSON.stringify(result));
  };

  return (
    <tbody>
      {
        cartItems.map((product, index) => (
          <tr key={ index }>
            <td data-testid={ `${CCEOT}item-number-${index}` }>{product.id}</td>
            <td data-testid={ `${CCEOT}name-${index}` }>{product.name}</td>
            <td data-testid={ `${CCEOT}quantity-${index}` }>{product.Qtd}</td>
            <td data-testid={ `${CCEOT}unit-price-${index}` }>{product.price}</td>
            <td data-testid={ `${CCEOT}sub-total-${index}` }>
              {
                Number(product.subTotal).toFixed(2).replace('.', ',')
              }
            </td>
            <td>
              <button
                type="button"
                data-testid={ `${CCEOT}remove-${index}` }
                onClick={ () => removeItem(product.id) }
              >
                REMOVER
              </button>
            </td>
          </tr>
        ))
      }
    </tbody>
  );
}
