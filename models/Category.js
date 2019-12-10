'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {

    Category.belongsTo(models.Product);

  };
   Category.sync().catch(error =>
     console.error(`couldn't connect to database`, error),
   );
  return Category;
};