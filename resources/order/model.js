const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

	name		: {type:String, required:true},
	surname		: {type:String, required:true},
	address		: {type:String, required:true},
	zip			: {type:String, required:true},
	city		: {type:String, required:true},
	email		: {type:String, required:true},
	comment		: String,
	dateCreated	: {type:Date, default:Date.now},
	items 		: {type:Array, required:true},
	total		: Number,
	status 		: {type:String, default:'Pending'}

});

//work in progress
const itemsSchema = new mongoose.Schema({
	
	id	        : String,
	title 		: String,
	coverImage 	: String,
	price 		: Number,
	quantity	: Number,
	store		: String

});

mongoose.model('Order', Schema);
