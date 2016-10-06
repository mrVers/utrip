
module.exports = function(){

    require('./project/model');
    require('./project/routes')();
	
	require('./author/model');
    require('./author/routes')();

};