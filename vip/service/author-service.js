angular.module('app').factory('authorService',function($http) {

 var authorService = {

        model: {
            list: [],
            item:null
        },

        create: function(data) {

            var promise = $http.post('http://localhost:3333/user', data);

            return promise;

        },

        getOne: function(id) {

            var promise = $http.get('http://localhost:3333/user/'+id);

            promise.then(function(res) {

                authorService.model.item = res.data;
                console.log(res);


            });

            return promise;

        },

        getList: function() {

            var promise = $http.get('http://localhost:3333/users');

            promise.then(function(res) {

                authorService.model.list = res.data;


            });

            return promise;

        },
        delete: function(id) {

            var c = window.confirm('Dude, seriously?');

            if (!c) {
                return false;
            }


            var promise = $http.delete('http://localhost:3333/user/' + id);

            promise.then(function(res) {


                angular.forEach(authorService.model.list, function(user, i) {

                    if (user._id === id) {
                        authorService.model.list.splice(i, 1);

                    }

                });

            });

            return promise;

        },
        update: function(id, data) {

          var promise = $http.put('http://localhost:3333/user/'+id, data);

          promise.then(function(res){

            console.log(res);

          });

          return promise;

        }


    };

    return authorService;
});