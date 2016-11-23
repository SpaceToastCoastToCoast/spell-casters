const express = require('express');
const app = express();
const db = require('../models');
const bcrypt = require('bcrypt');
const spells = db.Spell;
const users = db.User;
const gamestats = db.GameStat;
const validate = require('./validations');
const format = require('./formater');

//DB call for Spells table
app.get('/spells', format.listSpells, (req, res) => {
  res.json({
    success: true,
    boss_spells: req.bossSpells,
    base_spells: req.baseSpells
  });
});

//login route
app.post('/login', validate.fieldsFilled, validate.userExists, (req,res) => {
  res.json({
    success: true,
    userid: req.validUser.userid,
    username: req.validUser.username
  })
});

//registration route
app.post('/register', validate.fieldsFilled, validate.newUser, (req, res) => {
  res.json({
    success: true,
    userid: req.newUser.userid,
    username: req.newUser.username,
  })
});

//Post game statistics
app.post('/post-stats', (req,res) => {
  users.findOne({
    where: {username: req.body.username}
  })
  .then((user) => {
    const misspelledWordsArr = req.body.misspelledWords.split(',');
    const timeElapsedArr = req.body.timeElapsed.split(',').map(time => {return parseInt(time)})
    gamestats.create({
      percentCompleted: parseFloat(req.body.percentCompleted),
      totalWordsCompleted: parseInt(req.body.totalWordsCompleted),
      misspelledWords: misspelledWordsArr,
      timeElapsed: timeElapsedArr,
      score: parseInt(req.body.score),
      UserId: user.dataValues.id
    })
    .then(_ => {
      res.json({
        success:true
      })
    })
  })
})

//Get all past game statics by username
app.get('/game-stats/:username', format.recentGameData, format.gameSummaryData, format.misspelledWordsData, (req,res) => {

  res.json({
    gameSummary: {
      totalTime: req.totalTime,
      totalWords: req.totalWords,
      totalGames: req.stats.length,
      misspelledWords: req.misspelledWords
    },
    recentGames: req.recentGames,
    stats: req.stats
  })

})

app.get('/leaderboard', format.listHighscores, format.orderHighscores, (req,res) => {
  res.json({
    highscores: req.orderedHighscores
  })
})
module.exports = app;