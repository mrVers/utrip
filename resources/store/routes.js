const server 	= require('../../server').server;
const mongoose 	= require('mongoose');

module.exports = function () {

	server.get('/api/stores', function (req, res) {

		const Store = mongoose.model('Store');

		Store.find(function(err, docs){

            if(!err){
                res.send(docs);
            }else{
                res.sendStatus(400).send(err);
                console.log(err);
            }

		});

	});

	server.post('/api/store', function(req, res){

		const data = req.body;
		const Store = mongoose.model('Store');
		const newStore = new Store(data);

		newStore.save(function(err){

			if(!err){
				res.send(newStore);
			}else{
				res.status(400).send(err);
				console.log(err);
			}

		});

	});

	server.delete('/api/store/:id', function(req, res){

		const storeId = req.params.id;
		const Store = mongoose.model('Store');

		Store.findByIdAndRemove(storeId, function(err, doc){

			if(!err){
				res.send(doc);
			}else{
				res.status(400).send(err);
				console.log(err)
			}

		});

	});

	server.get('/api/store/:id', function(req, res){

			const storeId = req.params.id;

			const Store = mongoose.model('Store');

			Store.findById(storeId, function(err, doc){

				if(!err){
					res.send(doc);
				}else{
					res.status(400).send(err);
					console.log(err);
				}

			});

	});

	server.put('/api/store/:id', function(req, res){

		const storeId = req.params.id;
		const data = req.body;
		const Store = mongoose.model('Store');

		Store.findByIdAndUpdate(storeId, data, {new:true}, function(err, doc){

			if(!err){
				res.send(doc);
			}else{
				res.status(400).send(err);
				console.log(err)
			}

		});

	});

};
