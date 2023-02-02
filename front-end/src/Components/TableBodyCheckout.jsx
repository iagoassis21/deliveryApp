import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DeliveryAppContext from '../Context/DeliveryAppContext';
import LoadingBar from './LoadingBar';

export default function TableBodyCheckout() {
  const { cartItems, setCartItems, cart } = useContext(DeliveryAppContext);

  const location = useLocation();
  const { pathname } = location;

  const checkout = pathname === '/customer/checkout';
  const testId = checkout ? 'customer_checkout__' : 'customer_order_details__';

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('cart'));
    setCartItems(products);
  }, [setCartItems]);

  const getPrice = (product) => {
    const calculateTotalPrice = Number(product.price.replace(',', '.'))
     * product.quantity;
    const result = calculateTotalPrice.toFixed(2).replace('.', ',');
    return result;
  };

  const removeItem = (id) => {
    const result = cartItems.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(result));
    return setCartItems(result);
  };

  const checkPageParams = () => {
    if (checkout) {
      return cartItems;
    }
    return cart;
  };

  return (
    !checkout && !cart ? <LoadingBar /> : (
      <tbody>
        {
          checkPageParams().map((product, index) => (
            <tr key={ index }>
              <td
                data-testid={ `${testId}element-order-table-item-number-${index}` }
              >
                { index + 1 }
              </td>

              <td
                data-testid={ `${testId}element-order-table-name-${index}` }
              >
                { product.name }
              </td>
              <td
                data-testid={ `${testId}element-order-table-quantity-${index}` }
              >
                { product.quantity }
              </td>
              <td
                data-testid={ `${testId}element-order-table-unit-price-${index}` }
              >
                { product.price }
              </td>
              <td data-testid={ `${testId}element-order-table-sub-total-${index}` }>
                {
                  getPrice(product)
                }
              </td>
              {
                pathname === '/customer/checkout' && (
                  <td>
                    <button
                      type="button"
                      data-testid={ `${testId}element-order-table-remove-${index}` }
                      onClick={ () => removeItem(product.id) }
                    >
                      REMOVER
                    </button>
                  </td>
                )
              }
            </tr>
          ))
        }
      </tbody>
    )
  );
}