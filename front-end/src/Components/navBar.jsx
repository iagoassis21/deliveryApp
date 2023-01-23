// import { useContext } from 'react';
// import DeliveryAppContext from '../Context/DeliveryAppContext';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function NavBar(item) {
  // const { user } = useContext(DeliveryAppContext)
  // deixei essas linhas comentadas pois mais para frente pensei em usa-las para pegar o nome do usuario pelo state
  const history = useHistory();
  const onClickNavigation = (setPath) => {
    history.push(setPath);
    window.location.reload();
  };

  return (
    <header className="header-container">
      <nav>
        <button type="button">Produtos</button>
        <button
          type="button"
          onClick={ () => onClickNavigation('orders') }
          className="ordersBtn"
        >
          Meus Pedidos
        </button>
        <button type="button">Cicrano da Silva</button>
        <button type="button">Sair</button>
      </nav>
    </header>
  );
}
