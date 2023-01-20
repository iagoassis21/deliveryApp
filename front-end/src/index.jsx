import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DeliveryAppProvider from './Context/DeliveryAppProvider';

ReactDOM.render(
  <DeliveryAppProvider>
    <App />
  </DeliveryAppProvider>,
  document.getElementById('root'),
);