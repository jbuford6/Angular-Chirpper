angular.module('myApp', ['ngRoute', 'controllers'])
.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '../views/list.html',
        controller: 'listController'
    })
    .when('/add', {
        templateUrl: '../views/add.html',
        controller: 'addController'
    })
    .when('/single/:id', {
        templateUrl: '../views/single.html',
        controller: 'singleController'
    });
})
.run(function($rootScope) {
    $rootScope.api = 'http://localhost:3000/api/chirps';
});

angular.module('controllers', [])
.controller('listController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $http({
        method: 'GET',
        url: $rootScope.api
    })
    .then(function(success) {
        $scope.chirps = success.data;
    });

    $scope.deleteChirp = function(id) {
        $http({
            method: 'DELETE',
            url: $rootScope.api + '/one/' + id
        })
        .then(function(success) {
            var chirps = $scope.chirps;

            chirps = chirps.filter(function(chirp) {
                if (chirp.id !== id) {
                    return chirp;
                }
            });

            $scope.chirps = chirps;
        });
    };
}])
.controller('addController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.user = '';
    $scope.message = '';

    $scope.postChirp = function() {
        if ($scope.user === '' || $scope.message === '') {
            alert('fill out all fields');
        } else {
            var data = {
                user: $scope.user,
                message: $scope.message
            };

            $http({
                method: 'POST',
                url: $rootScope.api,
                data: data
            })
            .then(function(success) {
                console.log(success);
            });
        }
    };
}])
.controller('singleController', ['$scope', '$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope) {
    $http({
        method: 'GET',
        url: $rootScope.api + '/one/' + $routeParams.id
    })
    .then(function(success) {
        $scope.chirp = success.data;
    });
}]);






