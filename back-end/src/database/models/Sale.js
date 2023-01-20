const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".")

module.exports = () => {
  const Sale = sequelize.define(
    "Sale",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      saleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: DataTypes.DECIMAL,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.INTEGER,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'users',
    }
  );

  Sale.associate = (models) => {
    models.belongsTo(models.User, {
      foreignKey: userId,
      as: 'users',
    });
  }
  Sale.associate = (models) => {
    models.belongsTo(models.User, {
      foreignKey: sellerId,
      as: 'sellers',
    });
  }

  return Sale;
}