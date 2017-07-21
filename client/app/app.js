angular.module('myApp', ['ngRoute', 'controllers', 'services'])
.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '../views/home.html',
        controller: 'listController'
    });
});

angular.module('controllers', [])
.controller('listController', ['$http', '$scope', '$rootScope', 'myService', function($http, $scope, $rootScope, myService) {
    $scope.user = '';

    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/chirps'
    })
    .then(function(success) {
        var chirps = success.data;

        $scope.chirps = chirps;
    }, function(err) {
        console.log(err);
    });

    $scope.addChirp = function() {
        console.log($scope.user);
        var newChirp = {
            user: '',
            message: ''
        };

        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/chirps',
            data: newChirp
        })
        .then(function(success) {
            $scope.chirps.push(success.data);
        });
    };
}]);

angular.module('services', [])
.service('myService', [function() {
    this.name = 'this is my name';
}]);
