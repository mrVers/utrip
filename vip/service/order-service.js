angular.module('app').factory('orderService',function($http, NET) {

 var orderService = {

        model: {
            list: [],
            item:null
        },

        create: function(data) {

            var promise = $http.post(NET.API_URL + '/api/order', data);

            return promise;

        },

        getOne: function(id) {

            var promise = $http.get(NET.API_URL + '/api/order/'+id);

            promise.then(function(res) {

                orderService.model.item = res.data;
                console.log(res);

            });

            return promise;

        },

        getList: function() {

            var promise = $http.get(NET.API_URL + '/api/orders');

            promise.then(function(res) {

                orderService.model.list = res.data;


            });

            return promise;

        },
        delete: function(id) {

            var c = window.confirm('Dude, seriously?');

            if (!c) {
                return false;
            }


            var promise = $http.delete(NET.API_URL + '/api/order/' + id);

            promise.then(function(res) {


                angular.forEach(orderService.model.list, function(order, i) {

                    if (order._id === id) {
                        orderService.model.list.splice(i, 1);

                    }

                });

            });

            return promise;

        },
        update: function(id, data) {

          var promise = $http.put(NET.API_URL + '/api/order/'+id, data);

          promise.then(function(res){

            console.log(res);

          });

          return promise;

        }


    };

    return orderService;
});
