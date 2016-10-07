const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

	name 		: {type:String, required:true},
	email		: String,
	imageUrl 	: String,
	body  		: String,
	location 	: String,
	dateCreated	: {type:Date, default:Date.now},
	active		: {type:Boolean, default:true}

});

mongoose.model('Store', Schema);
