const mongoose = require('mongoose');

exports.connect = function (cb) {
	
	return new Promise(function(resolve, reject){

		mongoose.connect('mongodb://localhost/utrip');

		mongoose.connection.on('error', function (err) {
			console.log('Error: ', err);
			reject(err);
		});

		mongoose.connection.once('open', function () {

			console.log('Connection established');
			resolve();

		});
	});
};