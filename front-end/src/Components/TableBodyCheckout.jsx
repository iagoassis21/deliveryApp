import React, { useEffect, useContext } from 'react';
import DeliveryAppContext from '../Context/DeliveryAppContext';

const CCEOT = 'customer_checkout__element-order-table-';

export default function TableBodyCheckout() {
  const { cartItems, setCartItems } = useContext(DeliveryAppContext);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('cart'));
    setCartItems(products);
  }, []);

  const removeItem = (id) => {
    const result = cartItems.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(result));
    return setCartItems(result);
  };

  return (
    <tbody>
      {
        cartItems.map((product, index) => (
          <tr key={ index }>
            <td data-testid={ `${CCEOT}item-number-${index}` }>{Number(index + 1)}</td>
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
