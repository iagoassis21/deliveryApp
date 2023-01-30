import React, { useEffect, useState } from 'react';
import AdmForm from '../Components/adminForm';
import NavBar from '../Components/navBar';
import { getUsersData, deleteUsers } from '../Services/DeliveryAppApi';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState([]);

  useEffect(() => {
    const data = async () => {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      setToken(userInfo.token);
      const response = await getUsersData(userInfo.token);
      setUsers(response);
    };
    data();
  }, []);

  const handleDelete = async (id) => {
    await deleteUsers(id, token);
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <NavBar page="Gerenciar Usuários" name="Admin" />
      <AdmForm setUsers={ setUsers } token={ token } />
      {
        users.map((item, index) => (
          <div key={ item.id }>
            <p
              data-testid={ `admin_manage__element-user-table-item-number-${index}` }
            >
              {item.id}
            </p>
            <p
              data-testid={ `admin_manage__element-user-table-name-${index}` }
            >
              {item.name}
            </p>
            <p
              data-testid={ `admin_manage__element-user-table-email-${index}` }
            >
              {item.email}
            </p>
            <p
              data-testid={ `admin_manage__element-user-table-role-${index}` }
            >
              {item.role}
            </p>
            <button
              type="submit"
              data-testid={ `admin_manage__element-user-table-remove-${index}` }
              onClick={ () => handleDelete(item.id) }
            >
              Deletar
            </button>
          </div>
        ))
      }
    </div>
  );
}
