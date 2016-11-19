'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('GameStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      percentCompleted: {
        type: Sequelize.DECIMAL
      },
      totalWordsCompleted: {
        type: Sequelize.INTEGER
      },
      misspelledWords: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      timeElapsed: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      score: {
        type: Sequelize.INTEGER
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('GameStats');
  }
};