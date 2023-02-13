/* eslint-disable react/jsx-max-depth */
import { Minus, Plus } from 'phosphor-react';
import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import DeliveryAppContext from '../Context/DeliveryAppContext';

export default function ProductCard({ products }) {
  const { cartItems, setCartItems } = useContext(DeliveryAppContext);
  const { id, urlImage, name, price } = products;
  const priceFixed = Number(price).toFixed(2).replace('.', ',');
  const [unitItem, setUnitItem] = useState(() => {
    const item = cartItems.find((product) => product.id === id);
    if (item) return item.quantity;
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const decreaseQuantity = () => {
    if (unitItem === 0) {
      return setUnitItem(0);
    }
    return setUnitItem(unitItem - 1);
  };

  useEffect(() => {
    let arrayCart = [];

    const itemIncreasedObj = {
      id,
      name,
      price: priceFixed,
      quantity: unitItem,
      totalPrice: (price * unitItem) };

    const checkItemInCart = cartItems.some((item) => item.name === itemIncreasedObj.name);

    if (checkItemInCart) {
      arrayCart = cartItems.map((item) => {
        if (item.name === itemIncreasedObj.name) return itemIncreasedObj;
        return item;
      });
    } else arrayCart = [...cartItems, itemIncreasedObj];

    setCartItems(arrayCart.filter(({ quantity }) => quantity !== 0));
  }, [unitItem]);

  const increaseQuantity = () => {
    setUnitItem(unitItem + 1);
  };

  // const buttonStyles = `inline-block bg-darkGray font-medium border border-yellow rounded
  // py-0.25 px-2.5 mx-2 hover:bg-yellow text-yellow hover:text-black
  // href="#"`;

  return (
    <div
      className="shadow-md transition-all hover:-translate-y-2
      duration-200 bg-bgColorWhiteIce rounded-lg p-1 border border-1"
      key={ id }
    >
      <img
        className="flex self-center justify-center"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <div className="border border-1 rounded bg-darkGray text-white font-medium">
        <div className="flex flex-col flex-wrap items-center">
          <div data-testid={ `customer_products__element-card-title-${id}` }>
            { name }
          </div>
          <div
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            { `R$: ${priceFixed === undefined ? <span>Loading...</span> : priceFixed}` }
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <button
              className="px-0.5 py-0.5"
              type="button"
              onClick={ decreaseQuantity }
              data-testid={ `customer_products__button-card-rm-item-${id}` }
            >
              <Minus size={ 24 } />
            </button>
          </div>
          <div className="px-1 mt-0.5">
            <input
              className="w-10 rounded text-center text-black px-0.5 py-0.5"
              onChange={ (event) => setUnitItem(event.target.value) }
              value={ unitItem }
              data-testid={ `customer_products__input-card-quantity-${id}` }
            />
          </div>
          <div>
            <button
              className="px-0.5 py-0.5"
              type="button"
              onClick={ increaseQuantity }
              data-testid={ `customer_products__button-card-add-item-${id}` }
            >
              <Plus size={ 24 } />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  products: PropTypes.shape({
    id: PropTypes.number,
    urlImage: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};
