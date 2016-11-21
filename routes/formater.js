const db = require('../models');
const users = db.User;
const gamestats = db.GameStat;


function listHighscores(req,res,next) {
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

    req.allScores = allScores;
    next();
  })
}

function orderHighscores(req,res,next) {
  users.findAll({
      attributes: ['id','username']
    })
    .then(allUsers => {
      let highScores = Object.keys(req.allScores).map(playerId =>{
        let username = allUsers.find(user => {
          return parseInt(user.dataValues.id) === parseInt(playerId)
        })
        username = username.username;
        let score = req.allScores[playerId];
        return {
          username,
          score
        }
      })
      //sort highscores in order of highest to lowest
      highScores.sort((a,b) => {
        return b.score - a.score
      })
      req.orderedHighscores = highScores
      next();
    })
}

module.exports = {
  listHighscores,
  orderHighscores
}