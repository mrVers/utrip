const mongoose = require('mongoose');
const Promise = require('bluebird');

exports.connect = function (cb) {
	
	return new Promise(function(resolve, reject){

		mongoose.connect('mongodb://localhost/utrip');

		mongoose.connection.on('error', function (err) {
			console.log('Error: ', err);
			reject(err);
		});

		mongoose.connection.once('open', function () {

			console.log('Database ready');
			resolve();

		});
	});
};