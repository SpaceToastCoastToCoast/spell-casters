'use strict';
module.exports = function(sequelize, DataTypes) {
  var GameStat = sequelize.define('GameStat', {
    percentComplete: DataTypes.DECIMAL,
    totalWordsCompleted: DataTypes.INTEGER,
    gameMistakes: DataTypes.INTEGER,
    totalTimeElapsed: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        GameStat.belongsTo(models.User);
      }
    }
  });
  return GameStat;
};