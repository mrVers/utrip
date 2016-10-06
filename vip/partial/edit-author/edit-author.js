angular.module('app').controller('EditAuthorCtrl',function($scope, authorService, $state) {

	$scope.author = authorService.model.item;
	$scope.isSaving = false;
	$scope.submitted = false;
	$scope.requiredFields = "";


	$scope.onSave = function () {

		$scope.submitted = true;

		if ($scope.myForm.$valid) {

			$scope.isSaving = true;
			console.log('saved');

				authorService.update($scope.author._id, $scope.author)
					.then(function (res) {

					$state.go('authors');

				});

		} else {
			$scope.requiredFields = "Some fields are still empty or wrong :(";

		}

	};


});