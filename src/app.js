const express = require('express');
const mongoose = require('mongoose');
require('./libs/db');
//mongoose schema's go here
const User = mongoose.model('User');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const auth = require('./libs/auth');
const config = require('./config/config');
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
   secret: config.secret,
   resave: false,
   saveUninitialized: true
}));

app.use(function(req, res, next) {
   res.locals.user = req.session.user;
   next();
});

app.get('/', function(req, res) {
   res.render('index');
});

app.get('/home', function(req, res){
   res.json({
      id: "One Two",
      title: "Testing"
   });
});

app.post('/signup', (req, res) => {
   //error callback
   const ecb = (errObj) => {
      if (errObj.msg === 'DB ERROR') {
         errObj.statusCode = 500;
         res.json(errObj);
      } else if (errObj.msg === 'INCORRECT PASSWORD') {
         errObj.statusCode = 404;
         res.json(errObj);
      } else if (errObj.msg === 'INCORRECT USERNAME') {
         errObj.statusCode = 404;
         res.json(errObj);
      } else if (errObj.msg === 'USER EXISTS') {
         errObj.statusCode = 404;
         res.json(errObj);
      } else {
         errObj.msg = "UNKNOWN ERROR";
         errObj.statusCode = 500;
         res.json(errObj);
      }
   }
   //success callback
   const scb = (user) => {
      const newUser = {
         email: user.email,
         home: user.home,
         name: user.fName + ' ' + user.lName,
         id: user.__id
      };

      auth.startAuthSession(req, newUser, (err) => {
         const errObj = {};
         if (!err) {
            res.json(newUser);
         } else {
            errObj.statusCode = 500;
            errObj.msg = "COULD NOT AUTHENTICATE";
            res.json(errObj);
         }
      });
   }

   auth.signup(req.body.fName, req.body.lName, req.body.email, req.body.phone, req.body.home, req.body.password, ecb, scb);
});

app.listen(3000);
