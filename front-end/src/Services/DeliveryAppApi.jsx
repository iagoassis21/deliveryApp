const getDeliveryData = async () => {
  const response = await fetch('https://localhost:3000');
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getDeliveryData;