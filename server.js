const express 		= require('express');
const server 		= express();
const bodyParser 	= require('body-parser');
const database 		= require('./database');
const cors 			= require('cors');
const PORT 			= require('./config').PORT;

exports.server = server;

exports.init = function () {
	
	return new Promise(function(resolve, reject){

		server.use(bodyParser.json());
		server.use(bodyParser.urlencoded({extended:true}));
		server.use(cors());
		server.use('/uploads', express.static('uploads'));
		server.use('/vip', express.static('vip'));

		server.listen(PORT, function () {

			console.log('Server started');
			resolve();

		});
	});
};
