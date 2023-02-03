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
      return setAllSellers(sellerData);
    };
    getSellers();
  }, []);

  const buttonStyles = `inline-block font-medium border border-yellow rounded
  py-1 px-3 hover:bg-yellow text-yellow hover:text-black
  href="#"`;

  const handleSubmit = async () => {
    const { token, id: userId } = JSON.parse(localStorage.getItem('user'));
    const getCartItems = cartItems
      .map(({ id, quantity }) => ({ productId: id, quantity }));
    const obj = {
      userId,
      sellerId: sellers[0].id,
      totalPrice: cartItems.reduce((acc, { price, quantity }) => {
        const totalPrice = Number(price.replace(',', '.')) * quantity;
        return acc + totalPrice;
      }, 0),
      deliveryAddress,
      deliveryNumber,
      products: getCartItems,
      status: 'Pendente',
    };
    const orderId = await getSaleData(obj, token);
    if (!orderId) return <h1>Aguardando criação do pedido</h1>;
    return history.push(`/customer/orders/${orderId}`);
  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-wrap border w-80 my-4">
        <label htmlFor="select" className="block mb-2 text-sm font-medium text-gray-900">
          Selecione um Vendedor:
          <select
            id="select"
            className="pl-4"
            data-testid="customer_checkout__select-seller"
          >
            {sellers.map((seller) => (
              <option value={ seller.id } key={ seller.name }>
                {seller.name}
              </option>))}
          </select>
        </label>
        <label htmlFor="addresInput">
          Endereço:
          <input
            className="border pl-2"
            value={ deliveryAddress }
            onChange={ ({ target }) => setAddress(target.value) }
            data-testid="customer_checkout__input-address"
            id="addresInput"
            type="text"
            placeholder="Rua/Av."
          />
        </label>
        <label htmlFor="numberInput">
          Nº:
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
          className={ buttonStyles }
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
