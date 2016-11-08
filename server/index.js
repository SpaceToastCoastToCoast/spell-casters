const express = require('express');
const app = express();
const route = require('./routes/api.js');
const PORT = process.env.PORT || 3000;

app.use(express.static('./src/public'));
app.use('/api', route);
app.get('/', (req,res) =>{
  res.send('hello public world');
});

app.listen(PORT, function() {
  console.log('server started');
});

module.exports = app;