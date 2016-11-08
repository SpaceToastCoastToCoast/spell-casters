'use strict';
module.exports = function(sequelize, DataTypes) {
  var boss_spells = sequelize.define('boss_spells', {
    key_word: DataTypes.TEXT,
    word: DataTypes.TEXT,
    prompt: DataTypes.TEXT,
    hint: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return boss_spells;
};