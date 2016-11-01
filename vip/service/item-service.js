angular.module('app').factory('itemService', function($http, NET) {

    var itemService = {

        model: {
            list: [],
            item:null
        },

        create: function(data) {

            var promise = $http.post(NET.API_URL + '/api/item', data);

            return promise;

        },

        getOne: function(id) {

            var promise = $http.get(NET.API_URL + '/api/item/'+id);

            promise.then(function(res) {

                itemService.model.item = res.data;
                console.log(res);


            });

            return promise;

        },

        getList: function() {

            var promise = $http.get(NET.API_URL + '/api/items');

            promise.then(function(res) {

                itemService.model.list = res.data;


            });

            return promise;

        },
        delete: function(id) {

            var c = window.confirm('Dude, seriously?');

            if (!c) {
                return false;
            }


            var promise = $http.delete(NET.API_URL + '/api/item/' + id);

            promise.then(function(res) {


                angular.forEach(itemService.model.list, function(item, i) {

                    if (item._id === id) {
                        itemService.model.list.splice(i, 1);

                    }

                });

            });

            return promise;

        },
        update: function(id, data) {

          var promise = $http.put(NET.API_URL + '/api/item/'+id, data);

          promise.then(function(res){

            console.log(res);

          });

          return promise;

        }


    };

    return itemService;
});
