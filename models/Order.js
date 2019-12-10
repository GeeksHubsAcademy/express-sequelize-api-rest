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
    Order.hasMany(models.Product);
    Order.hasOne(models.User);
  };
  Order.sync().catch(error =>
    console.error(`couldn't connect to database`, error),
  );
  return Order;
};
