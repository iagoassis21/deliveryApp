import React, { useState } from 'react';
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
    console.log('Form submitted', formData);
    // const userInfo = JSON.parse(localStorage.getItem('user'));
    // const { token } = userInfo;
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

  return (
    <form onSubmit={ handleFormSubmit }>
      <div>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            data-testid="admin_manage__input-name"
            value={ formData.name }
            onChange={ handleInputChange }
          />
        </label>
      </div>

      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            data-testid="admin_manage__input-email"
            value={ formData.email }
            onChange={ handleInputChange }
          />
        </label>
      </div>

      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            data-testid="admin_manage__input-password"
            value={ formData.password }
            onChange={ handleInputChange }
          />
        </label>
      </div>

      <div>
        <label htmlFor="role">
          Role:
          <select
            id="role"
            name="role"
            data-testid="admin_manage__select-role"
            value={ formData.role }
            onChange={ handleInputChange }
          >
            <option value="customer">customer</option>
            <option value="seller">seller</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        disabled={ isButtonDisabled }
        data-testid="admin_manage__button-register"
      >
        Submit
      </button>
      <span data-testid="admin_manage__element-invalid-register" />
    </form>
  );
}

export default AdmForm;
