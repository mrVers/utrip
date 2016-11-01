angular.module('app').factory('storeService',function($http, NET) {

 var storeService = {

        model: {
            list: [],
            item:null
        },

        create: function(data) {

            var promise = $http.post(NET.API_URL + '/api/store', data);

            return promise;

        },

        getOne: function(id) {

            var promise = $http.get(NET.API_URL + '/api/store/'+id);

            promise.then(function(res) {

                storeService.model.item = res.data;
                console.log(res);


            });

            return promise;

        },

        getList: function() {

            var promise = $http.get(NET.API_URL + '/api/stores');

            promise.then(function(res) {

                storeService.model.list = res.data;


            });

            return promise;

        },
        delete: function(id) {

            var c = window.confirm('Dude, seriously?');

            if (!c) {
                return false;
            }


            var promise = $http.delete(NET.API_URL + '/api/store/' + id);

            promise.then(function(res) {


                angular.forEach(storeService.model.list, function(store, i) {

                    if (store._id === id) {
                        storeService.model.list.splice(i, 1);

                    }

                });

            });

            return promise;

        },
        update: function(id, data) {

          var promise = $http.put(NET.API_URL + '/api/store/'+id, data);

          promise.then(function(res){

            console.log(res);

          });

          return promise;

        }


    };

    return storeService;
});