angular.module('app').controller('OrdersCtrl', function ($scope, orderService) {


	$scope.orders = orderService.model.list;

	$scope.deleteClick = function (id) {

		orderService.delete(id)
			.then(function () {

			});
	};



});