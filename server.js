//Essentials
const express = require('express');
const app = express();
const db = require('./models');
const baseSpells = db.base_spells;
const bossSpells = db.boss_spells;
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

app.get('/api/base_spells', (req,res)=> {
  baseSpells.findAll()
  .then((data => {
    let base_spells = {};

    data.forEach((dataSet) => {

      base_spells[dataSet.dataValues.key_word] = {
        word: dataSet.dataValues.word,
        prompt: dataSet.dataValues.prompt,
        hint: dataSet.dataValues.hint,
      };
    });

    res.json({
      success: true,
      base_spells,
    });
  }));
});


app.get('/api/boss_spells', (req, res) => {
  bossSpells.findAll()
  .then((data => {
    let boss_spells = {};

    data.forEach((dataSet) => {

      boss_spells[dataSet.dataValues.key_word] = {
        word: dataSet.dataValues.word,
        prompt: dataSet.dataValues.prompt,
        hint: dataSet.dataValues.hint,
      };
    });

    res.json({
      success: true,
      boss_spells,
    });
  }));
});

//DB call for Login
app.get('/api/login', (req,res) => {
  users.findAll({
    limit: 1,
    where: {userName: req.body.userName}
  })
  .then((data) =>{

    res.json({
      success: true,
      data
    });
  });
});

//Post game statistics
app.post('/api/post-stats', (req,res) => {
  console.log('req.body',req.body)
  gamestats.create({
    percentComplete: parseFloat(req.body.percentComplete),
    totalWordsCompleted: parseInt(req.body.totalWordsCompleted),
    gameMistakes: parseInt(req.body.gameMistakes),
    totalTimeElapsed: parseInt(req.body.totalTimeElapsed),
    UserId: parseInt(req.body.UserId)
  })
  .then(_ => {
    res.json({
      success:true
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
