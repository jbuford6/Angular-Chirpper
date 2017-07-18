var app = angular.module('myApp', ['ngRoute'])
app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "../views/home.html",
        controller: "consoleCtrl"
     });   


});
function UserController($scope, $http) {
    $scope.chirp = {};
    $scope.createChirp = function() {
        $http({
            method : 'POST',
            url : 'http://localhost:3000/api/chirps',
        })
        console.log("Chirp!")
    }
}

app.controller("consoleCtrl", function ($scope){

})
