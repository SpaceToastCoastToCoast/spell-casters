const express = require('express');
const app = express();
const db = require('../models');
const spells = db.Spell;
const users = db.User;
const gamestats = db.GameStat;

//DB call for Spells table
app.get('/spells', (req, res) => {
  spells.findAll()
  .then((data => {
    let boss_spells = {};
    let base_spells = {};

    data.forEach((dataSet) => {
      if (dataSet.dataValues.type === 'boss') {
        boss_spells[dataSet.dataValues.key_word] = {
          word: dataSet.dataValues.word,
          prompt: dataSet.dataValues.prompt,
          hint: dataSet.dataValues.hint,
        };
      } else {
        base_spells[dataSet.dataValues.key_word] = {
          word: dataSet.dataValues.word,
          prompt: dataSet.dataValues.prompt,
          hint: dataSet.dataValues.hint,
        };
      }
    });

    res.json({
      success: true,
      boss_spells,
      base_spells
    });
  }));
});

app.post('/login', (req,res) => {
  users.findAll({
    limit: 1,
    where: {username: req.body.username}
  })
  .then((data) =>{
    if(data.length === 0){
      res.json({
        success: false
      });
    }
    else {
      if(data[0].dataValues.password === req.body.password){
        res.json({
          success: true,
          username: data[0].dataValues.username
        });
      } else {
        res.json({
          success: false
        });
      }
    }
  });
});

//registration route
app.post('/register', (req, res) =>{
  users.findAll({
    where: {username: req.body.username}
  })
  .then((data)=>{
    if(data.length === 0){
      users.create({
        username: req.body.username,
        password: req.body.password
      });
      res.json({
        success: true,
        registrationMessage: 'User successfully created'
      });
    } else {
      res.json({
        success: false,
        registrationMessage: 'Please select another username'
      });
    }
  });

});

//Post game statistics
app.post('/post-stats', (req,res) => {
  users.findOne({
    where: {username: req.body.username}
  })
  .then((user) => {
    gamestats.create({
      percentComplete: parseFloat(req.body.percentComplete),
      totalWordsCompleted: parseInt(req.body.totalWordsCompleted),
      gameMistakes: parseInt(req.body.gameMistakes),
      totalTimeElapsed: parseInt(req.body.totalTimeElapsed),
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
app.get('/game-stats/:username',(req,res) => {
  users.findOne({
    where: {username: req.params.username}
  })
  .then((user) => {
    gamestats.findAll({
      where: { UserId: user.dataValues.id},
      order: '"createdAt" DESC',
    })
    .then((stats) => {
      //node-postgres returns decimal datatypes as strings
      //parse value back to a decimal before serving it on the api
      stats.forEach(stat => {
        stat.percentComplete = parseFloat(stat.percentComplete);
      })
      res.json({
        stats
      })
    })
  })
})


module.exports = app;