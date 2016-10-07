angular.module('app').controller('EditStoreCtrl',function($scope, storeService, $state) {

	$scope.store = storeService.model.item;
	$scope.isSaving = false;
	$scope.submitted = false;
	$scope.requiredFields = "";


	$scope.onSave = function () {

		$scope.submitted = true;

		if ($scope.myForm.$valid) {

			$scope.isSaving = true;
			console.log('saved');
			console.log($scope.store);

				storeService.update($scope.store._id, $scope.store)
					.then(function (res) {

					$state.go('stores');

				});

		} else {
			$scope.requiredFields = "Some fields are still empty or wrong :(";

		}

	};


});