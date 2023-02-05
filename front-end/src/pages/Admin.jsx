import React, { useEffect, useState } from 'react';
import AdmForm from '../Components/adminForm';
import NavBar from '../Components/NavBar';
import { getUsersData, deleteUsers } from '../Services/DeliveryAppApi';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState([]);

  const buttonStyles = `bg-darkGray font-medium border p-4 border-yellow rounded
  py-0.25 px-2.5 mx-2 hover:bg-yellow text-yellow hover:text-black 
  href="#"`;

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
      <NavBar />
      <div
        className="grid justify-items-center"
      >
        <AdmForm setUsers={ setUsers } token={ token } />
      </div>
      {
        users.map((item, index) => (
          <div
            key={ item.id }
            className="flex-col justify-center
            text-center font-medium border-2 border-lightYellow  rounded-lg shadow-xl"
          >
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <p
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                  className="inline-block p-4"
                >
                  {item.id}
                </p>
              </li>
              <li className="mr-2 grow">
                <p
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                  className="inline-block p-4"
                >
                  {item.name}
                </p>
              </li>
              <li className="mr-2 grow">
                <p
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                  className="inline-block p-4"
                >
                  {item.email}
                </p>
              </li>
              <li className="mr-2 grow">
                <p
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                  className="inline-block p-4"
                >
                  {item.role}
                </p>
              </li>
              <li className="mr-2">
                <button
                  type="submit"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  onClick={ () => handleDelete(item.id) }
                  className={ buttonStyles }
                >
                  Deletar
                </button>
              </li>
            </ul>
          </div>
        ))
      }
    </div>
  );
}
