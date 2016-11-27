const express = require('express');
const app = express();
const db = require('../models');
const bcrypt = require('bcrypt');
const spells = db.Spell;
const users = db.User;
const gamestats = db.GameStat;
const validate = require('./validations');
const format = require('./formater');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const SECRET = require('./../secret.json');

app.set('trust proxy', 1);
app.use(session({
  store: new RedisStore({
    host: '127.0.0.1',
    port: '6379'
  }),
  secret: SECRET.secret,
  resave: false,
  saveUninitialized: true
}));

//DB call for Spells table
app.get('/spells', format.listSpells, (req, res) => {
  res.json({
    success: true,
    boss_spells: req.bossSpells,
    base_spells: req.baseSpells
  });
});

//check if there is a current session
app.get('/confirm-login', (req, res) => {
  if(req.session) {
    res.json({
      username: req.session.userName,
      userid: req.session.userid
    });
  } else {
    res.json({
      session: false
    })
  }
})

//logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({
      success: true
    })
  })
})

//login route
app.post('/login', validate.fieldsFilled, validate.userExists, (req,res) => {
  req.session.userName = req.validUser.username;
  req.session.userid = req.validUser.userid;
  req.session.save();
  res.json({
    success: true,
    userid: req.validUser.userid,
    username: req.validUser.username
  })
});

//registration route
app.post('/register', validate.fieldsFilled, validate.newUser, (req, res) => {
  req.session.userName = req.newUser.username;
  req.session.userid = req.newUser.userid;
  req.session.save();
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