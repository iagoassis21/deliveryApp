import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import DeliveryAppContext from '../Context/DeliveryAppContext';
import logo from '../images/logo.svg';
import regexEmail from '../utils/regexEmail';

export default function Login(props) {
  const {
    email, password,
    setEmail,
    setPassword,
  } = useContext(DeliveryAppContext);
  const [disabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (param) => {
    if (!regexEmail.test(param)) {
      setDisabled(true);
      return setErrorMsg('O campo e-mail precisa ser um e-mail válido!');
    }
    setErrorMsg('');
    return setEmail(param);
  };

  const validatePassword = (param) => {
    if (param.length < +'7') {
      setDisabled(false);
      return setErrorMsg('O campo da senha precisa ter no mínimo 6 caracteres');
    }
    setDisabled(true);
    setErrorMsg('');
    return setPassword(param);
  };

  const onClickLogin = () => {
    // implementar logica para redirecionar se estiver tudo certo
  };

  const onClickRegister = () => {
    const { history } = props;
    history.push('/register');
  };

  useEffect(() => {
    if (email && password) return setDisabled(false);
  }, [email, password]);

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
              type="email"
              data-testid="common_login__input-email"
              placeholder="Email"
              onChange={ ({ target: { value } }) => validateEmail(value) }
            />
          </label>
          <label htmlFor="inputPass">
            <input
              id="inputPass"
              data-testid="common_login__input-password"
              placeholder="Senha"
              onChange={ ({ target: { value } }) => validatePassword(value) }
            />
          </label>
          <button
            className="login-button"
            type="button"
            data-testid="common_login__button-login"
            disabled={ disabled }
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
