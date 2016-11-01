angular.module('app').controller('HomeCtrl',function($scope, itemService, orderService){

	$scope.items = itemService.model.list;
	$scope.orders = orderService.model.list;
	
});