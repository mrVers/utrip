const server 		= require('../../server').server;
const mongoose 		= require('mongoose');
const multer  		= require('multer');
const mime 			= require('mime');
const crypto 		= require ("crypto");
const randomstring 	= require("randomstring");
var qr 				= require('qr-image');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(4, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});

const upload  = multer({ storage: storage });


module.exports = function () {
	
    server.post('/upload', upload.single('file'), function(req,res){

        console.log(req.file);
        res.send(req.file);

    });


	server.get('/items', function (req, res) {

		const Item = mongoose.model('Item');
		
        const q = Item.find();

        q.populate('store');

        q.exec()
            .then((docs)=>{
                res.send(docs);
            })
            .catch((err)=>{
                res.status(400).send(err);
            });

	});

	server.post('/item', function(req, res){

		//generating short url
		var random = randomstring.generate(3);
		
		//generating the qrcode & saving
		var qrPath = 'http://localhost:3333/'+random;
		
		var qrPng = qr.image(qrPath, { 
			type: 'png',
			size: 15,
			margin: 2
		});
		
		qrImg = random+'.png';
		qrPng.pipe(require('fs').createWriteStream('./qr/'+qrImg));
		
		const itemData = req.body;
		
		const data = {
			title 		: req.body.title,
			body  		: req.body.body,
			coverImage 	: req.body.coverImage,
			qr			: qrImg,
			shorturl	: random,
			price 		: req.body.price,
			store		: req.body.store,	
		};
		
		const Item = mongoose.model('Item');
		const newItem = new Item(data);

		newItem.save(function(err){

			if(!err){
				res.send(newItem);
			}else{
				res.status(400).send(err);
				console.log(err);
			}

		});

	});

	server.delete('/item/:id', function(req, res){

		const itemId = req.params.id;
		const Item = mongoose.model('Item');

		Item.findByIdAndRemove(itemId, function(err, doc){

			if(!err){
				res.send(doc);
			}else{
				res.status(400).send(err);
				console.log(err)
			}

		});

	});

	server.get('/item/:id', function(req, res){

			const itemId = req.params.id;

			const Item = mongoose.model('Item');

			Item.findById(itemId, function(err, doc){

				if(!err){
					res.send(doc);
				}else{
					res.status(400).send(err);
					console.log(err);
				}

			});

	});

	server.put('/item/:id', function(req, res){

		const itemId = req.params.id;
		const data = req.body;
		const Item = mongoose.model('Item');

		Item.findByIdAndUpdate(itemId, data, {new:true}, function(err, doc){

			if(!err){
				res.send(doc);
			}else{
				res.status(400).send(err);
				console.log(err)
			}

		});

	});

};
