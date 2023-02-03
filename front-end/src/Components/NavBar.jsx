import React from 'react';
import { useHistory } from 'react-router-dom';

const testId = 'customer_products__element-navbar-link-products';

export default function NavBar() {
  const history = useHistory();
  const onClickNavigation = (setPath) => {
    history.push(setPath);
  };

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  const { name, role } = JSON.parse(localStorage.getItem('user'));

  const buttonStyles = `inline-block font-medium border border-yellow rounded
  py-1 px-3 hover:bg-yellow text-yellow hover:text-black
  href="#"`;

  return (
    <ul className="flex justify-evenly bg-darkGray px-2 sm:px-4 py-3.5 ">
      {
        role === 'customer'
            && (
              <li className="mr-3">
                <button
                  className={ buttonStyles }
                  type="button"
                  data-testid={ testId }
                  onClick={ () => history.push('/customer/products') }
                >
                  Produtos

                </button>
              </li>
            )
      }
      { role === 'administrator' ? null : (
        <li>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ role === 'customer'
              ? () => onClickNavigation('/customer/orders')
              : () => onClickNavigation('/seller/orders') }
            className={ buttonStyles }
            href="#"
          >
            Meus Pedidos
          </button>
        </li>
      )}
      <li>
        <span
          className={ buttonStyles }
          href="#"
          type="button"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {name}
        </span>
      </li>
      <li>
        <button
          className={ buttonStyles }
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logout }
        >
          Sair
        </button>
      </li>
    </ul>
  );
}
