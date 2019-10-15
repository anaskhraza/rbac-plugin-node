'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_permissions = sequelize.define('user_permissions', {
    roleid: DataTypes.INTEGER,
    permissionid: DataTypes.INTEGER
  }, {});
  user_permissions.associate = function(models) {
    // associations can be defined her
    
    models.permissions.hasMany(user_permissions, {
      foreignKey: "permissionid",
      sourceKey: "id",
      as: "permissions"
    });
    user_permissions.belongsTo(models.permissions, {
      foreignKey: "permissionid",
      targetKey: "id",
      as: "permissions"
    });
    models.roles.hasMany(user_permissions, {
      foreignKey: "roleid",
      sourceKey: "id",
      as: "roles permission"
    });
    user_permissions.belongsTo(models.roles, {
      foreignKey: "roleid",
      targetKey: "id",
      as: "roles"
    });
  };
  return user_permissions;
};