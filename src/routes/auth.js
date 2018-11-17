const express = require('express');
const bodyParser = require('body-parser');
const passport = require('../config/passport');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/test', (req, res) => {
   res.json({test: 'test success'});
});

router.post('/signup', (req, res, next) => {
   passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
         return next(err);
      } 
      if (!user) {
         return res.json({message: info.message});
      } 
      req.login(user, (err) => {
         if (err) {
            return res.json({login: false});
         } else {
            const nUser = {
               email: user.email,
               home: user.home,
               fName: user.fName,
               lName: user.lName
            }
            return res.json(nUser);
         }
      });
   
   })(req, res, next);
});

router.post('/login', (req, res, next) => {
   passport.authenticate('local-login', (err, user, info) => {
      if (err) {
         return next(err);
      }
      if (!user) {
        return res.json({message: info.message});
      }
      req.login(user, (err) => {
         if (err) {
            return res.json({login: false});
         } else {
            const nUser = {
               email: user.email,
               home: user.home,
               fName: user.fName,
               lName: user.lName
            }
            return res.json(nUser);
         }
      });
   })(req, res, next);
});

router.get('/logout', (req, res) => {
   req.logout();
   req.session.destroy();
   res.json({logout: true});
});


module.exports = router;
