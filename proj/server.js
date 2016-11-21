'use strict'

var express = require('express');
var routes = require('./app/routes/index.js');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();

var bodyParser = require('body-parser');

require('dotenv').load();
require('./app/config/passport.js')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected',function(){
   console.log('Connected to the database...'); 
});
mongoose.connection.on('error',function(err){
   console.log('Error connecting to the database',err); 
});
mongoose.connection.on('disconnected',function(){
   console.log('Disconnected from the database...'); 
});

app.use('/public',express.static(process.cwd() + '/proj/public'));
app.use('/controllers',express.static(process.cwd() + '/proj/app/controllers'));
app.use('/common',express.static(process.cwd() + '/proj/app/common'));

app.use(session({
    secret:'nightlyfe-yeeeha',
    resave:false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());app.use(function(req,res, next){
    console.log('req body',req.body);
    console.log('user',req.user);
    next();
});

routes(app, passport);


var port = process.env.PORT || 8080;

app.listen(port, function(){
   console.log('Listening on port %d', port); 
});