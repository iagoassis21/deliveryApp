module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define(
    "SalesProduct",
    {
      saleId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'sales_products',
    }
  );

  SalesProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sales, {
      foreignKey: 'productId',
      otherKey: 'saleId',
      as: 'sales',
    });
  }

    SalesProduct.associate = (models) => {
      models.Sale.belongsToMany(models.Product, {
        foreignKey: 'saleId',
        otherKey: 'productId',
        as: 'products',
      });
    }

  return SalesProduct;
}
