const server 	= require('../../server').server;
const mongoose 	= require('mongoose');
const multer  	= require('multer');
const mime 		= require('mime');
const crypto 	= require ("crypto");


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


	server.get('/projects', function (req, res) {

		const Project = mongoose.model('Project');
		
        const q = Project.find();

        q.populate('author');

        q.exec()
            .then((docs)=>{
                res.send(docs);
            })
            .catch((err)=>{
                res.status(400).send(err);
            });

	});

	server.post('/project', function(req, res){

		const data = req.body;
		const Project = mongoose.model('Project');
		const newProject = new Project(data);

		newProject.save(function(err){

			if(!err){
				res.send(newProject);
			}else{
				res.status(400).send(err);
				console.log(err);
			}

		});

	});

	server.delete('/project/:id', function(req, res){

		const projectId = req.params.id;
		const Project = mongoose.model('Project');

		Project.findByIdAndRemove(projectId, function(err, doc){

			if(!err){
				res.send(doc);
			}else{
				res.status(400).send(err);
				console.log(err)
			}

		});

	});

	server.get('/project/:id', function(req, res){

			const projectId = req.params.id;

			const Project = mongoose.model('Project');

			Project.findById(projectId, function(err, doc){

				if(!err){
					res.send(doc);
				}else{
					res.status(400).send(err);
					console.log(err);
				}

			});

	});

	server.put('/project/:id', function(req, res){

		const projectId = req.params.id;
		const data = req.body;
		const Project = mongoose.model('Project');

		Project.findByIdAndUpdate(projectId, data, {new:true}, function(err, doc){

			if(!err){
				res.send(doc);
			}else{
				res.status(400).send(err);
				console.log(err)
			}

		});

	});

};
