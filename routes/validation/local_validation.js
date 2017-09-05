var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
	
	app.get('/', homepage);

	app.get('/auth/local/signup', signIn);

	app.post('/auth/local/signup/submit', urlencodedParser, localSignup);

	app.post('/auth/local/login/submit', urlencodedParser, localLogin);


	function homepage(req, res){
    res.render('index');
	}

	function signIn(req, res){
	    res.render('signup');
	}

	function localSignup(req, res){
		
		res.render('signup-success', {name : req.body.name});
		var Person = require('./../config/connection');

		var ClientData = Person({
		
			name : req.body.name,
			username : req.body.username,
			email : req.body.email,
			password : req.body.password
		});
		ClientData.save(function(err){
			if (err) {
				throw err;
			}
			console.log('Data Saved!!');
			console.log(req.body.name);
			console.log(req.body.email);
		});	
	}

	function localLogin(req, res){
		var Person = require('./../config/connection');
		Person.find({username : req.body.username}, function(err, data){
			if(err){
				throw err;
			}
			if(data.length >= 1){
				res.redirect('http://localhost:300/user');
			}else{
				res.send("Invalid credentials");
			}
			console.log(data);
		});
	}
}
