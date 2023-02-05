import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import DeliveryAppContext from '../Context/DeliveryAppContext';
import regexEmail from '../utils/regexEmail';
import { getRegister } from '../Services/DeliveryAppApi';

const DOZE = 12;
const SEIS = 6;

export default function Register(props) {
  const {
    name, email, password,
    setName,
    setEmail,
    setPassword,
  } = useContext(DeliveryAppContext);
  const [mailIsValid, setMailIsValid] = useState(false);
  const [passIsValid, setPassIsValid] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);
  // const [buttonIsEnabled, setButtonIsEnabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value.length < DOZE) {
      setNameIsValid(false);
      return setErrorMsg('O nome deve ter no mínimo 12 caracteres');
    }
    setNameIsValid(true);
    return setErrorMsg('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < SEIS) {
      setPassIsValid(false);
      return setErrorMsg('A senha precisa ter no mínimo 6 caracteres');
    }
    setPassIsValid(true);
    return setErrorMsg('');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!regexEmail.test(event.target.value)) {
      setMailIsValid(false);
      return setErrorMsg('O campo e-mail precisa ser de um tipo válido!');
    }
    setMailIsValid(true);
    return setErrorMsg('');
  };

  const onClickRegister = async () => {
    const { history } = props;
    const { message, ...user } = await getRegister(name, email, password);
    if (message === 'Conflict') {
      return setErrorMsg('Usuário já cadastrado');
    }
    setErrorMsg('');
    localStorage.setItem('user', JSON.stringify(user));
    return history.push('/customer/products');
  };

  const buttonAllowed = `bg-yellow px-5 h-12 rounded-md
  font-bold flex text-center items-center gap-3 hover:text-black`;

  const buttonNotAllowed = `bg-yellow cursor-not-allowed px-5 h-12 rounded-md
  font-bold flex items-center gap-3 hover:text-black`;

  const inputStyle = `bg-zinc py-3 px-4 rounded text-sm
    placeholder:text-zinc-light w-full`;

  return (
    <>
      <div
        className={ `flex flex-col justify-center font-semibold fixed py-10 px-10
      bg-darkGray text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
       w-[450px] rounded-lg` }
      >
        <form className="flex flex-col justify-center gap-4">
          <h1
            className={ `flex justify-center text-center
            text-4xl font-semibold` }
          >
            Register
          </h1>
          <label htmlFor="newUserName">
            <p className="py-2">Nome</p>
            <input
              className={ inputStyle }
              id="newUserName"
              name="name"
              data-testid="common_register__input-name"
              type="text"
              placeholder="Seu Nome"
              value={ name }
              onChange={ handleNameChange }
            />
          </label>
          <label htmlFor="newUserEmail">
            <p className="py-2">Email</p>
            <input
              className={ inputStyle }
              id="newUserEmail"
              name="email"
              data-testid="common_register__input-email"
              type="text"
              placeholder="seu-email@site.com.br"
              value={ email }
              onChange={ handleEmailChange }
            />
          </label>
          <label htmlFor="newUserPassword">
            <p className="py-2">Senha</p>
            <input
              className={ inputStyle }
              id="newUserPassword"
              name="password"
              data-testid="common_register__input-password"
              type="password"
              placeholder="**********"
              value={ password }
              onChange={ handlePasswordChange }
            />
          </label>
          <div className="mt-4 flex justify-end gap-4">
            <button
              className={ !mailIsValid || !passIsValid || !nameIsValid
                ? buttonNotAllowed : buttonAllowed }
              id="sendButton"
              data-testid="common_register__button-register"
              type="button"
              disabled={ !mailIsValid || !passIsValid || !nameIsValid }
              onClick={ onClickRegister }
            >
              CADASTRAR
            </button>
          </div>
        </form>
      </div>
      <span data-testid="common_register__element-invalid_register">
        { errorMsg }
      </span>
    </>
  );
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
