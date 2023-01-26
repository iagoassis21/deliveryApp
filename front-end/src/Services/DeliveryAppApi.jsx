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

export const getRegisterByAdm = async ({ nameParams,
  emailParams, passParams, roleParams }) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};
