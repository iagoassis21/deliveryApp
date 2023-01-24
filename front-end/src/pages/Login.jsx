import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import DeliveryAppContext from '../Context/DeliveryAppContext';
import logo from '../images/logo.svg';
import regexEmail from '../utils/regexEmail';

export default function Login(props) {
  const {
    email, password,
    setEmail,
    setPassword,
  } = useContext(DeliveryAppContext);
  const [mailIsValid, setMailIsValid] = useState(false);
  const [passIsValid, setPassIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const seis = 6;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!regexEmail.test(event.target.value)) {
      setMailIsValid(false);
      return setErrorMsg('O campo e-mail precisa ser um e-mail válido!');
    }
    setMailIsValid(true);
    return setErrorMsg('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < seis) {
      setPassIsValid(false);
      return setErrorMsg('O campo da senha precisa ter no mínimo 6 caracteres');
    }
    setPassIsValid(true);
    return setErrorMsg('');
  };

  const onClickLogin = () => {
    // implementar logica para redirecionar se estiver tudo certo
  };

  const onClickRegister = () => {
    const { history } = props;
    history.push('/register');
  };

  return (
    <div className="loginPage">
      <form className="login-form">
        <div>
          <img src={ logo } alt="logo" className="image-logo" />
          <p>GRUPO 10</p>
        </div>
        <div>
          <label htmlFor="inputEmail">
            <input
              id="inputEmail"
              name="email"
              data-testid="common_login__input-email"
              placeholder="Email"
              value={ email }
              onChange={ handleEmailChange }
            />
          </label>
          <label htmlFor="inputPass">
            <input
              id="inputPass"
              name="password"
              data-testid="common_login__input-password"
              placeholder="Senha"
              value={ password }
              onChange={ handlePasswordChange }
            />
          </label>
          <button
            className="login-button"
            type="button"
            data-testid="common_login__button-login"
            disabled={ !mailIsValid || !passIsValid }
            onClick={ onClickLogin }
          >
            Entrar
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
            onClick={ onClickRegister }
          >
            Ainda não tenho conta
          </button>
          <span
            data-testid="common_login__element-invalid-email"
          >
            {errorMsg}
          </span>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
