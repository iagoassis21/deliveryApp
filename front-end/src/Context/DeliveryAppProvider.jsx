import PropTypes from 'prop-types';
import React, { useState } from 'react';
import getDeliveryData from '../Services/DeliveryAppApi';
import DeliveryAppContext from './DeliveryAppContext';

export default function DeliveryAppProvider({ children }) {
  const [erro, setErro] = useState('');
  const [products, setProducts] = useState([])
  const [quantity, setQuantity] = useState(0)

  const requestDeliveryData = async () => {
    try {
      const response = await getDeliveryData();
      const { results } = response;
      setProducts(results);
    } catch (error) {
      setErro(error);
    }
  };

  const { Provider } = DeliveryAppContext;

  return (
    <Provider
      value={{
        requestDeliveryData,
        erro, setErro,
        products, setProducts,
        quantity, setQuantity,
      } }
    >
      { children }
    </Provider>
  );
}

DeliveryAppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};