const server 	= require('../../server').server;
const mongoose 	= require('mongoose');

module.exports = function () {

	server.get('/api/orders', function (req, res) {

		const Order = mongoose.model('Order');

		Order.find(function(err, docs){

            if(!err){
                res.send(docs);
            }else{
                res.status(400).send(err);
                console.log(err);
            }

		});

	});

	server.post('/api/order', function(req, res){

		const data = req.body;
		const Order = mongoose.model('Order');
		const newOrder = new Order(data);

		newOrder.save(function(err){

			if(!err){
				res.send(newOrder);
			}else{
				res.status(400).send(err);
				console.log(err);
			}

		});

	});

	server.delete('/api/order/:id', function(req, res){

		const orderId = req.params.id;
		const Order = mongoose.model('Order');

		Order.findByIdAndRemove(orderId, function(err, doc){

			if(!err){
				res.send(doc);
			}else{
				res.status(400).send(err);
				console.log(err)
			}

		});

	});

	server.get('/api/order/:id', function(req, res){

			const orderId = req.params.id;

			const Order = mongoose.model('Order');

			Order.findById(orderId, function(err, doc){

				if(!err){
					res.send(doc);
				}else{
					res.status(400).send(err);
					console.log(err);
				}

			});

	});

	server.put('/api/order/:id', function(req, res){

		const orderId = req.params.id;
		const data = req.body;
		const Order = mongoose.model('Order');

		Order.findByIdAndUpdate(orderId, data, {new:true}, function(err, doc){

			if(!err){
				res.send(doc);
			}else{
				res.status(400).send(err);
				console.log(err)
			}

		});

	});

};
