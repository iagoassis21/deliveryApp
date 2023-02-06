/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getRegisterByAdm, getUsersData } from '../Services/DeliveryAppApi';
import regexEmail from '../utils/regexEmail';

function AdmForm({ setUsers, token }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const NAME_LENGHT = 12;
  const PASSWORD_LENGHT = 6;

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, role } = formData;
    const newUser = {
      name,
      email,
      password,
      role,
      token,
    };
    await getRegisterByAdm(newUser);
    const users = await getUsersData(token);
    setUsers(users);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'customer',
    });
  };

  React.useEffect(() => {
    const isNameValid = formData.name.length >= NAME_LENGHT;
    const isEmailValid = regexEmail.test(formData.email);
    const isPasswordValid = formData.password.length >= PASSWORD_LENGHT;

    setIsButtonDisabled(!(isNameValid && isEmailValid && isPasswordValid));
  }, [formData]);

  const inputStyle = `bg-zinc py-2 px-4 rounded text-sm
  placeholder:text-zinc-light w-full`;

  const buttonAllowed = `bg-yellow px-5 h-12 rounded-md
  font-bold flex text-center items-center gap-3 hover:text-black`;

  const buttonNotAllowed = `bg-yellow cursor-not-allowed px-5 h-12 rounded-md
  font-bold flex items-center gap-3 hover:text-black`;

  return (
    <div
      className={ `flex flex-col justify-center font-semibold py-3 px-10
    bg-darkGray text-white w-[450px] rounded-lg` }
    >
      <form
        onSubmit={ handleFormSubmit }
        className="flex flex-col justify-center gap-4"
      >
        <div className="mb-2">
          <label
            htmlFor="name"
          >
            <p className="py-2">Nome</p>
            <input
              autoComplete="off"
              className={ inputStyle }
              type="text"
              id="name"
              name="name"
              data-testid="admin_manage__input-name"
              value={ formData.name }
              onChange={ handleInputChange }
            />
          </label>
        </div>

        <div className="mb-2">
          <label htmlFor="email">
            Email:
            <input
              autoComplete="off"
              type="email"
              id="email"
              name="email"
              data-testid="admin_manage__input-email"
              value={ formData.email }
              onChange={ handleInputChange }
              className={ inputStyle }
            />
          </label>
        </div>

        <div className="mb-2">
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              data-testid="admin_manage__input-password"
              value={ formData.password }
              onChange={ handleInputChange }
              className={ inputStyle }
            />
          </label>
        </div>

        <div className="mb-2">
          <label htmlFor="role">
            Role:
            <select
              id="role"
              name="role"
              data-testid="admin_manage__select-role"
              value={ formData.role }
              onChange={ handleInputChange }
              className={ inputStyle }
            >
              <option value="customer">customer</option>
              <option value="seller">seller</option>
            </select>
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={ isButtonDisabled }
            data-testid="admin_manage__button-register"
            className={ isButtonDisabled ? buttonNotAllowed : buttonAllowed }
          >
            Submit
          </button>
        </div>
        <span data-testid="admin_manage__element-invalid-register" />
      </form>
    </div>
  );
}

AdmForm.propTypes = {
  token: PropTypes.string.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default AdmForm;
