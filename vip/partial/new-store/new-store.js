angular.module('app').controller('NewStoreCtrl',function($scope, storeService, $state){

	$scope.isSaving = false;
	$scope.submitted = false;
	$scope.requiredFields = "";

	$scope.store = {};

	$scope.onSave = function () {
		
		$scope.submitted = true;

		if ($scope.myForm.$valid) {

			$scope.isSaving = true;
			console.log('saved');
			console.log($scope.store);

			storeService.create($scope.store)
				.then(function (res) {

					//$scope.isSaving = false;
					$state.go('stores');

				});
			
		} else {
			$scope.requiredFields = "Some fields are still empty or wrong :(";

		}

	};

});