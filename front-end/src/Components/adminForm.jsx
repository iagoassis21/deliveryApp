import React, { useState } from 'react';
import { getRegisterByAdm } from '../Services/DeliveryAppApi';

function AdmForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(nome, email, senha, tipoUsuario);
  };

  const createUser = async () => {
    const newUser = {
      nameParams: nome,
      emailParams: email,
      passParams: senha,
      roleParams: tipoUsuario,
    };
    await getRegisterByAdm(newUser);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="nameinput">
        Nome:
        <input
          type="text"
          data-testid="admin_manage__input-name"
          value={ nome }
          onChange={ (event) => setNome(event.target.value) }
        />
      </label>
      <br />
      <label htmlFor="emailInput">
        Email:
        <input
          type="email"
          data-testid="admin_manage__input-email"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
        />
      </label>
      <br />
      <label htmlFor="passInput">
        Senha:
        <input
          type="password"
          data-testid="admin_manage__input-password"
          value={ senha }
          onChange={ (event) => setSenha(event.target.value) }
        />
      </label>
      <br />
      <label htmlFor="statusInput">
        Tipo de Usuário:
        <select
          data-testid="admin_manage__select-role"
          value={ tipoUsuario }
          onChange={ (event) => setTipoUsuario(event.target.value) }
        >
          <option value="admin"> Admin</option>
          <option value="seller">Seller</option>
          <option value="costumer">Comum</option>
        </select>
      </label>
      <br />
      <button
        type="button"
        onClick={ () => createUser() }
      >
        Cadastrar
      </button>
    </form>
  );
}

export default AdmForm;
