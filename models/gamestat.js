'use strict';
module.exports = function(sequelize, DataTypes) {
  var GameStat = sequelize.define('GameStat', {
    percentCompleted: DataTypes.DECIMAL,
    totalWordsCompleted: DataTypes.INTEGER,
    misspelledWords: DataTypes.ARRAY(DataTypes.TEXT),
    timeElapsed: DataTypes.ARRAY(DataTypes.INTEGER),
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        GameStat.belongsTo(models.User)
      }
    }
  });
  return GameStat;
};