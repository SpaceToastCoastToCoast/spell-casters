const express = require('express');
const app = express();
const db = require('./models');
const baseSpells = db.base_spells;

// app.use(bp.urlencoded({extended : true}));

app.get('/', (req,res)=>{
  baseSpells.findAll()
  .then((data =>{
    console.log('data: ', data);
    res.json({data,
      sucess: true});
  }));
});

app.listen(3000, function() {
  console.log('server started');
  db.sequelize.sync();
});
module.exports = app;
