import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import DeliveryAppContext from './Context/DeliveryAppContext';
import Products from './pages/Products';

function App() {
  const {
    // adicione aqui os states criados no arquivo DeliveryAppContext.jsx
  } = useContext(DeliveryAppContext);

  return (
    <Routes>
      <Route exact path="/" element={ Login } />
      <Route exact path="/customer/products" element={ Products } />
    </Routes>

  );
}

export default App;
