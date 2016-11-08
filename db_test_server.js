const express = require('express');
const app = express();
const db = require('./models');
const baseSpells = db.base_spells;
const bossSpells = db.boss_spells;

app.get('/', (req,res)=>{
  baseSpells.findAll()
  .then((data =>{
    let allBaseSpells = { base_spells: { } };

    data.forEach((dataSet) =>{

      let outerKeyWordObj = {};
      allBaseSpells.base_spells[dataSet.dataValues.key_word] = {
        word: dataSet.dataValues.word,
        prompt: dataSet.dataValues.prompt,
        hint: dataSet.dataValues.hint,
      };
    });

    res.json({
      success: true,
      allBaseSpells,
    });
  }));
});


app.get('/boss_spells', (req,res)=>{
  bossSpells.findAll()
  .then((data =>{
    console.log('data: ', data);
    let allBossSpells = { boss_spells: { } };

    data.forEach((dataSet) =>{

      let outerKeyWordObj = {};
      allBossSpells.boss_spells[dataSet.dataValues.key_word] = {
        word: dataSet.dataValues.word,
        prompt: dataSet.dataValues.prompt,
        hint: dataSet.dataValues.hint,
      };
    });

    res.json({
      success: true,
      allBossSpells,
    });
  }));
});

app.listen(3000, function() {
  console.log('server started');
  db.sequelize.sync();
});
module.exports = app;
