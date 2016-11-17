'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Users', [{
        username: 'John',
        password: 'password',
        role: 'student',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        username: 'highScoreMan',
        password: 'password',
        role: 'student',
        createdAt : new Date(),
        updatedAt : new Date(),
      }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
