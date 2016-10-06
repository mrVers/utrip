angular.module('app').controller('NewProjectCtrl', function ($scope, projectService, authorService, $state, Upload, $timeout) {

	$scope.isSaving = false;
	$scope.submitted = false;
	$scope.requiredFields = "";
	$scope.isUploading = false;
    $scope.uploadData = {
		progress: 0
    };

	$scope.project = {
        author:'',
        coverImage:null
    };
	$scope.author = {};

	$scope.authors = authorService.model.list;
	
	$scope.project.author = $scope.authors[0];

	$scope.onSave = function () {
		
		console.log($scope.project);
		
		$scope.submitted = true;

		if ($scope.myForm.$valid) {

			$scope.isSaving = true;
			console.log('saved');

			

			projectService.create($scope.project)
				.then(function (res) {

					//$scope.isSaving = false;
					$state.go('projects');

				});
			
		} else {
			$scope.requiredFields = "Some fields are still empty or wrong :(";

		}

	};
	
	$scope.uploadFiles = function (file) {

		$scope.isUploading = true;

		Upload.upload({
			url: 'http://localhost:3333/upload',
			data: {
				file: file
			}
		}).then(function (resp) {

			$scope.project.coverImage = resp.data.filename;

			$scope.isUploading = false;


		}, function (resp) {
			console.log('Error status: ' + resp.status);
		}, function (evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			$scope.uploadData.progress = progressPercentage;
		});

	};

});
