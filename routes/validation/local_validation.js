var fs 		  = require('fs'),
	json2csv  = require('json2csv'),
	session   = require('express-session'),
    bodyParser = require('body-parser');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

var sess;

class LocalValidation {
	homepage(req, res) {
        var sess = req.session;
        sess.username ? res.redirect('/user') :
        				res.render('index');
    }

    signIn(req, res) {
        res.render('signup');
    }


    userPage(req, res) {
        sess = req.session;
        if (sess.username) {
            res.render('user-tabs');
        } else {
            res.write('<h1>Please login first.</h1>');
            res.end('<a href="/">Login</a>');
        }
    }

     logout(req, res) {
        req.session.destroy(function(err) {
        	err ? console.log(err):
        		  res.redirect('/');
          
        });
    }



     localSignup(req, res) {

        res.render('signup-success', { name: req.body.name });
        var Person = require('./../../config/connection');


        var ClientData = Person({

            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        if ((!req.body.username) || (!req.body.email)) { return false; }
        ClientData.save(function(err) {
            if (err) throw err;
            console.log('Data Saved!!');
            console.log(req.body.name);
            console.log(req.body.email);
        });
    }

     localLogin(req, res) {
        var Person = require('./../../config/connection');
        var sess = req.session;

        Person.findOne({
            username: req.body.username
        }, function(err, user) {

            if (err) throw err;


            if(user) {
            	 if (user.password != req.body.password) {
                    res.send('Invalid Password');
                } else {
                    console.log(user);
                    sess.username = req.body.username;
                    res.redirect('http://localhost:3000/');
                }
            }else {
                res.send('Invalid Username');
            }

        });
    }

     userTable(req, res) {
        var Person = require('./../../config/connection');

        Person.find({}, function(err, data) {
            if (err) throw err;
            res.send(data);
        });
    }

     usersendstatus(req, res) {
        var Status = require('./../../config/userStatus');
        Status.find({}, function(err, data) {
            if (err) throw err;
            res.send(data);
        }).sort({ 'date': -1 });
    }

     createCsvUsers(req, res) {
        var Person = require('./../../config/connection');
        Person.find({}, function(err, data) {
            if (err) {
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

     userStatus(req, res) {
        sess = req.session;
        var Status = require('./../../config/userStatus');
        var ClientStatus = Status({

            username: sess.username,
            status: req.body.status,
            date: Date()
        });
        if ((!sess.username) || (!req.body.status)) { return false; }
        ClientStatus.save(function(err) {
            if (err) {
                throw err;
            }
            res.render('user-tabs');
            console.log(sess.username);
            console.log(req.body.status);
        });
    }
}

var LOCAL_VALIDATION = new LocalValidation;
module.exports = function(app) {

    app.use(session({
        secret: 'babu pro',
        resave: false,
        saveUninitialized: true,
    }));

    app.get('/', 											LOCAL_VALIDATION.homepage);
    app.get('/auth/local/signup', 							LOCAL_VALIDATION.signIn);
    app.post('/auth/local/signup/submit', urlencodedParser, LOCAL_VALIDATION.localSignup);
    app.post('/auth/local/login/submit',  urlencodedParser, LOCAL_VALIDATION.localLogin);
    app.get('/test', 										LOCAL_VALIDATION.userTable);
    app.get('/usersendstatus', 								LOCAL_VALIDATION.usersendstatus);
    app.get('/user', 										LOCAL_VALIDATION.userPage);
    app.get('/csv', 										LOCAL_VALIDATION.createCsvUsers);
    app.get('/logout', 										LOCAL_VALIDATION.logout);
    app.post('/userstatus', 			  urlencodedParser, LOCAL_VALIDATION.userStatus);



}