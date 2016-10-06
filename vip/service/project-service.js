angular.module('app').factory('projectService', function($http) {

    var projectService = {

        model: {
            list: [],
            item:null
        },

        create: function(data) {

            var promise = $http.post('http://localhost:3333/project', data);

            return promise;

        },

        getOne: function(id) {

            var promise = $http.get('http://localhost:3333/project/'+id);

            promise.then(function(res) {

                projectService.model.item = res.data;
                console.log(res);


            });

            return promise;

        },

        getList: function() {

            var promise = $http.get('http://localhost:3333/projects');

            promise.then(function(res) {

                projectService.model.list = res.data;


            });

            return promise;

        },
        delete: function(id) {

            var c = window.confirm('Dude, seriously?');

            if (!c) {
                return false;
            }


            var promise = $http.delete('http://localhost:3333/project/' + id);

            promise.then(function(res) {


                angular.forEach(projectService.model.list, function(project, i) {

                    if (project._id === id) {
                        projectService.model.list.splice(i, 1);

                    }

                });

            });

            return promise;

        },
        update: function(id, data) {

          var promise = $http.put('http://localhost:3333/project/'+id, data);

          promise.then(function(res){

            console.log(res);

          });

          return promise;

        }


    };

    return projectService;
});
