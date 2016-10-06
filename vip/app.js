angular.module('app', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'ngFileUpload']);

angular.module('app').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partial/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            projects: function(projectService) {

                return projectService.getList();
            },
			authors: function(authorService) {

                return authorService.getList();
            }
			

        }
    });
    $stateProvider.state('projects', {
        url: '/projects',
        templateUrl: 'partial/projects/projects.html',
        controller: 'ProjectsCtrl',
        resolve: {
            projects: function(projectService) {

                return projectService.getList();
            }
        }

    });
    $stateProvider.state('new-project', {
        url: '/new-project',
        templateUrl: 'partial/new-project/new-project.html',
        controller: 'NewProjectCtrl',
        resolve: {
            authors: function(authorService) {

                return authorService.getList();
            }
        }
    });
    $stateProvider.state('edit-project', {
        url: '/edit-project/:id',
        templateUrl: 'partial/edit-project/edit-project.html',
        controller: 'EditProjectCtrl',
        resolve: {
            project: function(projectService, $stateParams) {

                return projectService.getOne($stateParams.id);

            },
			authors: function(authorService) {

                return authorService.getList();
            }
			

        }
    });
    $stateProvider.state('authors', {
        url: '/authors',
        templateUrl: 'partial/authors/authors.html',
		controller: 'AuthorsCtrl',
        resolve: {
            authors: function(authorService) {

                return authorService.getList();
            }
        }
    });
    $stateProvider.state('new-author', {
        url: '/new-author',
        templateUrl: 'partial/new-author/new-author.html',
		controller: 'NewAuthorCtrl'
    });
    $stateProvider.state('edit-author', {
        url: '/edit-author/:id',
        templateUrl: 'partial/edit-author/edit-author.html',
		controller: 'EditAuthorCtrl',
		resolve: {
            project: function(authorService, $stateParams) {

                return authorService.getOne($stateParams.id);

            }

        }
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('app').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
