"use strict";

var localAuth = require('./validation/local_validation');
var fbAuth = require('./validation/fb_validation');
var instaAuth = require('./validation/insta_validation');


module.exports = function(app){
	
	localAuth(app);
	fbAuth(app);
	instaAuth(app);
	
}
