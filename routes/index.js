"use strict";

var localAuth 		= 		require('./validation/local_validation'),
	fbAuth 			= 		require('./validation/fb_validation'),
	instaAuth 		= 		require('./validation/insta_validation');


module.exports = function(app){
	
	localAuth(app);
	fbAuth(app);
	instaAuth(app);
	
}
