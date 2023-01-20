import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DeliveryAppContext from './DeliveryAppContext';

export default function DeliveryAppProvider({ children }) {
  const [
    // adicione aqui os states e setStates que deseja usar
  ] = useState([])

  const { Provider } = DeliveryAppContext;

  return (
    <Provider
      value={ {
      } }
    >
      { children }
    </Provider>
  );
}

DeliveryAppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};