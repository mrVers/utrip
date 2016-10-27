angular.module('app').controller('EditOrderCtrl',function($scope, orderService){

	$scope.order = orderService.model.item;
	console.log('array: '+orderService.model.item);
});