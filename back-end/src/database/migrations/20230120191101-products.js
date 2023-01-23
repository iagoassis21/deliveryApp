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
<<<<<<< HEAD
        type: Sequelize.DECIMAL,
=======
        type: Sequelize.STRING,
        field: 'url_image',
>>>>>>> 9664939fd38d6fcda1f3d7dbffe7c3979dd86eb3
      },
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
