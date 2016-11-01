const express 			= require('express');
const server 			= express();
const bodyParser 		= require('body-parser');
const database 			= require('./database');
const cors 				= require('cors');
const PORT 				= require('./config').PORT;
const expressValidator 	= require('express-validator');
const Promise 			= require('bluebird');

exports.server = server;

exports.init = function () {
	
	return new Promise(function(resolve, reject){
		
		server.set('view engine', 'ejs');
		server.use(bodyParser.json());
		server.use(bodyParser.urlencoded({extended:true}));
		server.use(cors());
		server.use(expressValidator());
		
		server.use('/uploads', express.static('uploads'));
		server.use('/vip', express.static('vip'));
		server.use('/libs', express.static('libs'));
		server.use('/assets', express.static('assets'));
		server.use('/qr', express.static('qr'));

		server.listen(PORT, function () {

			console.log('Server started');
			resolve();

		});
	});
};
