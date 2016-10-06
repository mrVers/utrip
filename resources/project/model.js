const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

	title 		: {type:String, required:true},
	body  		: String,
	imageUrls 	: [String],
	coverImage 	: String,
	link		: String,
	author		: {type:String, ref:'User'},
	dateCreated	: {type:Date, default:Date.now},
	active		: {type:Boolean, default:true}

});

mongoose.model('Project', Schema);
