import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
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

  const inputStyle = `bg-zinc py-3 px-4 rounded text-sm
  placeholder:text-zinc-light w-full`;

  const buttonAllowed = `bg-yellow px-5 h-12 rounded-md
  font-bold flex text-center items-center gap-3 hover:text-black`;

  const buttonNotAllowed = `bg-yellow cursor-not-allowed px-5 h-12 rounded-md
  font-bold flex items-center gap-3 hover:text-black`;

  return (
    <div
      className={ `flex justify-center font-semibold py-8 px-10
      bg-darkGray text-white w-[450px] rounded-lg` }
    >
      <form className="flex flex-col justify-center gap-4">
        <h1
          className="text-2xl font-semibold pb-2"
        >
          Detalhes e Endereço para Entrega
        </h1>
        <label
          htmlFor="select"
          className="block mb-2 text-sm font-semibold text-gray-900"
        >
          Selecione um Vendedor:
          <select
            className={ inputStyle }
            id="select"
            data-testid="customer_checkout__select-seller"
          >
            {sellers.map((seller) => (
              <option value={ seller.id } key={ seller.name }>
                {seller.name}
              </option>))}
          </select>
        </label>
        <label className="font-semibold" htmlFor="addresInput">
          Endereço:
          <input
            className={ inputStyle }
            value={ deliveryAddress }
            onChange={ ({ target }) => setAddress(target.value) }
            data-testid="customer_checkout__input-address"
            id="addresInput"
            type="text"
            placeholder="Rua/Av."
          />
        </label>
        <label className="font-semibold" htmlFor="numberInput">
          Nº:
          <input
            className={ inputStyle }
            value={ deliveryNumber }
            onChange={ ({ target }) => setNumber(target.value) }
            data-testid="customer_checkout__input-address-number"
            id="numberInput"
            type="text"
            placeholder="Número"
          />
        </label>
        <div className="flex justify-center mt-4 gap-4">
          <button
            className={ (!deliveryAddress || !deliveryNumber)
              ? buttonNotAllowed : buttonAllowed }
            data-testid="customer_checkout__button-submit-order"
            type="button"
            disabled={ !deliveryAddress || !deliveryNumber }
            onClick={ handleSubmit }
            title={ (!deliveryAddress || !deliveryNumber)
              ? 'Preencha todos os campos' : 'Finalize o pedido' }
          >
            <ShoppingCart size={ 32 } />
            Finalizar Pedido
          </button>
        </div>
      </form>
    </div>
  );
}
