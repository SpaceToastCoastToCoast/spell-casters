'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: ['student', 'teacher']
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasOne(models.GameStat);
      }
    }
  });
  return User;
};