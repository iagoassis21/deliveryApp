const URL = 'http://localhost:3001';

const headerParam = { 'Content-Type': 'application/json' };

export const getDeliveryData = async (token) => {
  const options = {
    method: 'GET',
    headers: {
      ...headerParam,
      Authorization: token,
    },
  };
  try {
    const response = await fetch(`${URL}/products`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getLoginApp = async (emailParams, passParams) => {
  const options = {
    method: 'POST',
    headers: headerParam,
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
    headers: headerParam,
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
    console.log('erro na tentativa de registro', error);
  }
};

export const getRegisterByAdm = async ({ nameParams,
  emailParams, passParams, roleParams }) => {
  const options = {
    method: 'POST',
    headers: headerParam,
    body: JSON.stringify({
      name: nameParams,
      email: emailParams,
      password: passParams,
      role: roleParams,
    }),
  };
  try {
    const response = await fetch(`${URL}/admin/manager`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
