'use strict';
var yelp_request = require('./yelprequest.js');

var yelpHandler = function(){
    this.getData = function(req,res){
        console.log('yelphandler req.body',req.body);
        yelp_request(
            {location:req.body.location},
            {},
            function(error, response, body){
               console.log('error',error);
               res.json(body);
            }
        );
    }
}

module.exports = yelpHandler;