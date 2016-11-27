
const db = require('../models');
const bcrypt = require('bcrypt')
const users = db.User;


function fieldsFilled(req,res,next) {
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
      if(data === null || data.length === 0){
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
          req.validUser = {
            userid: data.dataValues.id,
            username: data.dataValues.username
          }
          next();
        }
      }
    })
}

function newUser(req,res,next) {
  if (req.body.username.length > 16) {
    res.json({
      success: false,
      errorMessage: `Username cannot exceed 16 characters`
    })
  } else if(req.body.username.toLowerCase() === 'guest') {
    res.json({
      success: false,
      errorMessage: `That username is restricted, please select another username`
    })
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        users.findAll({
          where: {username: req.body.username}
        })
        .then((data)=>{
          if (data.length !== 0) {
            res.json({
              success: false,
              errorMessage: `${req.body.username} is already in use, please select another username`
            });
          } else {
            users.create({
              username: req.body.username,
              password: hash,
              role: 'student'
            })
            .then(_ => {
              users.findOne({
                where: {username: req.body.username}
              })
              .then((data) => {
                req.newUser = {
                  userid: data.dataValues.id,
                  username: data.dataValues.username
                }
                next();
              });
            });
          }
        });
      })
    })
  }
}


module.exports = {
  fieldsFilled,
  userExists,
  newUser,
}