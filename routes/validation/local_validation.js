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
		var Person = require('./../../config/connection');

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
		var Person = require('./../../config/connection');

		Person.findOne({
			username : req.body.username
		}, function(err, user) {

			if(err){
				throw err;
			} 

			if(!user){
				res.send('Invalid Username');
			}
			else if(user){

				if(user.password != req.body.password){
					res.send('Invalid Password');
				}else{
					console.log(user);
					res.redirect('http://localhost:300/user');
				}
			}

		});



	// 	Person.find({username : req.body.username}, function(err, data){
	// 		if(err){
	// 			throw err;
	// 		}
	// 		else{
				
	// 		}



	// 		if(data.length >= 1){
	// 			res.redirect('http://localhost:300/user');
	// 		}else{
	// 			res.send("Invalid credentials");
	// 		}
	// 		console.log(data);
	// 	});
 }
}
