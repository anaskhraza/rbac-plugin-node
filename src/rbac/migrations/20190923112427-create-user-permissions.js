'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleid: {
        type: Sequelize.INTEGER,
        references: {
          model: "roles", // name of Target model
          key: "id" // key in Target model that we're referencing
        }
      },
      permissionid: {
        type: Sequelize.INTEGER,
        references: {
          model: "permissions", // name of Target model
          key: "id" // key in Target model that we're referencing
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_permissions');
  }
};