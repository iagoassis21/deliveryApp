import React, { useContext } from 'react';
import DeliveryAppContext from './Context/DeliveryAppContext';

function App() {
  const {
    // adicione aqui os states criados no arquivo DeliveryAppContext.jsx
  } = useContext(DeliveryAppContext)

  return (
    <div className="App">
    </div>
  );
}

export default App;
