import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import DeliveryAppContext from '../Context/DeliveryAppContext';

export default function ProductCard({ products }) {
  const { cartItems, setCartItems } = useContext(DeliveryAppContext);
  const { id, urlImage, name, price } = products;
  const priceFixed = Number(price).toFixed(2).replace('.', ',');
  const [unitItem, setUnitItem] = useState(0);

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
      id: cartItems.length + 1,
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

  return (
    <div
      key={ id }
      className="flex-col justify-center
     text-center border-4 border-lime-600 border-color: rgb(101 163 13); rounded-lg"
    >
      <img
        className="flex self-center justify-center"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <div className="bg-slate-400">
        <p
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }
        </p>
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { `${priceFixed === undefined ? <span>Loading...</span> : priceFixed}` }
        </p>
        <button
          className="border-2 w-8 border-black rounded-lg"
          type="button"
          onClick={ decreaseQuantity }
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          -
        </button>
        <input
          className="w-10 text-center rounded-lg"
          onChange={ (event) => setUnitItem(event.target.value) }
          value={ unitItem }
          data-testid={ `customer_products__input-card-quantity-${id}` }
        />
        <button
          className="border-2 w-8 border-black rounded-lg"
          type="button"
          onClick={ increaseQuantity }
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +
        </button>
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
