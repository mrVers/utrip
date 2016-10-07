angular.module('app').controller('EditItemCtrl', function ($scope, itemService, storeService, $state, Upload) {

	$scope.item = itemService.model.item;
	$scope.stores = storeService.model.list;
	
	$scope.isSaving = false;
	$scope.submitted = false;
	$scope.requiredFields = "";
	$scope.isUploading = false;
    $scope.uploadData = {
		progress: 0
    };
	
	var storeId = $scope.item.store;

	function matchStoreId() {
		
		for (var i = 0; i < $scope.stores.length; i++) {
			
			var myStore = $scope.stores[i];

			console.log(myStore);

			if (myStore._id === storeId) {

				console.log('match!');
				$scope.item.store = $scope.stores[i];

			} else {
				console.log('no match :(');

			}

		}
	}

	matchStoreId();

	$scope.onSave = function () {
		console.log(storeId);

		$scope.submitted = true;

		if ($scope.myForm.$valid) {

			$scope.isSaving = true;
			console.log('saved');

				itemService.update($scope.item._id, $scope.item)
					.then(function (res) {

					$state.go('items');

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