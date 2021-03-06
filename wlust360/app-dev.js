const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

const authRoutes = require('./app_src/routes/auth');
const tripRoutes = require('./app_src/routes/trip');
const iouRoutes = require('./app_src/routes/ious');
const planRoutes = require('./app_src/routes/plan');

let dbURL;
let secret;
const config = require('./app_src/config/config');
dbURL = config.dbURL;
secret = config.secret;
app.use(history());

mongoose.connect(dbURL, {useNewUrlParser: true});
app.set('view engine', 'pug');
//app.set('views', __dirname + '/src/views');

//middlewares
app.use(cors({
   credentials: true,
   origin: true
}));

app.use(express.static(__dirname + '/src/public'));
//app.use(express.static(path.join(__dirname, 'dist')));
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
app.use('/api/iou', iouRoutes);
app.use('/api/plan', planRoutes);

/*catch any routes not registeres
app.get('*', (req, res) => {
   res.status(400).json({message: 'BAD REQUEST'});
}); */


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log('Listening on PORT : ', PORT);
});

