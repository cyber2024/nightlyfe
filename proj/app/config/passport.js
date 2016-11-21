'use strict'

var User = require(process.cwd() + '/proj/app/models/user.js');
var configAuth = require(process.cwd() + '/proj/app/config/auth.js');
var GitHubStrategy = require('passport-github').Strategy;

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        console.log('serializing: ',user);
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done){
        console.log('deserializing: ',id);
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
    
    passport.use(new GitHubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL
    },
    function(token, refreshToken, profile, done){
        process.nextTick(function(){
            User.findOne({'github.id':profile.id}, function(err, user){
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, user);
                } else {
                    var newUser = new User();
                    newUser.github.id = profile.id;
                    newUser.github.userName = profile.userName;
                    newUser.github.displayName = profile.displayName;
                    newUser.github.publicRepos = profile._json.public_repos;
                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null,newUser);
                    });
                }
            });
        });
    }));
}