import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import DeliveryAppContext from './Context/DeliveryAppContext';
import Products from './pages/Products';
import Register from './pages/Register';
import Orders from './pages/Orders';

function App() {
  // const {
  //   // adicione aqui os states criados no arquivo DeliveryAppContext.jsx
  // } = useContext(DeliveryAppContext);

  return (
    <Switch>
      <Redirect from="/" to="/login" />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      {/* <Route exact path="/customer/checkout" component={ Checkout } /> */}
      <Route exact path="/customer/orders" component={ Orders } />
    </Switch>

  );
}

export default App;
