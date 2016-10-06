angular.module('app').controller('EditProjectCtrl', function ($scope, projectService, authorService, $state, Upload) {

	$scope.project = projectService.model.item;
	$scope.authors = authorService.model.list;
	
	$scope.isSaving = false;
	$scope.submitted = false;
	$scope.requiredFields = "";
	$scope.isUploading = false;
    $scope.uploadData = {
		progress: 0
    };
	
	var authorId = $scope.project.author;

	function matchAuthorId() {
		
		for (var i = 0; i < $scope.authors.length; i++) {
			
			var myAuthor = $scope.authors[i];

			console.log(myAuthor);

			if (myAuthor._id === authorId) {

				console.log('match!');
				$scope.project.author = $scope.authors[i];

			} else {
				console.log('no match :(');

			}

		}
	}

	matchAuthorId();

	$scope.onSave = function () {
		console.log(authorId);

		$scope.submitted = true;

		if ($scope.myForm.$valid) {

			$scope.isSaving = true;
			console.log('saved');

				projectService.update($scope.project._id, $scope.project)
					.then(function (res) {

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