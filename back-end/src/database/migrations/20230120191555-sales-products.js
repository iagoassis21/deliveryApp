'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'sale_id',
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'product_id',
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
