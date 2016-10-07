angular.module('app').factory('itemService', function($http) {

    var itemService = {

        model: {
            list: [],
            item:null
        },

        create: function(data) {

            var promise = $http.post('http://localhost:3333/item', data);

            return promise;

        },

        getOne: function(id) {

            var promise = $http.get('http://localhost:3333/item/'+id);

            promise.then(function(res) {

                itemService.model.item = res.data;
                console.log(res);


            });

            return promise;

        },

        getList: function() {

            var promise = $http.get('http://localhost:3333/items');

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


            var promise = $http.delete('http://localhost:3333/item/' + id);

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

          var promise = $http.put('http://localhost:3333/item/'+id, data);

          promise.then(function(res){

            console.log(res);

          });

          return promise;

        }


    };

    return itemService;
});
