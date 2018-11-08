const express = require('express');
const mongoose = require('mongoose');
require('./db);
//mongoose schema's go here
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static('./src/public'));
app.use(express.urlencoded({extended: false}));


app.listen(3000);
