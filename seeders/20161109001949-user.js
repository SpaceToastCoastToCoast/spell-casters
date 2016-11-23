'use strict';

const bcrypt = require('bcrypt');
const sample_password = 'password'; //change this in production!

module.exports = {
  up: function (queryInterface, Sequelize) {
      let salt = bcrypt.genSaltSync(10);
      return queryInterface.bulkInsert('Users', [
      {
        username: 'Classroom 132',
        password: bcrypt.hashSync(sample_password, salt),
        role: 'teacher',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'John',
        password: bcrypt.hashSync(sample_password, salt),
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'highScoreMan',
        password: bcrypt.hashSync(sample_password, salt),
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
