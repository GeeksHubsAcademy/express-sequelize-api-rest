module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
      },
    },
    {},
  );
//   User.associate = models => {
//     User.hasOne(models.User, {
//       foreignKey: 'fk_User',
//     });
//   };
User.sync().catch(error =>
  console.error(`couldn't connect to database`, error),
);
  return User;
};
