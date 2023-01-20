import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DeliveryAppProvider from './Context/DeliveryAppProvider';

ReactDOM.render(
  <BrowserRouter>
    <DeliveryAppProvider>
      <App />
    </DeliveryAppProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
