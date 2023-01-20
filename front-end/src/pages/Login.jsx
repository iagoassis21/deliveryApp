import React, { useState } from 'react';
import logo from '../images/logo.svg';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const validateEmail = () => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return !!(email.match(emailRegex));
  };

  const validatePassword = () => {
    const passwordLength = 6;
    return password.length >= passwordLength;
  };

  const changeEmail = ({ target: { value } }) => {
    setEmail(value);
    setDisabled(!(validateEmail() && validatePassword()));
  };

  const changePassword = ({ target: { value } }) => {
    setPassword(value);
    setDisabled(!(validateEmail() && validatePassword()));
  };

  const onClickLogin = () => {
    // Implemente aqui a lógica para fazer login
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
          <input
            name="email"
            type="email"
            data-testid="common_login__input-email"
            placeholder="Email"
            onChange={ changeEmail }
            value={ email }
          />
          <input
            name="password"
            type="email"
            data-testid="common_login__input-email"
            placeholder="Senha"
            onChange={ changePassword }
            value={ password }
          />
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
          <span>Elemento oculto (Mensagens de erro)</span>
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
