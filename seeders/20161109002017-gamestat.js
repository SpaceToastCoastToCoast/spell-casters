'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('GameStats', [{
        percentComplete: 34.5,
        totalWordsCompleted: 35,
        gameMistakes: 12,
        totalTimeElapsed: 40,
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('GameStats', null, {});
  }
};
