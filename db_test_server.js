const express = require('express');
const app = express();
const db = require('./models');
const baseSpells = db.base_spells;

app.get('/', (req,res)=>{
  baseSpells.findAll()
  .then((data =>{
    let allSpells = { base_spells: { } };

    data.forEach((dataSet) =>{

      let outerKeyWordObj = {};
      allSpells.base_spells[dataSet.dataValues.key_word] = {
        word: dataSet.dataValues.word,
        prompt: dataSet.dataValues.prompt,
        hint: dataSet.dataValues.hint,
      };
    });

    res.json({
      sucess: true,
      allSpells,
    });
  }));
});

app.listen(3000, function() {
  console.log('server started');
  db.sequelize.sync();
});
module.exports = app;
