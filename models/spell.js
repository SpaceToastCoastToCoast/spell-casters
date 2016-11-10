'use strict';
module.exports = function(sequelize, DataTypes) {
  var Spell = sequelize.define('Spell', {
    type: DataTypes.TEXT,
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
  return Spell;
};