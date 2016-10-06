const server = require('../server').server;
const mongoose = require('mongoose');

module.exports = function () {

	server.get('/', function (req, res) {
		
		const Project = mongoose.model('Project');
		
        const q = Project.find();

        q.populate('author');

        q.exec()
            .then((docs)=>{
                res.render('index', {projects:docs});
            })
            .catch((err)=>{
                res.status(400).send(err);
            });

	});

}