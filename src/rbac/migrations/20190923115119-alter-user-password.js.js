'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    var sequelize = queryInterface.sequelize;
    return sequelize.transaction(function (t) {
      var migrations = [];
      migrations.push(queryInterface.addColumn('users', 'password', { type: Sequelize.STRING, defaultValue: null, transaction: t }));
      return Promise.all(migrations);
    });

  },

  down: (queryInterface, Sequelize) => {

    var sequelize = queryInterface.sequelize;
    return sequelize.transaction(function (t) {
      var migrations = [];
      migrations.push(queryInterface.removeColumn('users', 'password', { type: Sequelize.STRING, transaction: t }));

      return Promise.all(migrations);
    });
  }

};
