import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import DeliveryAppContext from '../Context/DeliveryAppContext';

export default function ProductCard({ products }) {
  const { updateCart } = useContext(DeliveryAppContext);
  const { id, urlImage, name, price } = products;
  const priceFixed = Number(price).toFixed(2).replace('.', ',');
  const [unitItem, setUnitItem] = useState(0);

  const increaseQuantity = () => {
    const productsWithoutId = { name, price, urlImage };
    const newObj = { ...productsWithoutId, qnt: 0 };
    return updateCart(newObj);
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
          onClick={ () => (unitItem === 0 ? setUnitItem(0) : setUnitItem(unitItem - 1)) }
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
          onClick={ () => increaseQuantity() }
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
