angular.module('app').controller('NewAuthorCtrl',function($scope, authorService, $state){

	$scope.isSaving = false;
	$scope.submitted = false;
	$scope.requiredFields = "";

	$scope.author = {};

	$scope.onSave = function () {
		
		$scope.submitted = true;

		if ($scope.myForm.$valid) {

			$scope.isSaving = true;
			console.log('saved');

			authorService.create($scope.author)
				.then(function (res) {

					//$scope.isSaving = false;
					$state.go('authors');

				});
			
		} else {
			$scope.requiredFields = "Some fields are still empty or wrong :(";

		}

	};

});