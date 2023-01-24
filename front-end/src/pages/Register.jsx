import React, { useState, useContext } from 'react';
import DeliveryAppContext from '../Context/DeliveryAppContext';
import regexEmail from '../utils/regexEmail';

const DOZE = 12;
const SEIS = 6;

export default function Register() {
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
      return setErrorMsg('O campo nome precisa ter no mínimo 12 caracteres');
    }
    setNameIsValid(true);
    return setErrorMsg('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < SEIS) {
      setPassIsValid(false);
      return setErrorMsg('O campo da senha precisa ter no mínimo 6 caracteres');
    }
    setPassIsValid(true);
    return setErrorMsg('');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!regexEmail.test(event.target.value)) {
      setMailIsValid(false);
      return setErrorMsg('O campo e-mail precisa ser um e-mail válido!');
    }
    setMailIsValid(true);
    return setErrorMsg('');
  };

  return (
    <>
      <form>
        <label htmlFor="newUserName">
          Nome
          <br />
          <input
            id="newUserName"
            name="name"
            data-testid="common_register__input-name"
            type="text"
            placeholder="Seu Nome"
            value={ name }
            onChange={ handleNameChange }
          />
        </label>
        <br />
        <label htmlFor="newUserEmail">
          Email
          <br />
          <input
            id="newUserEmail"
            name="email"
            data-testid="common_register__input-email"
            type="text"
            placeholder="seu-email@site.com.br"
            value={ email }
            onChange={ handleEmailChange }
          />
        </label>
        <br />
        <label htmlFor="newUserPassword">
          Senha
          <br />
          <input
            id="newUserPassword"
            name="password"
            data-testid="common_register__input-password"
            type="password"
            placeholder="**********"
            value={ password }
            onChange={ handlePasswordChange }
          />
        </label>
        <br />
        <button
          id="sendButton"
          data-testid="common_register__button-register"
          type="button"
          disabled={ !mailIsValid || !passIsValid || !nameIsValid }
        >
          CADASTRAR
        </button>
      </form>
      <span data-testid="common_register__element-invalid_register">
        { errorMsg }
      </span>
    </>
  );
}
