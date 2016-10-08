angular.module('app').controller('NewItemCtrl', function ($scope, itemService, storeService, $state, Upload, $timeout) {

	$scope.isSaving = false;
	$scope.submitted = false;
	$scope.requiredFields = "";
	$scope.isUploading = false;
    $scope.uploadData = {
		progress: 0
    };

	$scope.item = {
        store:'',
		coverImage:''
    };
	$scope.store = {};

	$scope.stores = storeService.model.list;
	
	$scope.item.store = $scope.stores[0];

	$scope.onSave = function () {
		
		coverImage = $scope.item.coverImage;
		console.log(coverImage);
		console.log('yo!');
		
		if ( coverImage === "" ) {
			
			$scope.item.coverImage = 'default.png';
			
		}
		
		console.log($scope.item);
		
		$scope.submitted = true;

		if ($scope.myForm.$valid) {

			$scope.isSaving = true;
			console.log('saved');

			

			itemService.create($scope.item)
				.then(function (res) {
				
				console.log(res);
				console.log(res.data._id);


					//$scope.isSaving = false;
					$state.go('edit-item', {'id': res.data._id});

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

			$scope.item.coverImage = resp.data.filename;

			$scope.isUploading = false;


		}, function (resp) {
			console.log('Error status: ' + resp.status);
		}, function (evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			$scope.uploadData.progress = progressPercentage;
		});

	};

});
