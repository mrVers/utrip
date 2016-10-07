angular.module('app').controller('HomeCtrl',function($scope, itemService, storeService){

	$scope.items = itemService.model.list;
	$scope.stores = storeService.model.list;
	
});