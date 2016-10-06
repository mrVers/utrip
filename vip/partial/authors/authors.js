angular.module('app').controller('AuthorsCtrl', function ($scope, authorService) {

	$scope.authors = authorService.model.list;

	$scope.deleteClick = function (id) {

		authorService.delete(id)
			.then(function () {


			});
	};

	$scope.setActive = function (author) {

		var id = author._id;

		if (author.active) {
			author.active = false;
		} else {
			author.active = true;
		}

		authorService.update(id, author);

	};


});