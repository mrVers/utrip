const server 	= require('../../server').server;
const mongoose 	= require('mongoose');

module.exports = function () {

	server.get('/users', function (req, res) {

		const User = mongoose.model('User');

		User.find(function(err, docs){

            if(!err){
                res.send(docs);
            }else{
                res.sendStatus(400).send(err);
                console.log(err);
            }

		});

	});

	server.post('/user', function(req, res){

		const data = req.body;
		const User = mongoose.model('User');
		const newUser = new User(data);

		newUser.save(function(err){

			if(!err){
				res.send(newUser);
			}else{
				res.status(400).send(err);
				console.log(err);
			}

		});

	});

	server.delete('/user/:id', function(req, res){

		const userId = req.params.id;
		const User = mongoose.model('User');

		User.findByIdAndRemove(userId, function(err, doc){

			if(!err){
				res.send(doc);
			}else{
				res.status(400).send(err);
				console.log(err)
			}

		});

	});

	server.get('/user/:id', function(req, res){

			const userId = req.params.id;

			const User = mongoose.model('User');

			User.findById(userId, function(err, doc){

				if(!err){
					res.send(doc);
				}else{
					res.status(400).send(err);
					console.log(err);
				}

			});

	});

	server.put('/user/:id', function(req, res){

		const userId = req.params.id;
		const data = req.body;
		const User = mongoose.model('User');

		User.findByIdAndUpdate(userId, data, {new:true}, function(err, doc){

			if(!err){
				res.send(doc);
			}else{
				res.status(400).send(err);
				console.log(err)
			}

		});

	});

};
