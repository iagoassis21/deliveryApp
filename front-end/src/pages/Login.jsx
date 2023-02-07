/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { BeerBottle } from 'phosphor-react';
import DeliveryAppContext from '../Context/DeliveryAppContext';
import regexEmail from '../utils/regexEmail';
import { getLoginApp } from '../Services/DeliveryAppApi';

export default function Login() {
  const history = useHistory();
  const { email, password, setEmail, setPassword } = useContext(DeliveryAppContext);
  const [mailIsValid, setMailIsValid] = useState(false);
  const [passIsValid, setPassIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const seis = 6;

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log(user);
    if (!user) {
      return history.push('/login');
    }
    if (user.role === 'administrator') {
      return history.push('/admin/manage');
    }
    if (user.role === 'seller' || user.role === 'customer') {
      return history.push('/customer/products');
    }
  }, [history]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!regexEmail.test(event.target.value)) {
      setMailIsValid(false);
      return setErrorMsg('O campo e-mail precisa ser de um tipo válido!');
    }
    setMailIsValid(true);
    return setErrorMsg('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < seis) {
      setPassIsValid(false);
      return setErrorMsg('A senha possui no mínimo 6 caracteres');
    }
    setPassIsValid(true);
    return setErrorMsg('');
  };

  const onClickLogin = async (event) => {
    event.preventDefault();
    const { message, ...user } = await getLoginApp(email, password);
    if (message === 'Not found') {
      return setErrorMsg('Dados Inválidos');
    }
    setErrorMsg('');
    if (user.role === 'administrator') {
      setErrorMsg('');
      localStorage.setItem('user', JSON.stringify(user));
      return history.push('/admin/manage');
    }
    if (user.role === 'seller') {
      setErrorMsg('');
      localStorage.setItem('user', JSON.stringify(user));
      return history.push('seller/orders');
    }
    localStorage.setItem('user', JSON.stringify(user));
    setEmail('');
    setPassword('');
    return history.push('/customer/products');
  };

  const onClickRegister = () => {
    history.push('/register');
  };

  const loginTestId = 'common_login__element-invalid-email';

  const buttonAllowed = `bg-yellow px-5 h-12 rounded-md
   font-bold flex text-center items-center gap-3 hover:text-black`;

  const buttonNotAllowed = `bg-yellow cursor-not-allowed px-5 h-12 rounded-md
   font-bold flex items-center gap-3 hover:text-black`;

  const inputStyle = `bg-zinc py-3 px-4 rounded text-sm
    placeholder:text-zinc-light w-full`;

  return (
    <div
      className={ `flex flex-col justify-center font-semibold fixed py-10 px-10
       bg-darkGray text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        rounded-lg` }
    >
      <h1 className="flex justify-center pb-5">Delivery 10</h1>
      <Dialog.Root>
        <Dialog.Trigger
          className={ `bg-yellow py-5 h-12 rounded-md
   font-bold flex justify-center items-center text-center gap-3 hover:text-black` }
        >
          <button className="" type="button">
            Já possui conta?
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content
            className={ `fixed bg-darkGray py-8 px-10
           text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            rounded-lg w-[450px] shadow-lg shadow-black/25` }
          >
            <Dialog.Title className="flex justify-center text-4xl font-black">
              Sign In
            </Dialog.Title>
            <div className="flex justify-center">
              <form
                className="mt-8 flex flex-col justify-center gap-4"
                onSubmit={ onClickLogin }
              >
                <div className="flex flex-col gap-2">
                  <label className="font-semibold" htmlFor="inputEmail">
                    <p className="py-2">Email</p>
                    <input
                      className={ inputStyle }
                      autoComplete="off"
                      type="email"
                      id="inputEmail"
                      name="email"
                      data-testid="common_login__input-email"
                      placeholder="Digite seu email"
                      value={ email }
                      onChange={ handleEmailChange }
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold" htmlFor="inputPass">
                    <p className="py-2">Senha</p>
                    <input
                      className={ inputStyle }
                      id="inputPass"
                      name="password"
                      type="password"
                      data-testid="common_login__input-password"
                      placeholder="Digite sua senha"
                      value={ password }
                      onChange={ handlePasswordChange }
                    />
                  </label>
                </div>

                <div className="mt-4 flex justify-end gap-4">
                  <button
                    className={ !mailIsValid || !passIsValid
                      ? buttonNotAllowed : buttonAllowed }
                    type="submit"
                    data-testid="common_login__button-login"
                    disabled={ !mailIsValid || !passIsValid }
                  >
                    <BeerBottle />
                    Entrar
                  </button>
                  <Dialog.Close>
                    <button
                      className={ buttonAllowed }
                      type="button"
                    >
                      Cancelar
                    </button>
                  </Dialog.Close>
                </div>
              </form>
            </div>
            {errorMsg && (
              <p
                className="flex justify-center font-bold pt-6"
                data-testid={ loginTestId }
              >
                { errorMsg }

              </p>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="pt-5">
        <button
          className={ buttonAllowed }
          type="button"
          data-testid="common_login__button-register"
          onClick={ onClickRegister }
        >
          Ainda não tenho conta
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
