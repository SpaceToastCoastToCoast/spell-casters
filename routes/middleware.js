
const db = require('../models');
const bcrypt = require('bcrypt')
const users = db.User;


function loginFilled(req,res,next) {
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
    next();
  }
}

function userExists(req,res,next) {
  users.findOne({
      where: {username: req.body.username}
    })
    .then((data) => {
      if(data ===null || data.length === 0){
        res.json({
          success: false,
          errorMessage: 'Invalid username'
        });
      } else {
        let pwCheck = bcrypt.compareSync(req.body.password, data.dataValues.password);
        if(!pwCheck) {
          res.json({
            success: false,
            errorMessage: 'Invalid password'
          });
        } else {
          req.body.validUser = {
            success: true,
            userid: data.dataValues.id,
            username: data.dataValues.username
          }
          next();
        }
      }
    })
}

function userRegistration(req,res,next) {

}

function leaderboard(req,res,next) {

}

module.exports = {
  loginFilled,
  userExists,
  userRegistration,
  leaderboard
}