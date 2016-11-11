'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('GameStats', [{
        percentCompleted: 0.02,
        totalWordsCompleted: 2,
        misspelledWords: ['accommodate','a lot','occurrence'],
        timeElapsed: [5, 0, 0, 0],
        createdAt : new Date(),
        updatedAt : new Date(),
        UserId: 1,
      }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('GameStats', null, {});
  }
};
