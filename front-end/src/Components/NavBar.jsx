/* eslint-disable react/jsx-max-depth */
import { List, ShoppingBagOpen, SignOut, User } from 'phosphor-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

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
    <div className="flex justify-between py-4 pl-8 pr-8 bg-darkGray ">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex justify-center items-center">
          <div
            className={ `py-1 px-2 rounded bg-darkGray border border-yellow
           hover:bg-yellow text-yellow hover:text-black` }
          >
            <button
              className="flex justify-center items-center"
              type="button"
            >
              <List size={ 22 } />
            </button>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={ 5 }
            className={ `border border-1 rounded px-2 py-2 bg-white
           shadow-sm transition-all duration-150 will-change-transform` }
          >
            <DropdownMenu.Item>
              {
                role === 'customer'
            && (
              <div className="mr-3">
                <button
                  className={ buttonStyles }
                  type="button"
                  data-testid={ testId }
                  onClick={ () => history.push('/customer/products') }
                >
                  Produtos
                </button>
              </div>
            )
              }
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              { role === 'administrator' ? null : (
                <div>
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
                </div>
              )}
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <div>
                <span
                  className={ buttonStyles }
                  href="#"
                  type="button"
                  data-testid="customer_products__element-navbar-user-full-name"
                >
                  <User />
                  {name}
                </span>
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <div
        className="text-white font-semibold flex text-center
      items-center justify-center"
      >
        Delivery10
      </div>
      <div>
        <button
          className={ buttonStyles }
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logout }
        >
          <SignOut size={ 22 } />
          Sair
        </button>
      </div>
    </div>
  );
}
