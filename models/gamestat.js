'use strict';
module.exports = function(sequelize, DataTypes) {
  var GameStat = sequelize.define('GameStat', {
    percentComplete: DataTypes.DECIMAL,
    totalWordsCompleted: DataTypes.INTEGER,
    gameMistakes: DataTypes.INTEGER,
    totalTimeElapsed: DataTypes.INTEGER,
    userId: {
       type: DataTypes.INTEGER,
       references: {
        model: 'User',
        key: 'id'
       }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return GameStat;
};