var fs = require('fs');
var json2csv = require('json2csv');
var session = require('express-session');


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var sess;

module.exports = function(app){

	app.use(session({
		secret: 'babu pro',
		resave: false,
  		saveUninitialized: true,
	}));
	
	app.get('/', homepage);

	app.get('/auth/local/signup', signIn);

	app.post('/auth/local/signup/submit', urlencodedParser, localSignup);

	app.post('/auth/local/login/submit', urlencodedParser, localLogin);

	app.get('/test', userTable);

	app.get('/usersendstatus', usersendstatus);

	app.get('/user', userPage);

	app.get('/csv', createCsvUsers);

	app.get('/logout', logout);

	app.post('/userstatus', urlencodedParser, userStatus);

	function homepage(req, res){
    	var sess = req.session;
    	if(sess.username){
    		res.redirect('/user');
    	}else{
    		res.render('index');
    	}
	}

	function userPage(req, res){
		sess = req.session;
		if(sess.username) {
	      	res.render('user-tabs');
	      } 
	      else {
	          res.write('<h1>Please login first.</h1>');
	          res.end('<a href="/">Login</a>');
	      }
	}

	function logout(req , res){
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
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
		if ((!req.body.username) || (!req.body.email)) { return false;}
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
		var sess = req.session;

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
					sess.username = req.body.username;
					res.redirect('http://localhost:3000/');
				}
			}

		});
 	}

 	function userTable(req, res){
		var Person = require('./../../config/connection');
		Person.find({}, function(err, data){
			if(err){
				throw err;
			}

			res.send(data);
		});
	}

	function usersendstatus(req, res){
		var Status = require('./../../config/userStatus');
		Status.find({}, function(err, data){
			if(err){
				throw err;
			}

			res.send(data);
		}).sort({'date' : -1});
	}

	function createCsvUsers(req, res){
		var Person = require('./../../config/connection');
		Person.find({}, function(err, data){
			if(err){
				throw err;
			}

			var fields = ['_id', 'name', 'username', 'email'];
			var myData = data;

			var csv = json2csv({ data: myData, fields: fields });
		 
			fs.writeFile('public/csv/file.csv', csv, function(err) {
			  if (err) throw err;
			  console.log('file saved');
			  res.json('http://localhost:3000/assets/csv/file.csv');
			});
		});

	}

	function userStatus(req, res){
		sess = req.session;
		var Status = require('./../../config/userStatus');
		var ClientStatus = Status({
		
			username : sess.username,
			status : req.body.status,
			date : Date()
		});
		if ((!sess.username) || (!req.body.status)) { return false;}
		ClientStatus.save(function(err){
			if (err) {
				throw err;
			}
			res.render('user-tabs');
			console.log(sess.username);
			console.log(req.body.status);
		});	
	}
}