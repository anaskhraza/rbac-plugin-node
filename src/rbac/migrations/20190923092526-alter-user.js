"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    var sequelize = queryInterface.sequelize;
    return sequelize.transaction(function(t) {
      var migrations = [];
      migrations.push(
        queryInterface.addColumn("users", "managerlevel", {
          type: Sequelize.STRING,
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("users", "manager_id", {
          type: Sequelize.INTEGER,
          references: {
            model: "users", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          defaultValue: null,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.addColumn("users", "isactive", {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          transaction: t
        })
      );
      return Promise.all(migrations);
    });
  },

  down: (queryInterface, Sequelize) => {
    var sequelize = queryInterface.sequelize;
    return sequelize.transaction(function(t) {
      var migrations = [];
      migrations.push(
        queryInterface.removeColumn("users", "managerlevel", {
          type: Sequelize.STRING,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.removeColumn("users", "manager_id", {
          type: Sequelize.INTEGER,
          transaction: t
        })
      );
      migrations.push(
        queryInterface.removeColumn("users", "isactive", {
          type: Sequelize.BOOLEAN,
          transaction: t
        })
      );

      return Promise.all(migrations);
    });
  }
};
