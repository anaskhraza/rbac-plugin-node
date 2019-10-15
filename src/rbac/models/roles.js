'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    name: DataTypes.STRING,
    isactive: DataTypes.BOOLEAN
  }, {});
  roles.associate = function(models) {
    // associations can be defined here
  };
  return roles;
};