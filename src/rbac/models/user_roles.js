'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_roles = sequelize.define('user_roles', {
    roleid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});
  user_roles.associate = function(models) {
    models.users.hasMany(user_roles, {
      foreignKey: "userid",
      sourceKey: "id",
      as: "users roles"
    });
    user_roles.belongsTo(models.users, {
      foreignKey: "userid",
      targetKey: "id",
      as: "users"
    });
    models.roles.hasMany(user_roles, {
      foreignKey: "roleid",
      sourceKey: "id",
      as: "user roles"
    });
    user_roles.belongsTo(models.roles, {
      foreignKey: "roleid",
      targetKey: "id",
      as: "roles"
    });
  };
  return user_roles;
};