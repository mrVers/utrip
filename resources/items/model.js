const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

	title 		: {type:String, required:true},
	body  		: String,
	imageUrls 	: [String],
	coverImage 	: String,
	url			: String,
	shorturl	: String,
	qr			: String,
	price 		: Number,
	options		: [String],
	store		: {type:String, ref:'Store'},
	dateCreated	: {type:Date, default:Date.now},
	active		: {type:Boolean, default:true}

});

mongoose.model('Item', Schema);
