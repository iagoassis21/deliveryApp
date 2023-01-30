import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { getDeliveryData } from '../Services/DeliveryAppApi';
import DeliveryAppContext from './DeliveryAppContext';

export default function DeliveryAppProvider({ children }) {
  const [erro, setErro] = useState('');
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cartItems, setCartItems] = useState([]);

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
      value={ {
        requestDeliveryData,
        erro,
        setErro,
        products,
        setProducts,
        quantity,
        setQuantity,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        cartItems,
        setCartItems,
      } }
    >
      {children}
    </Provider>
  );
}

DeliveryAppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
