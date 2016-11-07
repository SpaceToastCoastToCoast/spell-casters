'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('base_spells', [{
      key_word: "a_lot" ,
      word: "a lot",
      prompt: "A__OT",
      hint: "When you have many of something, you have...",
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    { key_word: "accommodate",
      word: "accommodate",
      prompt: "AC______ATE",
      hint: "When you go out of your way to make someone comfortable.",
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    { key_word: "accidentally",
      word: "accidentally",
      prompt: "AC________LY",
      hint: "When you didn't do it on purpose, you did it...",
      createdAt : new Date(),
      updatedAt : new Date(),
    }
      ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('base_spells', null, {});
  }
};
