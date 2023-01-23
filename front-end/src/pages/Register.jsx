import React from 'react';

export default function Register() {
  const onSubmit = (e) => {
    console.log('oi');
    e.preventDefault();
  };

  return (
    <form onSubmit={ onSubmit }>
      <label htmlFor="newUserName">
        Nome
        <br />
        <input
          id="newUserName"
          type="text"
          placeholder="Seu Nome"
          data-testid="common_register__input-name"
        />
      </label>
      <br />
      <label htmlFor="newUserEmail">
        Email
        <br />
        <input
          id="newUserEmail"
          type="email"
          placeholder="seu-email@site.com.br"
          data-testid="common_register__input-email"
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
        />
      </label>
      <br />
      <input
        type="submit"
        value="CADASTRAR"
        data-testid="common_register__input-register"
      />
    </form>
  );
}
