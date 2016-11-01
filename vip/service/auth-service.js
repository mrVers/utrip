angular.module('app').factory('authService', function ($http, NET, $state, $localForage, dataService, $rootScope) {

	var authService = {

		login: function(userData) {

			var promise = $http.post(NET.API_URL + '/api/account/login', userData);

			promise.then(function (res) {
				
				if(res.data.token !== undefined){
					$localForage.setItem('token', res.data);
					dataService.TOKEN = res.data.token;	
					$rootScope.isLoggedIn = true;
				}
			});

			return promise;

		},
		checkLogin: function(){
			
				//$localForage.clear();
				$localForage.getItem('token')
					.then(function(data){

						if(data){
							var token = data.token;
							dataService.TOKEN = token;
							//show sidebar if logged in
							$rootScope.isLoggedIn = true;

						}else{
							$state.go('login');
						}
				});
		
		}

	};

	return authService;
});