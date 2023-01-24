import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import Orders from './pages/Orders';

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Redirect exact from="/" to="/login" />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      {/* <Route exact path="/customer/checkout" component={ Checkout } /> */}
      <Route exact path="/customer/orders" component={ Orders } />
    </Switch>

  );
}

export default App;
