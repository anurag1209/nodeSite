
module.exports = function(app){

	app.get('/auth/fb', fbauth);

	function fbauth(req, res){
		res.render('fb');
	}
}