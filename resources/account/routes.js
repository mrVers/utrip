const server 			= require('../../server').server;
const mongoose 			= require('mongoose');
const bcrypt 			= require('bcryptjs');
const guid 				= require('guid');
const authMiddleware 	= require('../auth');

module.exports = function () {

	server.get('/api/accounts', function (req, res) {

		const Account = mongoose.model('Account');

		Account.find(function (err, accountDocs) {

			if (!err) {
				res.send(accountDocs);
			} else {
				console.log(err);
				res.status(400).send(err);
			}

		});

	});

	server.post('/api/account', function (req, res) {
		
		req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password is too short').notEmpty().isLength({min:5});

        var errors = req.validationErrors();

        if(errors){
            return res.status(400).send(errors);
		}

		var accountData = req.body;

		var email = accountData.email;
		var password = accountData.password;

		bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {

				var Account = mongoose.model('Account');
				var account = new Account({email: email, password: hash});

				account.save(function (err) {

					if (!err) {
						res.send(account);
					} else {
						console.log(err);
						res.status(400).send(err);
					}
				});

			});

		});


	});
	
	server.post('/api/account/login', function (req, res) {
		
		//req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password is too short').notEmpty().isLength({min:5});

        var errors = req.validationErrors();

        if(errors){
            return res.status(400).send(errors);
		}

		var userData = req.body;
		
		const Account = mongoose.model('Account');

		Account.findOne({email:userData.email}, function (err, accountDoc) {
			
			if (accountDoc) {
				
				bcrypt.compare(userData.password, accountDoc.password, function(err, result){
					
					if(result){
						
						var token = {
							token:guid.raw()
						};
						
						accountDoc.tokens.push(token);
						
						accountDoc.save(function (err) {

							if (!err) {
								res.send(token);
							} else {
								res.sendStatus(401);
							}
						});
						
					}else{
						res.sendStatus(401);
					}
					
				});	
				
			} else {
				res.sendStatus(401);
			}
		
		});
	});
	
	server.delete('/api/account/:id', authMiddleware, function(req, res){

		var Account = mongoose.model('Account');

        var accountId = req.params.id;

        Account.findByIdAndRemove(accountId, function(err, doc){

            if(!err){
                res.send(doc);
            }else{
                res.status(400).send(err);
            }

        });

	});

};