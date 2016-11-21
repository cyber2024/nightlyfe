'use strict'
var path = process.cwd();
var UserHandler = require(path + '/proj/app/controllers/userHandler.server.js');
var userHandler = new UserHandler();
var YelpHandler = require(path + '/proj/app/controllers/yelpHandler.server.js');
var yelpHandler = new YelpHandler();
var server = function(app, passport){
    app.route('/')
        .get(function(req,res){
            res.sendFile(path + '/proj/public/index.html');
        });
    app.route('/auth/github')
        .get(passport.authenticate('github'));
    app.route('/api/user')
        .get(userHandler.getUser);
    app.route('/auth/github/callback')
        .get(passport.authenticate('github',{
            successRedirect: '/',
            failureRedirect: '/'
        }));
    app.route('/auth/github/logout')
        .get(userHandler.logout);
    app.route('/api/yelp_search')
        .post(yelpHandler.getData);
}

module.exports = server;