import React, { useState, useEffect } from 'react';
import { getAllSellers } from '../Services/DeliveryAppApi';

export default function AddressFormCard() {
  const [sellers, setAllSellers] = useState([]);
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const getSellers = async () => {
      const sellerData = await getAllSellers(token);
      return setAllSellers(sellerData);
    };
    getSellers();
  }, []);

  return (
    <div>
      <form>
        <select data-testid="customer_checkout__select-seller">
          {sellers.map((seller) => (
            <option key={ seller.id } value={ seller.id }>
              {seller.name}
            </option>))}
        </select>
        <label htmlFor="addresInput">
          <input
            data-testid="customer_checkout__input-address"
            id="addresInput"
            type="text"
            placeholder="Rua/Av."
          />
        </label>
        <label htmlFor="numberInput">
          <input
            data-testid="customer_checkout__input-address-number"
            id="numberInput"
            type="text"
            placeholder="Número"
          />
        </label>
        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
        >
          <p>Finalizar Pedido</p>
        </button>
      </form>
    </div>
  );
}
