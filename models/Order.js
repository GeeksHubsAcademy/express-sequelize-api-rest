'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      status: DataTypes.STRING,
      totalPrice: DataTypes.FLOAT,
    },
    {},
  );
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsToMany(models.Product, {
      through: 'order_product',
    });
    Order.hasOne(models.User);
    Order.sync()
      .then(() => {
        console.log('sync order');
      })
      .catch(error =>
        console.error(`couldn't connect to database`, error),
      );
  };

  return Order;
};
