module.exports = function(app) {

	app.get('/auth/insta', instaauth);

	function instaauth(req,res) {
		var url = require('./../../config/insta-auth');
		req.location = res.redirect(url);
	}

}