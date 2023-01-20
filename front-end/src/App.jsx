import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import DeliveryAppContext from './Context/DeliveryAppContext';

function App() {
  const {
    // adicione aqui os states criados no arquivo DeliveryAppContext.jsx
  } = useContext(DeliveryAppContext);

  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>

  );
}

export default App;
