'use strict';
module.exports = (sequelize, DataTypes) => {
  const permissions = sequelize.define('permissions', {
    name: DataTypes.STRING
  }, {});
  permissions.associate = function(models) {
    // associations can be defined here
  };
  return permissions;
};