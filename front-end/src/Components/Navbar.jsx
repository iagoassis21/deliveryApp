// import { useContext } from 'react';
// import DeliveryAppContext from '../Context/DeliveryAppContext';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function Navbar(props) {
  // const { user } = useContext(DeliveryAppContext)
  // deixei essas linhas comentadas pois mais para frente pensei em usa-las para pegar o nome do usuario pelo state
  const { name, page } = props;
  const history = useHistory();
  const onClickNavigation = (setPath) => {
    history.push(setPath);
    window.location.reload();
  };

  return (
    <header className="header-container">
      <nav>
        <h3 data-testid="customer_products__element-navbar-link-orders">{page}</h3>
        {page !== 'Admin'
          ? null
          : (
            <button
              type="button"
              onClick={ () => onClickNavigation('orders') }
              className="ordersBtn"
            >
              Meus Pedidos
            </button>
          )}
        <h3 data-testid="customer_products__element-navbar-user-full-name">{name}</h3>
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
        >
          Sair

        </button>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
