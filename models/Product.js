'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: () => new Date()
      }
    },
    {},
  );
  Product.associate = function(models) {
    Product.hasOne(models.Category);
    Product.belongsToMany(models.Order, {through: 'order_product'});
    Product.sync()
      .then(() => {
        console.log('sync product');
      })
      .catch(error =>
        console.error(`couldn't connect to database`, error),
      );
  };

  return Product;
};
