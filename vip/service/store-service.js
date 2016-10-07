angular.module('app').factory('storeService',function($http) {

 var storeService = {

        model: {
            list: [],
            item:null
        },

        create: function(data) {

            var promise = $http.post('http://localhost:3333/store', data);

            return promise;

        },

        getOne: function(id) {

            var promise = $http.get('http://localhost:3333/store/'+id);

            promise.then(function(res) {

                storeService.model.item = res.data;
                console.log(res);


            });

            return promise;

        },

        getList: function() {

            var promise = $http.get('http://localhost:3333/stores');

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


            var promise = $http.delete('http://localhost:3333/store/' + id);

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

          var promise = $http.put('http://localhost:3333/store/'+id, data);

          promise.then(function(res){

            console.log(res);

          });

          return promise;

        }


    };

    return storeService;
});