const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

	title 		: {type:String, required:true},
	body  		: String,
	imageUrls 	: [String],
	coverImage 	: {type:String},
	url			: String,
	shorturl	: {type:String, unique: true},
	qr			: String,
	price 		: Number,
	options		: [String],
	store		: {type:String, ref:'Store'},
	dateCreated	: {type:Date, default:Date.now},
	active		: {type:Boolean, default:true}

});

mongoose.model('Item', Schema);
