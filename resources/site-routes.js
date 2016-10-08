const server = require('../server').server;
const mongoose = require('mongoose');

module.exports = function () {

	server.get('/', function (req, res) {

		const Item = mongoose.model('Item');

		const q = Item.find({
			active: true
		});

		q.populate('store');

		q.exec()
			.then((docs) => {
				res.render('index', {
					items: docs
				});
			})
			.catch((err) => {
				res.status(400).send(err);
			});

	});

	server.get('/store/item/:id', function (req, res) {

		const itemId = req.params.id;

		const Item = mongoose.model('Item');

		Item.findById(itemId, function (err, docs) {

			if (!err && docs.active) {
				res.render('item', {
					item: docs
				});
			} else {
				res.status(400).redirect('/');
				console.log(err);
			}

		});

	});

	//regex: http://rubular.com/r/oyijLrmb1H
	server.get(/^\/([a-zA-Z0-9]{3})$/, function (req, res) {

		const itemId = req.params[0];

		const Item = mongoose.model('Item');

		Item.findOne({ shorturl: itemId }, function (err, docs) {
			console.log(docs);
			if (err) {
				res.status(400).send(err);
			}
			if (docs) {
				console.log(docs);
				var redirectUrl = '/store/item/' + docs._id;
				res.redirect(301, redirectUrl);
			} else {
				res.status(404).redirect('/');
				console.log('redirect');
			}

		});

	});

}