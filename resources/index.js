
module.exports = function(){

    require('./items/model');
    require('./items/routes')();
	
	require('./store/model');
    require('./store/routes')();
	
	require('./site-routes')();

};