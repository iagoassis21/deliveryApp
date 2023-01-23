import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
    </Switch>

  );
}

export default App;
