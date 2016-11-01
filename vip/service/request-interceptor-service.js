angular.module('app').factory('requestInterceptorService',function(dataService) {

  return {
	  request: function($config) {
		  $config.headers['authorization'] = dataService.TOKEN;
		  return $config;		  
	  }	  
  };
	
});