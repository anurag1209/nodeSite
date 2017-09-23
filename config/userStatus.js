var mongoose = require('mongoose');
var mongoUrl = require('./links');
var url = mongoUrl['mongo']['status-url'];

mongoose.connect(url , { useMongoClient: true });

//mongoose provide a constructor called schema
var Schema = mongoose.Schema;

// This Schema lets us define the structure of a document
// by passing an object defining type of data schema could hold
var userStatus = new Schema({
	username : String,
	status : String,
	date : String,
});

// Once our Schema is made, 
// then we will create a function constructor 'Person' which will generate objects
// mongoose.model lets me give it a name

var Status = mongoose.model('Status', userStatus);

module.exports = Status;

