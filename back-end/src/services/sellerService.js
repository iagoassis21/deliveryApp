const { User } = require('../database/models');

const getAllSellers = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' } });

  const sellerNamesAndRole = sellers.map(({ name, role }) => ({ name, role }));

  return sellerNamesAndRole;
};

module.exports = {
  getAllSellers,
};