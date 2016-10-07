angular.module('app', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'ngFileUpload']);

angular.module('app').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partial/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            items: function(itemService) {

                return itemService.getList();
            },
			stores: function(storeService) {

                return storeService.getList();
            }
			

        }
    });
    $stateProvider.state('items', {
        url: '/items',
        templateUrl: 'partial/items/items.html',
        controller: 'ItemsCtrl',
        resolve: {
            items: function(itemService) {

                return itemService.getList();
            }
        }

    });
    $stateProvider.state('new-item', {
        url: '/new-item',
        templateUrl: 'partial/new-item/new-item.html',
        controller: 'NewItemCtrl',
        resolve: {
            stores: function(storeService) {

                return storeService.getList();
            }
        }
    });
    $stateProvider.state('edit-item', {
        url: '/edit-item/:id',
        templateUrl: 'partial/edit-item/edit-item.html',
        controller: 'EditItemCtrl',
        resolve: {
            item: function(itemService, $stateParams) {

                return itemService.getOne($stateParams.id);

            },
			stores: function(storeService) {

                return storeService.getList();
            }
			

        }
    });
    $stateProvider.state('stores', {
        url: '/stores',
        templateUrl: 'partial/stores/stores.html',
		controller: 'StoresCtrl',
        resolve: {
            stores: function(storeService) {

                return storeService.getList();
            }
        }
    });
    $stateProvider.state('new-store', {
        url: '/new-store',
        templateUrl: 'partial/new-store/new-store.html',
		controller: 'NewStoreCtrl'
    });
    $stateProvider.state('edit-store', {
        url: '/edit-store/:id',
        templateUrl: 'partial/edit-store/edit-store.html',
		controller: 'EditStoreCtrl',
		resolve: {
            item: function(storeService, $stateParams) {

                return storeService.getOne($stateParams.id);

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
