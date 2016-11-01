const server 	= require('./server');
const database 	= require('./database');
const seed	 	= require('./seed');

database.connect()
	.then(server.init)
	.then(function(){
		require('./resources')();
	})
	.then(function () {

		console.log('System up and running');
	
	})
	.then(seed.seedAdmin)
	.catch(function(err){

        console.log('Catch error: ',err);

    });

