const db = require('../models');
const users = db.User;
const gamestats = db.GameStat;
const spells = db.Spell;


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
      let subscore = stat.dataValues.score
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

function listSpells(req,res,next) {
  spells.findAll()
  .then(data => {
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
    req.bossSpells = boss_spells
    req.baseSpells = base_spells
    next();
  });
}


function recentGameData(req,res,next) {
  users.findOne({
    where: {username: req.params.username}
  })
  .then((user) => {
    gamestats.findAll({
      where: { UserId: user.dataValues.id},
      order: '"createdAt" ASC',
    })
    .then((stats) => {
      stats = stats.map((stat) => {
        stat.percentCompleted = parseFloat(stat.percentCompleted);
        return stat
      });

      let recentGamesPercent = stats.map((stat) => {
        return parseFloat(stat.percentCompleted);
      }).filter((stat,index) => {
        if (index < 20) {
          return stat
        }
      });

      let recentGamesTotalWords = stats.map((stat) => {
        return parseInt(stat.totalWordsCompleted)
      }).filter((stat,index) => {
        if (index < 20) {
          return stat
        }
      });

      req.recentGames = {
        recentGamesPercent,
        recentGamesTotalWords
      };

      req.stats = stats;

      next();
    })
  });
}

function gameSummaryData(req,res,next) {
  let stats = req.stats
  let totalTime = stats.reduce((prev,stat) => {
    prev = prev.concat(stat.timeElapsed)
    return prev
  },[])
  .reduce((prev,next) => {
    prev+= next
    return prev;
  }, 0)

  req.totalTime = totalTime

  let totalWords = stats.reduce((prev,stat) => {
    prev+= stat.totalWordsCompleted
    return prev;
  }, 0);

  req.totalWords = totalWords;

  next();
}

function misspelledWordsData(req,res,next) {
  let stats = req.stats;

  let misspelledWords = stats.reduce((prev,stat) => {
    prev = prev.concat(stat.misspelledWords)
    return prev
  }, [])
  .reduce((prev,word) => {
    if(prev.hasOwnProperty(word)) {
      prev[word]++;
    } else {
      prev[word] = 1;
    }
    return prev
  }, {})

  let misspelledWordsArr = Object.keys(misspelledWords).map(word => {
    return {
      word,
      count: misspelledWords[word]
    }
  })
  let topMisspelledWords = qSort(misspelledWordsArr).filter((wordObj,index) => {
    if (index < 10) {
      return wordObj
    }
  })

  req.misspelledWords = topMisspelledWords
  next();
}

function qSort(array){
  if (array.length <= 1) {
    return array;
  }
  let pivot = array.shift();
  let left = array.filter(element => {
    return element.count >= pivot.count;
  });
  let right = array.filter(element => {
    return element.count < pivot.count;
  });
  return qSort(left).concat(pivot, qSort(right));
}

module.exports = {
  listHighscores,
  orderHighscores,
  listSpells,
  recentGameData,
  gameSummaryData,
  misspelledWordsData
}