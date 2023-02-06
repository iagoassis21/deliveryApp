/* eslint-disable react/jsx-max-depth */
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

  const buttonStyles = `inline-block bg-darkGray font-medium border border-yellow rounded
  py-0.25 px-2.5 mx-2 hover:bg-yellow text-yellow hover:text-black
  href="#"`;

  return (
    <div
      key={ id }
      className="flex-col justify-center
     text-center border-4 bg-lightYellow border-lightYellow  rounded-lg shadow-xl"
    >
      <div className="flex flex-col">
        <img
          className="flex self-center justify-center"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ name }
        />
        <div className="bg-lightYellow flex flex-col">
          <div className="flex flex-col bg-lightYellow">
            <p
              className="flex justify-center flex-wrap text-lg font-bold py-2"
              data-testid={ `customer_products__element-card-title-${id}` }
            >
              { name }
            </p>
            <p
              className="text-lg font-bold"
              data-testid={ `customer_products__element-card-price-${id}` }
            >
              { `R$: ${priceFixed === undefined ? <span>Loading...</span> : priceFixed}` }
            </p>
          </div>
          <div
            className={ `flex justify-center bg-darkGray font-medium border border-yellow
           roundedpy-1 py-2 text-yellow hover:text-black href="#"` }
          >
            <div>
              <button
                className={ buttonStyles }
                type="button"
                onClick={ decreaseQuantity }
                data-testid={ `customer_products__button-card-rm-item-${id}` }
              >
                -
              </button>
            </div>
            <div>
              <input
                className="w-10 text-center rounded-lg"
                onChange={ (event) => setUnitItem(event.target.value) }
                value={ unitItem }
                data-testid={ `customer_products__input-card-quantity-${id}` }
              />
            </div>
            <div>
              <button
                className={ buttonStyles }
                type="button"
                onClick={ increaseQuantity }
                data-testid={ `customer_products__button-card-add-item-${id}` }
              >
                +
              </button>
            </div>
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
