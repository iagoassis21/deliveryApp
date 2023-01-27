import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import DeliveryAppContext from '../Context/DeliveryAppContext';

export default function ProductCard({ products }) {
  const { cartItems, setCartItems } = useContext(DeliveryAppContext);
  const { id, urlImage, name, price } = products;
  const priceFixed = Number(price).toFixed(2);
  const [unitItem, setUnitItem] = useState(0);

  const decreaseQuantity = () => {
    if (unitItem === 0) {
      setUnitItem(0);
    }
    setUnitItem(unitItem - 1);
  };

  const increaseQuantity = () => {
    setUnitItem(unitItem + 1);
    const itemIncreasedObj = {
      [id]: id,
      name,
      price,
      Qtd: 1 + unitItem,
      subTotal: (priceFixed * (1 + unitItem)).toFixed(2) };
    const verifyItemInCart = cartItems.find((item) => item[id] === id);
    console.log('checando se o item ja existe no carrinho', verifyItemInCart);
    if (verifyItemInCart) {
      const cartItemsArray = [...cartItems, itemIncreasedObj];
      setCartItems(cartItemsArray);
      return localStorage.setItem('cart', JSON.stringify(cartItemsArray));
    }
    console.log('obj criado', itemIncreasedObj);
    console.log('array do cartItems dentro do local storage', cartItems);
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
          { `R$ ${priceFixed === undefined ? <span>Loading...</span> : priceFixed}` }
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
