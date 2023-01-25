'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'product_id',
      },
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'sale_id',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales_products');
  }
};
