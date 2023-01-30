import React from 'react';

export default function AddressFormCard() {
  return (
    <div>
      <form>
        <select data-testid="customer_checkout__select-seller">
          <option value="Fulana1">Fulana Pereira</option>
          <option value="Fulana2">Fulana Silva</option>
          <option value="Fulana3">Fulana Gonçalves</option>
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
