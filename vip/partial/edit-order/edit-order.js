angular.module('app').controller('EditOrderCtrl', function ($scope, orderService, $state) {

	$scope.cartTotal = 0
	$scope.isSaving = false;

	$scope.order = orderService.model.item;


	$scope.statuses = [
		{
			name: 'Pending'
		}
		, {
			name: 'Waiting payment'
		}
		, {
			name: 'Shipped'
		}
	];

	/*
	$scope.statuses = [
		'Pending',
		'Shipped'	
	];
	*/

	$scope.onSave = function () {

		$scope.isSaving = true;

		orderService.update($scope.order._id, $scope.order)
			.then(function (res) {

				$state.go('orders');

			});

	};

});