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
      price,
      Qtd: unitItem,
      subTotal: (price * unitItem) };
    const checkItemInCart = cartItems.some((item) => item.id === itemIncreasedObj.id);
    if (checkItemInCart) {
      arrayCart = cartItems.map((item) => {
        if (item.id === itemIncreasedObj.id) return itemIncreasedObj;
        return item;
      });
    } else arrayCart = [...cartItems, itemIncreasedObj];
    setCartItems(arrayCart.filter(({ Qtd }) => Qtd !== 0));
  }, [unitItem]);

  const increaseQuantity = () => {
    setUnitItem(unitItem + 1);
  };

  return (
    <div
      key={ id }
    >
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <div>
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
          type="button"
          onClick={ decreaseQuantity }
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          -
        </button>
        <input
          onChange={ (event) => setUnitItem(event.target.value) }
          value={ unitItem }
          data-testid={ `customer_products__input-card-quantity-${id}` }
        />
        <button
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
