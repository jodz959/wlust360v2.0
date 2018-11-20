const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

const config = require('./src/config/config');
const authRoutes = require('./src/routes/auth');
const tripRoutes = require('./src/routes/trip');
const dbURL = config.dbURL;

mongoose.connect(process.env.MONGODB_URI || dbURL, {useNewUrlParser: true});
app.set('view engine', 'pug');
app.set('views', __dirname + '/src/views');
app.use(cors({
   credentials: true,
   origin: true
}));
app.use(express.static(__dirname + '/src/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
   secret: config.secret,
   resave: false,
   saveUninitialized: true
}));

app.use('/', authRoutes);
app.use('/api/trip', tripRoutes);

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

app.listen(3000);
