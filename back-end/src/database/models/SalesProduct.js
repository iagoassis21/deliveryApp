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
    models.Product.belongsToMany(models.Sale, {
      foreignKey: 'productId',
      through: 'SalesProduct',
      // otherKey: 'saleId',
      as: 'sales',
    });
  }

    SalesProduct.associate = (models) => {
      models.Sale.belongsToMany(models.Product, {
        foreignKey: 'saleId',
        through: 'SalesProduct',
        // otherKey: 'productId',
        as: 'products',
      });
    }

  return SalesProduct;
}
