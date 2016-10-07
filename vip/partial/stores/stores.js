angular.module('app').controller('StoresCtrl', function ($scope, storeService) {

	$scope.stores = storeService.model.list;

	$scope.deleteClick = function (id) {

		storeService.delete(id)
			.then(function () {


			});
	};

	$scope.setActive = function (store) {

		var id = store._id;

		if (store.active) {
			store.active = false;
		} else {
			store.active = true;
		}

		storeService.update(id, store);

	};


});