const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('./../config/passport');
const router = express.Router();

const User = require('./../models/users');
const vt = require('./../middlewares/token');
const validateToken = vt.validateToken;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.use(passport.initialize());
router.use(passport.session());

let secret;
if (process.env.NODE_ENV === 'production') {
   secret = process.env.secret;
} else {
   const config = require('./../config/config');
   secret = config.secret;
}

router.get('/test', (req, res) => {
   res.json({test: 'test success'});
});

router.post('/signup', (req, res, next) => {
   console.log('IN SIGN UP');
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
               auth: true
            }
            //create token and return to the user 
            nUser.token = jwt.sign({ id: user._id}, secret, { 
               expiresIn: 86400 //24 hours
            });
 
            console.log('LOGIN SUCCESSFUL SENDING BACK USER');
            return res.status(200).json(nUser);
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
         if (info.message === 'USER DOES NOT EXISTS') {
            return res.json({auth: false, message: 'Incorrect username entered.'});
         }

         if (info.message === 'INCORRECT PASSWORD') {
            return res.json({auth: false, message: 'Incorrect password entered.'});
         }
      }

      req.login(user, (err) => {
         if (err) {
            return res.status(404).json({auth: false, message:info.message, success: false});
         } else {
            const nUser = {
               auth: true
            }
            //create token on the user object and return 
            nUser.token = jwt.sign({ id: user._id}, secret, { 
               expiresIn: 86400 //24 hours
            });
            return res.status(200).json(nUser);
         }
      });
   })(req, res, next);
});

router.get('/me', validateToken, (req, res) => {
 /*  const token = req.headers['x-access-token'];
   if (!token) {
      return res.status(401).json({ auth: false, message: 'No auth'});
   }
   jwt.verify(token, config.secret, (err, decoded) => {
      if(err) {
         return res.status(500).json({ auth: false, message: "Auth failed"});
      } */
      
      User.findById(req.decoded.id, (err, user) => {
         if (err) {
            return res.status(404).json({ auth: false, message: "User Not Found" });
         }
         return res.status(200).json({
               email: user.email,
               home: user.home,
               fName: user.fName,
               lName: user.lName
         });
      });
  // });
});

router.get('/logout', (req, res) => {
   console.log('logout method: logging out');
   req.logout();
   req.session.destroy();
   res.json({auth: false, token: null});
});


module.exports = router;
