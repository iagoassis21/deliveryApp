import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import DeliveryAppContext from '../Context/DeliveryAppContext';
import logo from '../images/logo.svg';
import regexEmail from '../utils/regexEmail';
import { getLoginApp } from '../Services/DeliveryAppApi';

export default function Login(props) {
  const { email, password, setEmail, setPassword } = useContext(DeliveryAppContext);
  const [mailIsValid, setMailIsValid] = useState(false);
  const [passIsValid, setPassIsValid] = useState(false);
  // const [deliveryDate, setDeliveryDate] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  // const [validLogin, setValidLogin] = useState(false);
  const seis = 6;

  // useEffect(() => {
  //   const getDelivery = async () => {
  //     const data = await getDeliveryData();
  //     setDeliveryDate(data);
  //   };
  //   getDelivery();
  // }, []);

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

  const onClickLogin = async () => {
    const { history } = props;
    const { message } = await getLoginApp(email, password);
    if (message === 'Not found') {
      return setErrorMsg('Dados Invalidos');
    }
    setErrorMsg('');
    return history.push('/customer/products');
  };

  const onClickRegister = () => {
    const { history } = props;
    history.push('/register');
  };

  const loginTestId = 'common_login__element-invalid-email';

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
          {errorMsg && <p data-testid={ loginTestId }>{ errorMsg }</p>}
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
