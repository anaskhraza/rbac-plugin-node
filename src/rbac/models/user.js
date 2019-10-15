
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    designation: DataTypes.STRING,
    managerlevel: DataTypes.STRING,
    manager_id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    isactive: DataTypes.BOOLEAN,
  }, {});
  users.associate = function (models) {
    models.users.hasMany(users, {
      foreignKey: "manager_id",
      sourceKey: "id",
      as: "managerid"
    });
  };
  return users;
};
