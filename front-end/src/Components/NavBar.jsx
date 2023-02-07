import { List, ShoppingBagOpen, SignOut, User } from 'phosphor-react';
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

  const buttonStyles = `py-1 px-3 rounded-md bg-darkGray border border-yellow
  font-bold flex text-center items-center justify-center gap-1 hover:bg-yellow
text-yellow hover:text-black href="#"`;

  return (
    <ul className="flex justify-evenly bg-darkGray py-4 sm:max-w-8 sm:h-full">
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
                  <List />
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
            <ShoppingBagOpen size={ 22 } />
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
          <User />
          {name}
        </span>
      </li>
      <li className="flex justify-center">
        <button
          className={ buttonStyles }
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logout }
        >
          <SignOut />
          Sair
        </button>
      </li>
    </ul>
  );
}
