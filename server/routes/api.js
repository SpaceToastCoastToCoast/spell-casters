const express = require('express');
const router = express.Router();
const words = require('../data/test.json');

router.get('/words', (req,res) => {
  res.json(words);
});

module.exports= router;
