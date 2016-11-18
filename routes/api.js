const express = require('express');
const app = express();
const db = require('../models');
const bcrypt = require('bcrypt');
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

//login route
app.post('/login', (req,res) => {
   if (req.body.username === '') {
    res.json({
      success: false,
      errorMessage: 'Please enter a username, it was empty'
    });
  } else if (req.body.password === '') {
      res.json({
      success: false,
      errorMessage: 'Please enter a password, it was empty'
    });
  } else {
    users.findAll({
      limit: 1,
      where: {username: req.body.username}
    })
    .then((data) => {
      if(data.length === 0){
        res.json({
          success: false,
          errorMessage: 'Please enter a valid username'
        });
      } else {
        let pwCheck = bcrypt.compareSync(req.body.password, data[0].dataValues.password);
        if(!pwCheck) {
          res.json({
            success: false,
            errorMessage: 'Please enter a valid password'
          });
        } else {
          res.json({
            success: true,
            userid: data[0].dataValues.id,
            username: data[0].dataValues.username
          });
        }
      }
    });
  }
});

//registration route
app.post('/register', (req, res) => {
  if (req.body.username === '') {
    res.json({
      success: false,
      errorMessage: 'Please enter a username, it was empty'
    });
  } else if (req.body.password === '') {
      res.json({
      success: false,
      errorMessage: 'Please enter a password, it was empty'
    });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        users.findAll({
          where: {username: req.body.username}
        })
        .then((data)=>{
          if (data.length !== 0) {
            res.json({
              success: false,
              errorMessage: 'Please select another username, it is already exist'
            });
          } else {
            users.create({
              username: req.body.username,
              password: hash,
              role: 'student'
            })
            .then(() => {
              users.findAll({
                where: {username: req.body.username}
              })
              .then((data) => {
                res.json({
                  success: true,
                  userid: data[0].dataValues.id,
                  username: data[0].dataValues.username
                });
              });
            });
          }
        });
      })
    })
  }
});

//Post game statistics
app.post('/post-stats', (req,res) => {
  users.findOne({
    where: {username: req.body.username}
  })
  .then((user) => {
    const misspelledWordsArr = req.body.misspelledWords.split(',');
    const timeElapsedArr = req.body.timeElapsed.split(',').map(time => {return parseInt(time)})
    const totalTime = timeElapsedArr.reduce((sum,next) => {
      sum += next
      return sum;
    }, 0)
    const score = Math.round((parseFloat(req.body.percentCompleted) *200) - (misspelledWordsArr.length) - (totalTime * 0.01))
    gamestats.create({
      percentCompleted: parseFloat(req.body.percentCompleted),
      totalWordsCompleted: parseInt(req.body.totalWordsCompleted),
      misspelledWords: misspelledWordsArr,
      timeElapsed: timeElapsedArr,
      score,
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
        stat.percentCompleted = parseFloat(stat.percentCompleted);
      })
      res.json({
        stats
      })
    })
  })
})

app.get('/leaderboard',(req,res) => {
  gamestats.findAll({
    order: '"UserId" DESC',
  })
  .then((stats) => {
    //score is generated with formula...
    // %of game completed * 200 - # of misspelled words - total time spent * 0.01
    let allScores = stats.reduce((scores,stat) => {

      let totalTime = stat.dataValues.timeElapsed.reduce((sum,next) => {
        sum += next
        return sum;
      }, 0)
      let subscore = Math.round((stat.dataValues.percentCompleted *200) - (stat.dataValues.misspelledWords.length) - (totalTime * 0.01))
      if (scores[stat.dataValues.UserId]) {
        if (scores[stat.dataValues.UserId] < subscore) {
          scores[stat.dataValues.UserId] = subscore
        }
      } else {
        scores[stat.dataValues.UserId] = subscore;
      }
      return scores;
    }, {})

    return allScores;
  })
  .then((allScores) => {
    users.findAll({
      attributes: ['id','username']
    })
    .then(allUsers => {
      let highScores = Object.keys(allScores).map(playerId =>{
        let username = allUsers.find(user => {
          return parseInt(user.dataValues.id) === parseInt(playerId)
        })
        username = username.username;
        let score = allScores[playerId];
        return {
          username,
          score
        }
      })
      //sort highscores in order of highest to lowest
      highScores.sort((a,b) => {
        return b.score - a.score
      })
      res.json({
        highScores
      })
    })
  })
})
module.exports = app;