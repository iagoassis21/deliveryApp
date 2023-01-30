const URL = 'http://localhost:3001';

export const getDeliveryData = async () => {
  try {
    const response = await fetch(`${URL}/products`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getLoginApp = async (emailParams, passParams) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailParams, password: passParams }),
  };
  try {
    const response = await fetch(`${URL}/login`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getRegister = async (nameParams, emailParams, passParams) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameParams,
      email: emailParams,
      password: passParams,
    }),
  };
  try {
    const response = await fetch(`${URL}/register`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getRegisterByAdm = async ({ name,
  email, password, role, token }) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
    body: JSON.stringify({
      name,
      email,
      password,
      role,
    }),
  };
  try {
    const response = await fetch(`${URL}/admin/manager`, options);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersData = async (token) => {
  try {
    const response = await fetch(
      `${URL}/admin`,
      { method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        } },
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUsers = async (id, token) => {
  try {
    await fetch(
      `${URL}/admin/manager/${id}`,
      { method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        } },
    );
    console.log(`O usuário ${id} foi deletado`);
  } catch (error) {
    console.log(error);
  }
};
