const server 	= require('./server');
const database 	= require('./database');

database.connect()
	.then(server.init)
	.then(function(){
		require('./resources')();
	})
	.then(function () {

		console.log('System up and running');
	
	})
	.catch(function(err){

        console.log('Catch error: ',err);

    });

