'use strict';
module.exports = function(sequelize, DataTypes) {
  var base_spells = sequelize.define('base_spells', {
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
  return base_spells;
};