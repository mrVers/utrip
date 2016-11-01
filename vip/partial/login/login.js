angular.module('app').controller('LoginCtrl',function($scope, authService, $state){
	
	$scope.loginData = {};
	
	$scope.onLoginClick = function(){
		
		authService.login($scope.loginData)
			.then(function(res){
				$state.go('home');
		});
			
	};

});