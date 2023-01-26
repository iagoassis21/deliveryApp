import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function ProductCard({ products }) {
  const { id, urlImage, name, price } = products;
  const [unitItem, setUnitItem] = useState(0);

  return (
    <div>
      <div key={ id }>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ name }
        />
        <p
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }
        </p>
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { price }
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
          onClick={ () => { setUnitItem(unitItem + 1); } }
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
