angular.module('app', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'ngFileUpload', 'LocalForageModule']);

angular.module('app').constant('NET', {API_URL:'http://localhost:3333'});

angular.module('app').config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partial/home/home.html',
        controller: 'HomeCtrl',
        resolve: {	
            items: function(itemService) {

                return itemService.getList();
            },
			orders: function(orderService) {

                return orderService.getList();
            }
			

        }
    });
    $stateProvider.state('items', {
        url: '/items',
        templateUrl: 'partial/items/items.html',
        controller: 'ItemsCtrl',
        resolve: {
			checkLogin:function(authService){
				
				return authService.checkLogin();
				
			},	
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
			checkLogin:function(authService){
				
				return authService.checkLogin();
				
			},
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
			checkLogin:function(authService){
				
				return authService.checkLogin();
				
			},
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
			checkLogin:function(authService){
				
				return authService.checkLogin();
				
			},
            stores: function(storeService) {

                return storeService.getList();
            }
        }
    });
    $stateProvider.state('new-store', {
        url: '/new-store',
        templateUrl: 'partial/new-store/new-store.html',
		controller: 'NewStoreCtrl',
		resolve: {
			checkLogin:function(authService){
				
				return authService.checkLogin();
				
			}
        }
    });
    $stateProvider.state('edit-store', {
        url: '/edit-store/:id',
        templateUrl: 'partial/edit-store/edit-store.html',
		controller: 'EditStoreCtrl',
		resolve: {
			checkLogin:function(authService){
				
				return authService.checkLogin();
				
			},
            item: function(storeService, $stateParams) {

                return storeService.getOne($stateParams.id);

            }

        }
    });
    $stateProvider.state('orders', {
        url: '/orders',
        templateUrl: 'partial/orders/orders.html',
		controller: 'OrdersCtrl',
        resolve: {
			checkLogin:function(authService){
				
				return authService.checkLogin();
				
			},
            orders: function(orderService) {

                return orderService.getList();
            }
        }
    });
    $stateProvider.state('edit-order', {
        url: '/edit-order/:id',
        templateUrl: 'partial/edit-order/edit-order.html',
		controller: 'EditOrderCtrl',
		resolve: {
			checkLogin:function(authService){
				
				return authService.checkLogin();
				
			},
            item: function(orderService, $stateParams) {

                return orderService.getOne($stateParams.id);

            }

        }
    });
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'partial/login/login.html',
		controller: 'LoginCtrl'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/login');
	
	$httpProvider.interceptors.push('requestInterceptorService');

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
