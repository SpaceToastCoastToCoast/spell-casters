//Essentials
const express = require('express');
const app = express();
const db = require('./models');
const spells = db.Spell;
const users = db.User;
const gamestats = db.GameStat;
const bp = require('body-parser');
//Webpack materials
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

app.use(express.static('./src/public'));

app.use(bp.urlencoded({extended : true}));


//DB call for Spells table
app.get('/api/spells', (req, res) => {
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

app.post('/api/login', (req,res) => {
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
    else{
      if(data[0].dataValues.password === req.body.password){
          res.json({
            success: true,
            username: data[0].dataValues.username
        });
      }else{
        res.json({
          success: false
        });
      }
    }
  });
});

//Post game statistics
app.post('/api/post-stats', (req,res) => {
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
app.get('/api/game-stats/:username',(req,res) => {
  users.findOne({
    where: {username: req.params.username}
  })
  .then((user) => {
    gamestats.findAll({
      where: { UserId: user.dataValues.id},
      order: '"createdAt" DESC',
    })
    .then((stats) => {
      res.json({
        stats
      })
    })
  })
})


// Check to see what dev environment we are in
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8080 : process.env.PORT;

if (isDeveloping) {
  app.set('host', 'http://localhost');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });
  const response = (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.resolve(__dirname, 'dist/index.html')));
    res.end();
  };

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', response);
} else {
  app.use(express.static(`${__dirname}/dist`));
  app.get('*', (req, res) => {
    res.write(
      fs.readFileSync(path.resolve(__dirname, 'dist/index.html'))
    );
  });
}



const onStart = (err) => {
  if (err) {
    throw new Error(err);
  }
  console.info(
    `==> 🌎 Listening on port ${port}. ` +
    `Open up http://localhost:${port}/ in your browser.`
  );
  db.sequelize.sync();
};

app.listen(port, 'localhost', onStart);

module.exports = app;
