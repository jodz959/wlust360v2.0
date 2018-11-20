const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

const authRoutes = require('./src/routes/auth');
const tripRoutes = require('./src/routes/trip');

let dbURL;
let secret;
if (process.env.NODE_ENV === 'production') {
   dbURL = process.env.MONGODB_URI;
   secret = process.env.secret;
} else {
   const config = require('./src/config/config');
   dbURL = config.dbURL;
   secret = config.secret;
}

mongoose.connect(dbURL, {useNewUrlParser: true});
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
   secret: secret,
   resave: false,
   saveUninitialized: true
}));

app.use('/', authRoutes);
app.use('/api/trip', tripRoutes);

app.use((req, res, next) => {
   res.locals.user = req.session.user;
   next();
});

app.get('/', (req, res) => {
   res.render('index');
}); 

app.get('/home', (req, res) => {
   res.json({
      id: "One Two",
      title: "Testing"
   });
});

app.get('*', (req, res) => {
   res.status(404).json({message: 'BAD REQUEST'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log('Listening on PORT : ', PORT);
});
