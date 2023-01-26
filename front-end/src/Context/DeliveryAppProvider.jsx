import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { getDeliveryData } from '../Services/DeliveryAppApi';
import addItemToArray from '../utils/addItemToArray';
import DeliveryAppContext from './DeliveryAppContext';

export default function DeliveryAppProvider({ children }) {
  // const [] = useState('');
  const [erro, setErro] = useState('');
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateCart = (param) => {
    const getCartFromLocal = JSON.parse(localStorage.getItem('cart'));
    console.log('getCartFromLocal', typeof getCartFromLocal, getCartFromLocal);

    if (!getCartFromLocal) {
      return localStorage.setItem('cart', JSON.stringify([]));
    }

    const result = addItemToArray(getCartFromLocal, param);
    console.log('result', result);
    const updatedCart = localStorage.setItem('cart', JSON.stringify(result));
    return updatedCart;
  };

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
        updateCart,
      } }
    >
      {children}
    </Provider>
  );
}

DeliveryAppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
