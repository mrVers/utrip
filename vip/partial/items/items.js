angular.module('app').controller('ItemsCtrl', function($scope, itemService) {

    $scope.items     = itemService.model.list;

    $scope.deleteClick = function(id) {

        itemService.delete(id)
            .then(function() {


            });
    };

    $scope.setActive = function(item) {

        var id = item._id;

        if (item.active) {
            item.active = false;
        } else {
            item.active = true;
        }

        itemService.update(id, item);

    };

});
