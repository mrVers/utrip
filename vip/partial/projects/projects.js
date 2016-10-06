angular.module('app').controller('ProjectsCtrl', function($scope, projectService) {

    $scope.projects     = projectService.model.list;

    $scope.deleteClick = function(id) {

        projectService.delete(id)
            .then(function() {


            });
    };

    $scope.setActive = function(project) {

        var id = project._id;

        if (project.active) {
            project.active = false;
        } else {
            project.active = true;
        }

        projectService.update(id, project);

    };

});
