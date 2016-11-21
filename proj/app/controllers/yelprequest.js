'use strict'

var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

var request_yelp = function(location, set_parameters, callback){
    
    var httpMethod = "GET";
    
    var url = 'https://api.yelp.com/v2/search';
    
    var default_parameters = {
        location:location.location,
        sort:'2'
    };
    var str = n().toString().substr(0,10);
    console.log('oauth_timestamp',str);
    var required_parameters = {
        oauth_consumer_key: process.env.YELP_KEY,
        oauth_token: process.env.YELP_TOKEN,
        oauth_nonce: n(),
        oauth_timestamp : n().toString().substr(0,10),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0'
    }
    
    var parameters = _.assign(default_parameters, set_parameters, required_parameters);
    
    var consumerSecret = process.env.YELP_CONSUMER_SECRET;
    var tokenSecret = process.env.YELP_TOKEN_SECRET;
    
    var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
    {encodeSignature:false});
    
    parameters.oauth_signature = signature;
    
    var paramURL = qs.stringify(parameters);
    console.log(paramURL);
    
    var apiURL = url + '?' + paramURL;
    
    request(apiURL, function(error,response,body){
        return callback(error, response, body);
    });
}

module.exports = request_yelp;