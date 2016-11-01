
module.exports = function(){

    require('./items/model');
    require('./items/routes')();
	
	require('./store/model');
    require('./store/routes')();
	
	require('./order/model');
    require('./order/routes')();
	
	require('./account/model');
    require('./account/routes')();
	
	require('./site-routes')();

};