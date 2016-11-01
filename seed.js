const mongoose 	= require('mongoose');
const bcrypt 	= require('bcryptjs');
const Promise 	= require('bluebird');

exports.seedAdmin = function () {

	var adminEmail 		= 'admin@utrip.si';
	var adminPassword 	= 'admin';

	return new Promise(function (resolve, reject) {

		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(adminPassword, salt, function (err, hash) {

				var Account = mongoose.model('Account');

				Account.findOne({
					role: 'admin'
				}, function (err, doc) {

					if (!doc) {

						var account = new Account({
							role: 'admin'
							, email: adminEmail
							, password: hash
						});

						account.save(function (err) {

							if (err) {
								reject(err);
							} else {
								resolve();
								console.log('Admin created');
							}

						});
					} else {
						resolve();
						console.log('Admin already in database');
					};

				});

			});
		});

	});

};