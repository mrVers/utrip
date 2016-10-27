angular.module('app').controller('OrdersCtrl', function ($scope, orderService) {


	$scope.orders = orderService.model.list;
	console.log($scope.orders)

	$scope.deleteClick = function (id) {

		orderService.delete(id)
			.then(function () {


			});
	};



});