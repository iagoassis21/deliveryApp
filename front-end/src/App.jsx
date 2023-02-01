import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Redirect exact from="/" to="/login" />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders" component={ Orders } />
      <Route exact path="/customer/orders/:orderId" component={ OrderDetails } />
      <Route exact path="/admin/manage" component={ Admin } />
    </Switch>

  );
}

export default App;
