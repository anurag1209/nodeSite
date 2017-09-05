var mongoose = require('mongoose');
var mongoUrl = require('./links');
var url = mongoUrl['mongo']['url'];

mongoose.connect(url);

//mongoose provide a constructor called schema
var Schema = mongoose.Schema;

// This Schema lets us define the structure of a document
// by passing an object defining type of data schema could hold
var clientSchema = new Schema({
	name : String,
	username : String,
	email : String,
	password : String
});

// Once our Schema is made, 
// then we will create a function constructor 'Person' which will generate objects
// mongoose.model lets me give it a name

var Person = mongoose.model('Client', clientSchema);

module.exports = Person;