const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

	name		: String,
	surname		: String,
	address		: String,
	zip			: String,
	city		: String,
	email		: String,
	comment		: String,
	dateCreated	: {type:Date, default:Date.now},
	items 		: [],
	total		: Number,
	status 		: String

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
