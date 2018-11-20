const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./../models/users');

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
   User.findById(id, (err, user) => {
      if (!err) {
         return done(null, user);
      }
   });
});

passport.use('local-signup', new LocalStrategy({
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: true
   }, 
   (req, username, password, done) => {
      process.nextTick(() => {
         console.log('IN LOCAL SIGN UP', req.body);
         console.log(username, password);
         User.findOne({email: username}, (err, user) => {
            if(err) {
               return done(err);
            }
            if (user) {
               return done(null, false, {message: 'USER EXISTS'});
            } else {
               const nUser = new User();
               nUser.fName = req.body.fName;
               nUser.lName = req.body.lName;
               nUser.email = username;
               nUser.phone = req.body.phone;
               nUser.home =  req.body.home;
               nUser.pwHash = nUser.generateHash(password);
               nUser.save((err) => {
                  if (err){
                     console.log('IN PASSPORT SAVE :' + err.message);
                     return done(null, false, {message: err.message});
                  } 
                  console.log('USER SAVED ' + nUser.fName + ' ' + nUser.lName); 
                  return done(null, nUser);
               }); //end save
            }
         }); //end user lookup
      }); //end process
})); //enid stratefy

passport.use('local-login', new LocalStrategy({
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: true
   }, 
   (req, username, password, done) => {
      User.findOne({email: username}, (err, user) => {
         if(err) {
            return done(err);
         }
         if (!user) {
            console.log('USER DOES NOT EXIST');
            return done(null, false, {message: 'USER DOES NOT EXISTS'});
         } else {
            return done(null, user);            
         }
      }); //end user lookup
})); //enid stratefy

module.exports = passport;
