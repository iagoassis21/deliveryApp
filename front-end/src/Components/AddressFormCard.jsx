import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllSellers, getSaleData } from '../Services/DeliveryAppApi';
import DeliveryAppContext from '../Context/DeliveryAppContext';

export default function AddressFormCard() {
  const history = useHistory();
  const { cartItems } = useContext(DeliveryAppContext);
  const [sellers, setAllSellers] = useState([]);
  const [deliveryAddress, setAddress] = useState('');
  const [deliveryNumber, setNumber] = useState('');

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const getSellers = async () => {
      const sellerData = await getAllSellers(token);
      console.log(sellerData);
      return setAllSellers(sellerData);
    };
    getSellers();
  }, []);

  const handleSubmit = async () => {
    const { token, id: userId } = JSON.parse(localStorage.getItem('user'));
    const obj = {
      userId,
      sellerId: sellers[0].id,
      totalPrice: cartItems[0].totalPrice,
      deliveryAddress,
      deliveryNumber,
      products: cartItems
        .map(({ id: productId, quantity }) => ({ id: productId, quantity })),
      status: 'Pendente',
    };
    const id = await getSaleData(obj, token);
    console.log(id);
    return history.push(`/customer/orders/${id}`);
  };

  return (
    <div>
      <form>
        <select data-testid="customer_checkout__select-seller">
          {sellers.map((seller) => (
            <option value={ seller.id } key={ seller.name }>
              {seller.name}
            </option>))}
        </select>
        <label htmlFor="addresInput">
          <input
            value={ deliveryAddress }
            onChange={ ({ target }) => setAddress(target.value) }
            data-testid="customer_checkout__input-address"
            id="addresInput"
            type="text"
            placeholder="Rua/Av."
          />
        </label>
        <label htmlFor="numberInput">
          <input
            value={ deliveryNumber }
            onChange={ ({ target }) => setNumber(target.value) }
            data-testid="customer_checkout__input-address-number"
            id="numberInput"
            type="text"
            placeholder="Número"
          />
        </label>
        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ handleSubmit }
        >
          <p>Finalizar Pedido</p>
        </button>
      </form>
    </div>
  );
}
