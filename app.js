const express 		=  require('express'),
	  helmet  		=  require('helmet'),
	  morgan		=  require('morgan'),
	  bodyParser	=  require('body-parser');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) ;

//used helmet to secure headers
app.use(helmet());

// parse application/json
app.use(bodyParser.json()) ;
app.use(morgan('dev'));
var routes = require('./routes/index');


const port = process.env.port || 3000;

app.set( 'view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/public'));

routes(app);

app.listen(port);