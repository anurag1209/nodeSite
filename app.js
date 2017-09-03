var express = require('express');

var routes = require('./routes/index');

var app = express();

var port = process.env.port || 3000;

app.set( 'view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/public'));

routes(app);

app.listen(port);