angular.module('app').controller('HomeCtrl',function($scope, projectService, authorService){

	$scope.projects = projectService.model.list;
	$scope.authors = authorService.model.list;
	
});