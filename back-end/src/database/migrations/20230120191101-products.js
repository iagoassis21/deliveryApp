'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      urlImage: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
