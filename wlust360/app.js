const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

const authRoutes = require('./app_src/routes/auth');
const tripRoutes = require('./app_src/routes/trip');

let dbURL;
let secret;
if (process.env.NODE_ENV === 'production') {
   dbURL = process.env.MONGODB_URI;
   console.log('mongo uri is', dbURL); 
   secret = process.env.secret;
} else {
   const config = require('./app_src/config/config');
   dbURL = config.dbURL;
   secret = config.secret;
}

mongoose.connect(dbURL, {useNewUrlParser: true});
app.set('view engine', 'pug');
//app.set('views', __dirname + '/src/views');

//middlewares
app.use(cors({
   credentials: true,
   origin: true
}));

//app.use(express.static(__dirname + '/src/public'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
   secret: secret,
   resave: false,
   saveUninitialized: true
}));

//have local users
app.use((req, res, next) => {
   res.locals.user = req.session.user;
   next();
});

//routes
app.use('/auth', authRoutes);
app.use('/api/trip', tripRoutes);

//catch any routes not registeres
app.get('*', (req, res) => {
   res.status(400).json({message: 'BAD REQUEST'});
});

/*
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log('Listening on PORT : ', PORT);
}); */

module.exports = app;
