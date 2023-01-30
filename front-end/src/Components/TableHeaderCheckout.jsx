import React from 'react';

export default function TableHeaderCheckout() {
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  const cartItemsKeys = Object.keys(cartItems[0]);
  return (
    <thead>
      <tr>
        {
          cartItemsKeys.map((item, index) => (
            <th key={ index }>{item}</th>
          ))
        }
      </tr>
    </thead>
  );
}
