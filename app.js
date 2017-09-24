const express 		=  require('express'),
	  helmet  		=  require('helmet'),
	  morgan		=  require('morgan'),
	  bodyParser	=  require('body-parser'),
	  path			=  require('path'),
      favicon 		=  require('serve-favicon');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) ;

//used helmet to secure headers
app.use(helmet());

// parse application/json
app.use(bodyParser.json()) ;

//morgan for beautiful logging of the requests
app.use(morgan('dev'));

//serving favicon
app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));


var routes = require('./routes/index');


const port = process.env.port || 3000;

app.set( 'view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/public'));

routes(app);
console.log('App listening at port '+port)
app.listen(port);