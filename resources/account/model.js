const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	
	name		: String,
	email		: {type:String, required: true, unique: true},
	password	: {type:String, required: true},
	dateCreated	: {type:Date, default: Date.now},
	role		: {type:String, default: 'user'},
	tokens		: [
		{
			token: String,
			expires : {
				type	: Date, 
				default	: function(){ 
					return +new Date()+1000*60*60*24*14;
				}
			}
		}
	]
	
});

mongoose.model('Account', Schema);