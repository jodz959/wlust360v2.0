const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const config = require('./../config/config.js');

function signup(fname, lname, email, phone, home, pw, errCb, scCb){
   const errObj = {};

   const query = { email: email };
   bcrypt.genSalt(config.saltRouds, function(err, salt) {
      bcrypt.hash(pw, salt, function(err, hash) {
         User.findOne(query, (err, user) => {
            if (user) {
               errObj.msg = "USER EXISTS";
               return errCb(errObj);
            } else {
               new User({
                  fName: fname,
                  lName: lname,
                  email: email,
                  phone: phone,
                  home: home,
                  pwHash: hash,
               }).save((err, user) => {
                  if(err) {
                     errObj.msg = "DB ERROR";
                     return errCb(errObj);
                  } else {
                     return scCb(user);
                  }
               }); //end save
            }
         }); //end find
      }); //end hash
   }); //end salt
}

function login(email, pw, errCb, scCb) {
   const errObj = {};
   passport.use(new LocalStrategy({
         usernameField: email,
         passwordField: pw
      },
      (username, password, done) => {
         User.findOne({ email: username }, (err, user) => {
         //if error or no user, set error message and call error callback  
          if (err) {
               errObj.msg = "DB ERROR";
               return errCb(errObj);
            }
            if (!user) {
               errObj.msg = "INCORRECT USERNAME";
               return errCb(errObj);
            }
            if (user) {
               return bcrypt.compare(password, user.password, (err, pwMatch) => {
                  if (pwMatch) {
                     return scCb(user);
                  } else {
                     errObj.msg = "INCORRECT PASSWORD";
                     return errCb(errObj);
                  }

               });  //end password comparison
            }

         }); //end user lookup   
   
      }));
}

//regenerate user session
function startAuthSession(req, user, cb) {
   req.session.regenerate((err) => {
      if (!err) {
         req.session.user = user;
      }
      return cb(err);
   });
}

module.exports = {
   startAuthSession: startAuthSession,
   signup: signup,
   login: login
}
