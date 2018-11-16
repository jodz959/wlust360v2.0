const express = require('express');
const mongoose = require('mongoose');
require('./db');
//mongoose schema's go here
const User = mongoose.model('User');
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));


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
