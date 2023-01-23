import React, { useState, useContext, useEffect } from 'react';
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

  const [buttonIsEnabled, setButtonIsEnabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const validateName = (param) => {
    if (param.length < DOZE) {
      setButtonIsEnabled(true);
      return setErrorMsg('O campo nome precisa ter no mínimo 12 caracteres');
    }
    setErrorMsg('');
    return setName(param);
  };

  const validatePassword = (param) => {
    if (param.length < SEIS) {
      setButtonIsEnabled(true);
      return setErrorMsg('O campo da senha precisa ter no mínimo 6 caracteres');
    }
    setErrorMsg('');
    return setPassword(param);
  };

  const validateEmail = (param) => {
    if (!regexEmail.test(param)) {
      setButtonIsEnabled(true);
      return setErrorMsg('O campo e-mail precisa ser um e-mail válido!');
    }
    setErrorMsg('');
    return setEmail(param);
  };

  useEffect(() => {
    if (name && email && password) return setButtonIsEnabled(false);
  }, [name, email, password]);

  return (
    <>
      <form>
        <label htmlFor="newUserName">
          Nome
          <br />
          <input
            id="newUserName"
            type="text"
            placeholder="Seu Nome"
            data-testid="common_register__input-name"
            onChange={ ({ target: { value } }) => validateName(value) }
          />
        </label>
        <br />
        <label htmlFor="newUserEmail">
          Email
          <br />
          <input
            id="newUserEmail"
            type="text"
            placeholder="seu-email@site.com.br"
            data-testid="common_register__input-email"
            onChange={ ({ target: { value } }) => validateEmail(value) }
          />
        </label>
        <br />
        <label htmlFor="newUserPassword">
          Senha
          <br />
          <input
            id="newUserPassword"
            type="password"
            placeholder="**********"
            data-testid="common_register__input-password"
            onChange={ ({ target: { value } }) => validatePassword(value) }
          />
        </label>
        <br />
        <button
          id="sendButton"
          type="button"
          data-testid="common_register__input-register"
          disabled={ buttonIsEnabled }
        >
          CADASTRO
        </button>
      </form>
      <span data-testid="common_register__input-invalid_register">
        { errorMsg }
      </span>
    </>
  );
}
