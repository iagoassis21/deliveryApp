import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import DeliveryAppContext from './Context/DeliveryAppContext';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  // const {
  //   // adicione aqui os states criados no arquivo DeliveryAppContext.jsx
  // } = useContext(DeliveryAppContext);

  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
    </Switch>

  );
}

export default App;
